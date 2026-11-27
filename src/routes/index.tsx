import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { portfolio as p, type SectionId } from "../config/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: p.meta.title },
      { name: "description", content: p.meta.description },
      { property: "og:title", content: p.meta.title },
      { property: "og:description", content: p.meta.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: p.fonts.googleFontsUrl }],
  }),
  component: Index,
});

const t = p.theme;
const vars = {
  "--background": t.background,
  "--foreground": t.foreground,
  "--card": t.card,
  "--muted": t.muted,
  "--muted-foreground": t.mutedForeground,
  "--primary": t.primary,
  "--primary-foreground": t.primaryForeground,
  "--border": t.border,
  "--radius": t.radius,
  fontFamily: `"${p.fonts.body}", sans-serif`,
} as CSSProperties;
const heading: CSSProperties = { fontFamily: `"${p.fonts.heading}", serif` };

function Title({ children }: { children: string }) {
  return (
    <h2 style={heading} className="mb-10 text-4xl font-bold md:text-5xl">
      {children}
    </h2>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-24">
      <Title>{p.about.title}</Title>
      <div className="grid gap-10 md:grid-cols-[2fr_1fr]">
        <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
          {p.about.paragraphs.map((x) => <p key={x}>{x}</p>)}
        </div>
        <div className="grid gap-4">
          {p.about.facts.map((f) => (
            <div key={f.label} className="border-l-2 border-primary pl-4">
              <div style={heading} className="text-3xl font-bold text-primary">{f.value}</div>
              <div className="text-sm text-muted-foreground">{f.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <Title>{p.projects.title}</Title>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {p.projects.items.map((pr) => {
          const inner = (
            <>
              {pr.image && (
                <img src={pr.image} alt={pr.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              )}
              <div className="p-5">
                <div className="mb-2 flex flex-wrap gap-2">
                  {pr.tags.map((tag) => (
                    <span key={tag} className="rounded-sm bg-muted px-2 py-0.5 text-xs text-muted-foreground">{tag}</span>
                  ))}
                </div>
                <h3 style={heading} className="text-xl font-bold group-hover:text-primary">{pr.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{pr.description}</p>
              </div>
            </>
          );
          const cls = "group block overflow-hidden rounded-lg border bg-card";
          return pr.link ? (
            <a key={pr.title} href={pr.link} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
          ) : (
            <div key={pr.title} className={cls}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-5xl px-6 py-24">
      <Title>{p.skills.title}</Title>
      <div className="grid gap-8 md:grid-cols-3">
        {p.skills.groups.map((g) => (
          <div key={g.name}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">{g.name}</h3>
            <ul className="space-y-2">
              {g.items.map((i) => <li key={i} className="border-b pb-2">{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <Title>{p.experience.title}</Title>
      <div className="space-y-8">
        {p.experience.items.map((e) => (
          <div key={e.period + e.role} className="grid gap-2 border-t pt-6 md:grid-cols-[200px_1fr]">
            <div className="text-sm text-muted-foreground">{e.period}</div>
            <div>
              <h3 style={heading} className="text-xl font-bold">{e.role} <span className="text-primary">· {e.place}</span></h3>
              <p className="mt-1 text-muted-foreground">{e.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const c = p.contact;
  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h2 style={heading} className="text-4xl font-bold md:text-6xl">{c.title}</h2>
      <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">{c.text}</p>
      <a href={`mailto:${c.email}`} className="mt-8 inline-block rounded-md bg-primary px-8 py-3 font-medium text-primary-foreground hover:opacity-90">{c.buttonLabel}</a>
      <p className="mt-4 text-sm text-muted-foreground">{c.email}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-6">
        {c.socials.map((s) => (
          <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="underline-offset-4 hover:text-primary hover:underline">{s.label}</a>
        ))}
      </div>
    </section>
  );
}

const sectionMap: Record<SectionId, () => React.JSX.Element> = {
  about: About, projects: Projects, skills: Skills, experience: Experience, contact: Contact,
};

function Index() {
  const h = p.hero;
  return (
    <div style={vars} className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b bg-background/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
          <a href="#" style={heading} className="text-xl font-bold">{p.nav.logo}</a>
          <div className="hidden gap-6 text-sm md:flex">
            {p.nav.sections.map((s) => (
              <a key={s} href={`#${s}`} className="hover:text-primary">{p.nav.labels[s]}</a>
            ))}
          </div>
        </nav>
      </header>
      {h.show && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[3fr_2fr] md:py-32">
          <div>
            <p className="mb-3 text-primary">{h.greeting}</p>
            <h1 style={heading} className="text-5xl font-bold leading-tight md:text-7xl">{h.name}</h1>
            <p className="mt-4 text-xl font-medium">{h.role}</p>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">{h.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href={h.primaryButton.href} className="rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground hover:opacity-90">{h.primaryButton.label}</a>
              <a href={h.secondaryButton.href} className="rounded-md border px-6 py-3 font-medium hover:border-primary hover:text-primary">{h.secondaryButton.label}</a>
            </div>
          </div>
          {h.image && <img src={h.image} alt={h.name} fetchPriority="high" className="aspect-[4/5] w-full rounded-lg object-cover" />}
        </section>
      )}
      <main>
        {p.nav.sections.map((s) => {
          const C = sectionMap[s];
          return <C key={s} />;
        })}
      </main>
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">{p.footer.text}</footer>
    </div>
  );
}
