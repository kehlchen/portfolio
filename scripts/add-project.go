// Command add-project interactively adds a project to src/config/portfolio.ts.
// Run it from the project root with: go run scripts/add-project.go
package main

import (
	"bufio"
	"errors"
	"flag"
	"fmt"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"
)

const insertMarker = "      // add-project:insert"

var projectNamePattern = regexp.MustCompile(`(?m)^\s*name:\s*("(?:[^"\\]|\\.)*")\s*,\s*$`)

type project struct {
	Name        string
	Description string
	GitHub      string
	Download    string
	File        string
	Version     string
	Language    string
}

func main() {
	configPath := flag.String("config", "src/config/portfolio.ts", "path to the portfolio config")
	flag.Parse()
	if flag.NArg() != 0 {
		fmt.Fprintln(os.Stderr, "This command takes no positional arguments. Use -config to choose another config file.")
		os.Exit(2)
	}

	if err := run(*configPath, os.Stdin); err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}
}

func run(configPath string, input *os.File) error {
	content, err := os.ReadFile(configPath)
	if err != nil {
		return fmt.Errorf("read %s: %w", configPath, err)
	}
	if !strings.Contains(string(content), insertMarker) {
		return fmt.Errorf("%s does not contain the insertion marker %q", configPath, insertMarker)
	}

	reader := bufio.NewReader(input)
	fmt.Println("Add a new project to your portfolio.")
	fmt.Println("Press Enter to accept a value shown in brackets.")

	name, err := askRequired(reader, "Project name")
	if err != nil {
		return err
	}
	description, err := askRequired(reader, "Short description")
	if err != nil {
		return err
	}

	githubDefault := "https://github.com/kehlchen/" + name
	if ownerURL := githubOwner(string(content)); ownerURL != "" {
		githubDefault = ownerURL + "/" + name
	}
	github, err := ask(reader, "GitHub URL", githubDefault)
	if err != nil {
		return err
	}

	fileDefault := name + "-linux-x64"
	downloadDefault := ""
	if github != "" {
		downloadDefault = strings.TrimSuffix(github, "/") + "/releases/latest/download/" + fileDefault
	}
	download, err := ask(reader, "Binary download URL", downloadDefault)
	if err != nil {
		return err
	}
	file, err := ask(reader, "Binary file name", fileDefault)
	if err != nil {
		return err
	}
	version, err := ask(reader, "Version (optional)", "")
	if err != nil {
		return err
	}
	language, err := ask(reader, "Language or stack (optional)", "Go")
	if err != nil {
		return err
	}

	p := project{
		Name:        name,
		Description: description,
		GitHub:      github,
		Download:    download,
		File:        file,
		Version:     strings.TrimPrefix(version, "v"),
		Language:    language,
	}
	if err := validateProject(p); err != nil {
		return err
	}

	fmt.Printf("\n%s — %s\n", p.Name, p.Description)
	fmt.Printf("GitHub:  %s\n", emptyAsHidden(p.GitHub))
	fmt.Printf("Binary:  %s\n", emptyAsHidden(p.Download))
	confirmed, err := askConfirmation(reader, "Add this project?")
	if err != nil {
		return err
	}
	if !confirmed {
		fmt.Println("Cancelled. No files were changed.")
		return nil
	}

	updated, err := insertProject(string(content), p)
	if err != nil {
		return err
	}
	if err := atomicWrite(configPath, []byte(updated)); err != nil {
		return err
	}
	fmt.Printf("Added %s to %s. It now appears first in the project list.\n", p.Name, configPath)
	return nil
}

func ask(reader *bufio.Reader, label, defaultValue string) (string, error) {
	if defaultValue != "" {
		fmt.Printf("%s [%s]: ", label, defaultValue)
	} else {
		fmt.Printf("%s: ", label)
	}
	answer, err := reader.ReadString('\n')
	if err != nil && !errors.Is(err, os.ErrClosed) && answer == "" {
		return "", fmt.Errorf("read %s: %w", label, err)
	}
	answer = strings.TrimSpace(answer)
	if answer == "" {
		answer = defaultValue
	}
	return answer, nil
}

