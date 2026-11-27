import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { portfolio as p, type Project } from "../config/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: p.meta.title },
      { name: "description", content: p.meta.description },
      { property: "og:title", content: p.meta.title },
      { property: "og:description", content: p.meta.description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
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
  colorScheme: t.colorScheme,
  fontFamily: `"${p.fonts.body}", sans-serif`,
} as CSSProperties;

const mono: CSSProperties = { fontFamily: `"${p.fonts.heading}", monospace` };

const linkCls =
  "underline-offset-4 hover:text-primary hover:underline transition-colors";

function ProjectRow({ pr }: { pr: Project }) {
  const meta = [pr.version && `v${pr.version}`, pr.language].filter(Boolean).join(" · ");
  return (
    <li className="border-t border-border py-7 first:border-t-0 first:pt-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 style={mono} className="text-base font-bold tracking-tight">
          {pr.name}
          {meta && (
            <span className="ml-3 text-xs font-normal text-muted-foreground">{meta}</span>
          )}
        </h3>
      </div>

      <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {pr.description}
      </p>

      <div style={mono} className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
        {pr.github && (
          <a
            href={pr.github}
            target="_blank"
            rel="noreferrer"
            className={`${linkCls} text-muted-foreground`}
          >
            github ↗
          </a>
        )}
        {pr.download && (
          <a
            href={pr.download}
            className={`${linkCls} text-primary`}
            download={pr.file || true}
          >
            ↓ {pr.file || "binary"}
          </a>
        )}
      </div>
    </li>
  );
}

function Index() {
  const h = p.header;
  return (
    <div style={vars} className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-12">
          {h.prompt && (
            <p style={mono} className="text-xs text-primary/70">
              {h.prompt}
            </p>
          )}
          <h1 style={mono} className="mt-3 text-2xl font-bold tracking-tight">
            {h.name}
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
            {h.tagline}
          </p>
          <div style={mono} className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs">
            {h.links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={`${linkCls} text-muted-foreground`}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <h2
          style={mono}
          className="mb-8 text-xs uppercase tracking-[0.25em] text-muted-foreground"
        >
          {p.projects.label}
        </h2>
        <ul>
          {p.projects.items.map((pr) => (
            <ProjectRow key={pr.name} pr={pr} />
          ))}
        </ul>
      </main>

      <footer className="border-t border-border">
        <div
          style={mono}
          className="mx-auto max-w-3xl px-6 py-8 text-xs text-muted-foreground"
        >
          {p.footer.text}
        </div>
      </footer>
    </div>
  );
}
