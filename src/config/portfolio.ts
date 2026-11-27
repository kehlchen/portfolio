/**
 * ============================================================
 *  PORTFOLIO-KONFIGURATION – hier lässt sich ALLES anpassen.
 *  Seite: minimal, dunkel, nur Projekte.
 *  Texte, Farben, Schriften, Links, Binary-Downloads.
 *  Speichern → Seite aktualisiert sich automatisch.
 * ============================================================
 */

export type Project = {
  name: string;
  /** Ein Satz, was das Tool tut. */
  description: string;
  /** Link zum Repo. "" = Repo-Link ausblenden. */
  github: string;
  /** Binary-Download (z. B. GitHub-Release). "" = Download ausblenden. */
  download: string;
  /** Dateiname unter dem Download, z. B. "tool-linux-x64". */
  file: string;
  /** Versionsnummer, z. B. "0.6.2". "" = ausblenden. */
  version: string;
  /** Sprache / Stack, z. B. "Go". "" = ausblenden. */
  language: string;
};

export const portfolio = {
  // ---------- Seiten-Infos (Browser-Tab, Google, Teilen) ----------
  meta: {
    title: "kehlchen – kleine Werkzeuge",
    description:
      "Kommandozeilen-Werkzeuge von kehlchen: Quellcode auf GitHub, Binary zum Herunterladen.",
    language: "de",
  },

  // ---------- Farben (oklch-Format: Helligkeit Sättigung Farbton) ----------
  theme: {
    colorScheme: "dark" as const, // "dark" oder "light"
    background: "oklch(0.145 0.012 265)",
    foreground: "oklch(0.93 0.01 265)",
    card: "oklch(0.185 0.014 265)",
    muted: "oklch(0.235 0.014 265)",
    mutedForeground: "oklch(0.66 0.018 265)",
    primary: "oklch(0.82 0.16 150)", // Akzentfarbe
    primaryForeground: "oklch(0.16 0.02 265)",
    border: "oklch(0.29 0.014 265)",
    radius: "0.375rem", // Eckenrundung: "0rem" = eckig, "1.5rem" = sehr rund
  },

  // ---------- Schriften (beliebige Google Fonts) ----------
  fonts: {
    heading: "JetBrains Mono",
    body: "IBM Plex Sans",
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500;700&display=swap",
  },

  // ---------- Kopfzeile ----------
  header: {
    prompt: "$ whoami", // kleine Terminal-Zeile über dem Namen
    name: "kehlchen",
    tagline:
      "Ich schreibe kleine Werkzeuge für die Kommandozeile. Alles offen, alles als Binary.",
    links: [
      { label: "github", href: "https://github.com/kehlchen" },
      { label: "mail", href: "mailto:deineadresse@example.com" }, // TODO: deine echte Adresse eintragen
    ],
  },

  // ---------- Projekte (einziger Inhalt der Seite) ----------
  projects: {
    label: "projects",
    items: [
      {
        name: "tidsprakt",
        description: "Zeitzonen umrechnen im Terminal, ohne Rechner und ohne Web-Tab.",
        github: "https://github.com/kehlchen/tidsprakt",
        download:
          "https://github.com/kehlchen/tidsprakt/releases/latest/download/tidsprakt-linux-x64",
        file: "tidsprakt-linux-x64",
        version: "0.6.2",
        language: "Go",
      },
      {
        name: "grainstore",
        description: "Winziger Proxy vor S3: ein Ordner rein, alles andere erledigt er.",
        github: "https://github.com/kehlchen/grainstore",
        download:
          "https://github.com/kehlchen/grainstore/releases/latest/download/grainstore-linux-x64",
        file: "grainstore-linux-x64",
        version: "1.4.0",
        language: "Rust",
      },
      {
        name: "mdserve",
        description: "Markdown-Ordner als Seite ansehen – kein Build, kein Node-Setup.",
        github: "https://github.com/kehlchen/mdserve",
        download:
          "https://github.com/kehlchen/mdserve/releases/latest/download/mdserve-linux-x64",
        file: "mdserve-linux-x64",
        version: "2.1.0",
        language: "Go",
      },
      {
        name: "portcheck",
        description: "Zeigt, welcher Prozess einen Port belegt, und macht ihn auf Wunsch frei.",
        github: "https://github.com/kehlchen/portcheck",
        download:
          "https://github.com/kehlchen/portcheck/releases/latest/download/portcheck-linux-x64",
        file: "portcheck-linux-x64",
        version: "0.3.1",
        language: "Go",
      },
      {
        name: "qrx",
        description: "QR-Codes direkt im Terminal, als ASCII oder als PNG-Datei.",
        github: "https://github.com/kehlchen/qrx",
        download:
          "https://github.com/kehlchen/qrx/releases/latest/download/qrx-linux-x64",
        file: "qrx-linux-x64",
        version: "1.0.3",
        language: "Rust",
      },
    ],
  },

  // ---------- Fußzeile ----------
  footer: {
    text: "© 2026 kehlchen · alles unter MIT-Lizenz",
  },
};