func askRequired(reader *bufio.Reader, label string) (string, error) {
	for {
		answer, err := ask(reader, label, "")
		if err != nil {
			return "", err
		}
		if answer != "" {
			return answer, nil
		}
		fmt.Println("This value is required.")
	}
}

func askConfirmation(reader *bufio.Reader, label string) (bool, error) {
	for {
		answer, err := ask(reader, label+" [Y/n]", "")
		if err != nil {
			return false, err
		}
		switch strings.ToLower(answer) {
		case "", "y", "yes":
			return true, nil
		case "n", "no":
			return false, nil
		default:
			fmt.Println("Please enter y or n.")
		}
	}
}

func validateProject(p project) error {
	if strings.TrimSpace(p.Name) == "" {
		return errors.New("project name is required")
	}
	if strings.TrimSpace(p.Description) == "" {
		return errors.New("project description is required")
	}
	for label, value := range map[string]string{"GitHub URL": p.GitHub, "binary download URL": p.Download} {
		if value == "" {
			continue
		}
		parsed, err := url.ParseRequestURI(value)
		if err != nil || parsed.Host == "" || (parsed.Scheme != "https" && parsed.Scheme != "http") {
			return fmt.Errorf("%s must be a valid http:// or https:// URL", label)
		}
	}
	if p.Download != "" && strings.TrimSpace(p.File) == "" {
		return errors.New("binary file name is required when a download URL is set")
	}
	return nil
}

func renderProject(p project) string {
	return fmt.Sprintf(`      {
        name: %s,
        description: %s,
        github: %s,
        download: %s,
        file: %s,
        version: %s,
        language: %s,
      },`,
		strconv.Quote(p.Name),
		strconv.Quote(p.Description),
		strconv.Quote(p.GitHub),
		strconv.Quote(p.Download),
		strconv.Quote(p.File),
		strconv.Quote(p.Version),
		strconv.Quote(p.Language),
	)
}

func insertProject(content string, p project) (string, error) {
	for _, match := range projectNamePattern.FindAllStringSubmatch(content, -1) {
		existing, err := strconv.Unquote(match[1])
		if err == nil && strings.EqualFold(existing, p.Name) {
			return "", fmt.Errorf("a project named %q already exists", p.Name)
		}
	}
	markerIndex := strings.Index(content, insertMarker)
	if markerIndex == -1 {
		return "", fmt.Errorf("insertion marker %q was not found; no files were changed", insertMarker)
	}
	insertAt := markerIndex + len(insertMarker)
	return content[:insertAt] + "\n" + renderProject(p) + content[insertAt:], nil
}

func githubOwner(content string) string {
	pattern := regexp.MustCompile(`https://github\.com/[A-Za-z0-9_.-]+`)
	match := pattern.FindString(content)
	if match == "" || strings.Count(match, "/") != 3 {
		return ""
	}
	return match
}

func emptyAsHidden(value string) string {
	if value == "" {
		return "hidden"
	}
	return value
}

func atomicWrite(path string, content []byte) error {
	info, err := os.Stat(path)
	if err != nil {
		return fmt.Errorf("inspect %s: %w", path, err)
	}
	temporary, err := os.CreateTemp(filepath.Dir(path), ".portfolio-*.tmp")
	if err != nil {
		return fmt.Errorf("create temporary config: %w", err)
	}
	temporaryPath := temporary.Name()
	defer os.Remove(temporaryPath)

	if _, err := temporary.Write(content); err != nil {
		temporary.Close()
		return fmt.Errorf("write temporary config: %w", err)
	}
	if err := temporary.Chmod(info.Mode().Perm()); err != nil {
		temporary.Close()
		return fmt.Errorf("set config permissions: %w", err)
	}
	if err := temporary.Sync(); err != nil {
		temporary.Close()
		return fmt.Errorf("sync temporary config: %w", err)
	}
	if err := temporary.Close(); err != nil {
		return fmt.Errorf("close temporary config: %w", err)
	}
	if err := os.Rename(temporaryPath, path); err != nil {
		return fmt.Errorf("replace %s: %w", path, err)
	}
	return nil
}
