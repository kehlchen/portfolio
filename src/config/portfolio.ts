/**
 * ============================================================
 *  PORTFOLIO-KONFIGURATION – hier lässt sich ALLES anpassen.
 *  Texte, Farben, Schriften, Reihenfolge, Sichtbarkeit, Links.
 *  Speichern → Seite aktualisiert sich automatisch.
 * ============================================================
 */

export const portfolio = {
  // ---------- Seiten-Infos (Browser-Tab, Google, Teilen) ----------
  meta: {
    title: "Mara Lindqvist – Designerin & Entwicklerin",
    description: "Portfolio von Mara Lindqvist: Produktdesign, Web-Entwicklung und Markenauftritte.",
    language: "de",
  },

  // ---------- Farben (oklch-Format: Helligkeit Sättigung Farbton) ----------
  theme: {
    background: "oklch(0.97 0.012 85)",
    foreground: "oklch(0.18 0.02 60)",
    card: "oklch(0.99 0.006 85)",
    muted: "oklch(0.92 0.015 85)",
    mutedForeground: "oklch(0.45 0.02 60)",
    primary: "oklch(0.55 0.19 35)", // Akzentfarbe
    primaryForeground: "oklch(0.98 0.01 85)",
    border: "oklch(0.85 0.02 80)",
    radius: "0.25rem", // Eckenrundung: "0rem" = eckig, "1.5rem" = sehr rund
  },

  // ---------- Schriften (beliebige Google Fonts) ----------
  fonts: {
    heading: "Fraunces",
    body: "Inter",
    // Link von fonts.google.com (passend zu den Namen oben)
    googleFontsUrl:
      "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,700&family=Inter:wght@400;500;600&display=swap",
  },

  // ---------- Navigation ----------
  nav: {
    logo: "M.L.",
    // Reihenfolge = Reihenfolge der Abschnitte auf der Seite
    // Mögliche Werte: "about", "projects", "skills", "experience", "contact"
    sections: ["about", "projects", "skills", "experience", "contact"] as const,
    labels: {
      about: "Über mich",
      projects: "Projekte",
      skills: "Können",
      experience: "Werdegang",
      contact: "Kontakt",
    },
  },

  // ---------- Startbereich ----------
  hero: {
    show: true,
    greeting: "Hallo, ich bin",
    name: "Mara Lindqvist",
    role: "Designerin & Entwicklerin aus Hamburg",
    tagline: "Ich gestalte digitale Produkte, die klar, ruhig und nützlich sind.",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80", // "" = kein Bild
    primaryButton: { label: "Projekte ansehen", href: "#projects" },
    secondaryButton: { label: "Kontakt aufnehmen", href: "#contact" },
  },

  // ---------- Über mich ----------
  about: {
    title: "Über mich",
    paragraphs: [
      "Seit über acht Jahren arbeite ich an der Schnittstelle von Design und Code – für Start-ups, Agenturen und Kulturinstitutionen.",
      "Mein Ansatz: zuhören, reduzieren, sorgfältig umsetzen. Gute Gestaltung fällt nicht auf – sie funktioniert einfach.",
    ],
    facts: [
      { value: "8+", label: "Jahre Erfahrung" },
      { value: "60+", label: "Projekte" },
      { value: "25", label: "Kund:innen" },
    ],
  },

  // ---------- Projekte ----------
  projects: {
    title: "Ausgewählte Projekte",
    items: [
      {
        title: "Nordlicht Reisen",
        description: "Buchungsplattform mit neuem Markenauftritt und 40 % mehr Anfragen.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80",
        tags: ["Branding", "Web"],
        link: "https://example.com",
      },
      {
        title: "Kaffeerösterei Bohne",
        description: "Online-Shop und Verpackungsdesign für eine kleine Rösterei.",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=900&q=80",
        tags: ["E-Commerce", "Design"],
        link: "https://example.com",
      },
      {
        title: "Stadtarchiv App",
        description: "Mobile App, die historische Fotos an ihren Originalorten zeigt.",
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&q=80",
        tags: ["App", "UX"],
        link: "",
      },
    ],
  },

  // ---------- Können ----------
  skills: {
    title: "Was ich kann",
    groups: [
      { name: "Design", items: ["Figma", "Markenentwicklung", "UX-Research", "Typografie"] },
      { name: "Entwicklung", items: ["React", "TypeScript", "CSS", "Barrierefreiheit"] },
      { name: "Weiteres", items: ["Workshops", "Projektleitung", "Fotografie"] },
    ],
  },

  // ---------- Werdegang ----------
  experience: {
    title: "Werdegang",
    items: [
      { period: "2022 – heute", role: "Selbstständig", place: "Hamburg", text: "Design & Entwicklung für eigene Kund:innen." },
      { period: "2018 – 2022", role: "Senior Designerin", place: "Studio Fjord", text: "Leitung von Web- und Markenprojekten." },
      { period: "2016 – 2018", role: "Junior Entwicklerin", place: "Pixelwerk GmbH", text: "Frontend-Entwicklung für Agenturkunden." },
    ],
  },

  // ---------- Kontakt ----------
  contact: {
    title: "Lass uns sprechen",
    text: "Du hast ein Projekt im Kopf? Schreib mir – ich antworte meist innerhalb eines Tages.",
    email: "hallo@maralindqvist.de",
    buttonLabel: "E-Mail schreiben",
    socials: [
      { label: "LinkedIn", href: "https://linkedin.com" },
      { label: "GitHub", href: "https://github.com" },
      { label: "Instagram", href: "https://instagram.com" },
    ],
  },

  // ---------- Fußzeile ----------
  footer: {
    text: "© 2026 Mara Lindqvist. Alle Rechte vorbehalten.",
  },
};

export type SectionId = (typeof portfolio.nav.sections)[number];
