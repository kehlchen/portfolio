/**
 * ============================================================
 *  PORTFOLIO CONFIGURATION — customize EVERYTHING here.
 *  A minimal, dark developer page containing only projects.
 *  Edit text, colors, fonts, links, and binary downloads.
 *  Save the file and the page updates automatically.
 * ============================================================
 */

export type Project = {
  name: string;
  /** One sentence describing what the tool does. */
  description: string;
  /** Repository link. Use "" to hide it. */
  github: string;
  /** Binary download, such as a GitHub release. Use "" to hide it. */
  download: string;
  /** File name shown below the download, such as "tool-linux-x64". */
  file: string;
  /** Version number, such as "0.6.2". Use "" to hide it. */
  version: string;
  /** Language or stack, such as "Go". Use "" to hide it. */
  language: string;
};

export const portfolio = {
  // ---------- Page metadata (browser tab, search engines, sharing) ----------
  meta: {
    title: "kehlchen – small tools",
    description:
      "Command-line tools by kehlchen: source code on GitHub and binaries ready to download.",
    language: "en",
  },

  // ---------- Colors (oklch format: lightness chroma hue) ----------
  theme: {
    colorScheme: "dark" as const, // "dark" or "light"
    background: "oklch(0.145 0.012 265)",
    foreground: "oklch(0.93 0.01 265)",
    card: "oklch(0.185 0.014 265)",
    muted: "oklch(0.235 0.014 265)",
    mutedForeground: "oklch(0.66 0.018 265)",
    primary: "oklch(0.82 0.16 150)", // Accent color
    primaryForeground: "oklch(0.16 0.02 265)",
    border: "oklch(0.29 0.014 265)",
    radius: "0.375rem", // Corner radius: "0rem" = square, "1.5rem" = very round
  },

  // ---------- Fonts (any Google Fonts) ----------
  fonts: {
    heading: "JetBrains Mono",
    body: "IBM Plex Sans",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500;700&display=swap",
  },

  // ---------- Header ----------
  header: {
    prompt: "$ whoami", // Small terminal line above the name
    name: "kehlchen",
    tagline:
      "I build small command-line tools. Open source, with binaries ready to download.",
    links: [
      { label: "github", href: "https://github.com/kehlchen" },
      { label: "mail", href: "mailto:you@example.com" }, // TODO: replace with your real address
    ],
  },

  // ---------- Projects (the only content on the page) ----------
  // Run `go run scripts/add-project.go` to add a project interactively.
  projects: {
    label: "projects",
    items: [
      // add-project:insert
      {
        name: "tidsprakt",
        description: "Convert time zones in your terminal, without a calculator or browser tab.",
        github: "https://github.com/kehlchen/tidsprakt",
        download:
          "https://github.com/kehlchen/tidsprakt/releases/latest/download/tidsprakt-linux-x64",
        file: "tidsprakt-linux-x64",
        version: "0.6.2",
        language: "Go",
      },
      {
        name: "grainstore",
        description: "A tiny S3 proxy: point it at a folder and it handles the rest.",
        github: "https://github.com/kehlchen/grainstore",
        download:
          "https://github.com/kehlchen/grainstore/releases/latest/download/grainstore-linux-x64",
        file: "grainstore-linux-x64",
        version: "1.4.0",
        language: "Rust",
      },
      {
        name: "mdserve",
        description: "Preview a folder of Markdown files as a website—no build step or Node setup.",
        github: "https://github.com/kehlchen/mdserve",
        download:
          "https://github.com/kehlchen/mdserve/releases/latest/download/mdserve-linux-x64",
        file: "mdserve-linux-x64",
        version: "2.1.0",
        language: "Go",
      },
      {
        name: "portcheck",
        description: "See which process is using a port and stop it when needed.",
        github: "https://github.com/kehlchen/portcheck",
        download:
          "https://github.com/kehlchen/portcheck/releases/latest/download/portcheck-linux-x64",
        file: "portcheck-linux-x64",
        version: "0.3.1",
        language: "Go",
      },
      {
        name: "qrx",
        description: "Generate QR codes in your terminal as ASCII art or PNG files.",
        github: "https://github.com/kehlchen/qrx",
        download:
          "https://github.com/kehlchen/qrx/releases/latest/download/qrx-linux-x64",
        file: "qrx-linux-x64",
        version: "1.0.3",
        language: "Rust",
      },
    ],
  },

  // ---------- Footer ----------
  footer: {
    text: "© 2026 kehlchen · Released under the MIT license",
  },
};
