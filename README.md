# kehlchen — developer portfolio

A minimal, dark project list built with TanStack Start, React, TypeScript, and Tailwind CSS.

## Edit everything

All page content, project links, colors, fonts, metadata, and the footer live in one file:

```text
src/config/portfolio.ts
```

Each project has a name, description, GitHub URL, binary download URL, displayed file name, version, and language. Set an optional value to `""` to hide it. Projects appear on the page in their array order.

## Add a project with Go

With Go installed, run this command from the project root:

```sh
go run scripts/add-project.go
```

The interactive command asks for:

1. Project name and short description
2. GitHub URL
3. Binary download URL and displayed file name
4. Optional version and language/stack

It suggests GitHub and download URLs based on your existing configuration. Before saving, it shows a summary and asks for confirmation. It rejects duplicate project names and invalid URLs, then inserts the new project at the top of `projects.items`.

To use a different config file:

```sh
go run scripts/add-project.go -config path/to/portfolio.ts
```

The script uses only the Go standard library. No `go.mod`, code generation, or additional dependencies are required.

## Run locally

```sh
bun install
bun run dev
```

## Tests

```sh
bun run test
# The Go command can also be tested without creating a Go module:
go test scripts/add-project.go scripts/add-project_test.go
```
