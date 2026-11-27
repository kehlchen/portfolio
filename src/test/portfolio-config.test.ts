import { describe, expect, it } from "vitest";

import { portfolio } from "@/config/portfolio";

// The page is a minimal dark-mode developer site: only projects, each with a
// GitHub link and a binary download. These rules must keep holding.
describe("Portfolio config", () => {
  it("runs in dark mode", () => {
    expect(portfolio.theme.colorScheme).toBe("dark");
  });

  it("uses English page metadata", () => {
    expect(portfolio.meta.language).toBe("en");
  });

  it("lists projects, each with a description", () => {
    expect(portfolio.projects.items.length).toBeGreaterThan(0);
    for (const pr of portfolio.projects.items) {
      expect(pr.name.trim().length).toBeGreaterThan(0);
      expect(pr.description.trim().length).toBeGreaterThan(0);
    }
  });

  it("gives every project a github link and a binary download", () => {
    for (const pr of portfolio.projects.items) {
      expect(pr.github.startsWith("https://github.com/")).toBe(true);
      expect(pr.download.startsWith("https://")).toBe(true);
      expect(pr.file.trim().length).toBeGreaterThan(0);
    }
  });
});
