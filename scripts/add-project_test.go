package main

import (
	"strings"
	"testing"
)

const testConfig = `export const portfolio = {
  header: { name: "kehlchen" },
  projects: {
    items: [
      // add-project:insert
      {
        name: "existing",
        description: "Existing project",
        github: "https://github.com/kehlchen/existing",
        download: "https://example.com/existing",
        file: "existing-linux-x64",
        version: "1.0.0",
        language: "Go",
      },
    ],
  },
};`

func TestInsertProjectAddsCompleteProjectFirst(t *testing.T) {
	p := project{
		Name:        `quote-"-tool`,
		Description: `Say "hello" \ goodbye`,
		GitHub:      "https://github.com/kehlchen/quote-tool",
		Download:    "https://example.com/quote-tool",
		File:        "quote-tool-linux-x64",
		Version:     "0.1.0",
		Language:    "Go",
	}
	updated, err := insertProject(testConfig, p)
	if err != nil {
		t.Fatalf("insertProject returned an error: %v", err)
	}
	newPosition := strings.Index(updated, `name: "quote-\"-tool"`)
	oldPosition := strings.Index(updated, `name: "existing"`)
	if newPosition == -1 || oldPosition == -1 || newPosition > oldPosition {
		t.Fatalf("new project was not inserted before the existing project:\n%s", updated)
	}
	for _, expected := range []string{
		`description: "Say \"hello\" \\ goodbye"`,
		`github: "https://github.com/kehlchen/quote-tool"`,
		`download: "https://example.com/quote-tool"`,
		`file: "quote-tool-linux-x64"`,
		`version: "0.1.0"`,
		`language: "Go"`,
	} {
		if !strings.Contains(updated, expected) {
			t.Errorf("updated config is missing %s", expected)
		}
	}
}

func TestInsertProjectRejectsDuplicateNamesWithoutChangingConfig(t *testing.T) {
	p := project{Name: "EXISTING", Description: "Duplicate"}
	updated, err := insertProject(testConfig, p)
	if err == nil {
		t.Fatal("expected a duplicate-name error")
	}
	if updated != "" {
		t.Fatalf("duplicate insertion returned modified content: %q", updated)
	}
}

func TestInsertProjectRequiresMarker(t *testing.T) {
	updated, err := insertProject("const portfolio = {};", project{Name: "new"})
	if err == nil {
		t.Fatal("expected a missing-marker error")
	}
	if updated != "" {
		t.Fatalf("missing marker returned modified content: %q", updated)
	}
}

func TestValidateProject(t *testing.T) {
	valid := project{
		Name:        "tool",
		Description: "A useful tool",
		GitHub:      "https://github.com/kehlchen/tool",
		Download:    "https://github.com/kehlchen/tool/releases/latest/download/tool",
		File:        "tool-linux-x64",
	}
	if err := validateProject(valid); err != nil {
		t.Fatalf("valid project was rejected: %v", err)
	}

	invalidURL := valid
	invalidURL.Download = "not-a-url"
	if err := validateProject(invalidURL); err == nil {
		t.Fatal("expected an invalid download URL to be rejected")
	}

	missingFile := valid
	missingFile.File = ""
	if err := validateProject(missingFile); err == nil {
		t.Fatal("expected a missing binary file name to be rejected")
	}
}
