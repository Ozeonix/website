import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://ozeonix.com";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", lastmod: "2026-11-18", changefreq: "weekly", priority: "1.0" },
          { path: "/pricing", lastmod: "2026-11-18", changefreq: "weekly", priority: "0.9" },
          { path: "/services", lastmod: "2026-11-18", changefreq: "weekly", priority: "0.9" },
          {
            path: "/services/erp-development",
            lastmod: "2026-11-18",
            changefreq: "weekly",
            priority: "0.9",
          },
          {
            path: "/services/crm-solutions",
            lastmod: "2026-11-18",
            changefreq: "weekly",
            priority: "0.9",
          },
          {
            path: "/services/lms-platforms",
            lastmod: "2026-11-18",
            changefreq: "weekly",
            priority: "0.9",
          },
          { path: "/products", lastmod: "2026-11-18", changefreq: "weekly", priority: "0.9" },
          { path: "/industries", lastmod: "2026-11-18", changefreq: "weekly", priority: "0.8" },
          { path: "/about", lastmod: "2026-11-18", changefreq: "monthly", priority: "0.8" },
          { path: "/process", lastmod: "2026-11-18", changefreq: "monthly", priority: "0.8" },
          { path: "/portfolio", lastmod: "2026-11-18", changefreq: "weekly", priority: "0.8" },
          { path: "/faq", lastmod: "2026-11-18", changefreq: "monthly", priority: "0.7" },
          { path: "/contact", lastmod: "2026-11-18", changefreq: "monthly", priority: "0.8" },
          { path: "/careers", lastmod: "2026-11-18", changefreq: "weekly", priority: "0.8" },
          { path: "/blog", lastmod: "2026-11-18", changefreq: "weekly", priority: "0.7" },

          // Regional Market - Nepal
          { path: "/np", lastmod: "2026-11-18", changefreq: "weekly", priority: "0.9" },
          { path: "/np/about", lastmod: "2026-11-18", changefreq: "monthly", priority: "0.8" },
          { path: "/np/services", lastmod: "2026-11-18", changefreq: "weekly", priority: "0.8" },
          { path: "/np/pricing", lastmod: "2026-11-18", changefreq: "weekly", priority: "0.8" },
          { path: "/np/contact", lastmod: "2026-11-18", changefreq: "monthly", priority: "0.8" },

          // Regional Market - India
          { path: "/in", lastmod: "2026-11-18", changefreq: "weekly", priority: "0.9" },
          { path: "/in/about", lastmod: "2026-11-18", changefreq: "monthly", priority: "0.8" },
          { path: "/in/services", lastmod: "2026-11-18", changefreq: "weekly", priority: "0.8" },
          { path: "/in/pricing", lastmod: "2026-11-18", changefreq: "weekly", priority: "0.8" },
          { path: "/in/contact", lastmod: "2026-11-18", changefreq: "monthly", priority: "0.8" },

          // Regional Market - Global
          { path: "/global", lastmod: "2026-11-18", changefreq: "weekly", priority: "0.9" },
          { path: "/global/about", lastmod: "2026-11-18", changefreq: "monthly", priority: "0.8" },
          {
            path: "/global/services",
            lastmod: "2026-11-18",
            changefreq: "weekly",
            priority: "0.8",
          },
          { path: "/global/pricing", lastmod: "2026-11-18", changefreq: "weekly", priority: "0.8" },
          {
            path: "/global/contact",
            lastmod: "2026-11-18",
            changefreq: "monthly",
            priority: "0.8",
          },
          {
            path: "/industries/e-commerce",
            lastmod: "2026-11-17",
            changefreq: "monthly",
            priority: "0.7",
          },
          {
            path: "/industries/on-demand",
            lastmod: "2026-11-17",
            changefreq: "monthly",
            priority: "0.7",
          },
          {
            path: "/industries/fitness",
            lastmod: "2026-11-17",
            changefreq: "monthly",
            priority: "0.7",
          },
          {
            path: "/industries/payments",
            lastmod: "2026-11-17",
            changefreq: "monthly",
            priority: "0.7",
          },
          {
            path: "/industries/entertainment",
            lastmod: "2026-11-17",
            changefreq: "monthly",
            priority: "0.7",
          },
          {
            path: "/industries/education",
            lastmod: "2026-11-17",
            changefreq: "monthly",
            priority: "0.7",
          },
          {
            path: "/industries/event",
            lastmod: "2026-11-17",
            changefreq: "monthly",
            priority: "0.7",
          },
          {
            path: "/industries/restaurant",
            lastmod: "2026-11-17",
            changefreq: "monthly",
            priority: "0.7",
          },
          {
            path: "/industries/health",
            lastmod: "2026-11-17",
            changefreq: "monthly",
            priority: "0.7",
          },
          { path: "/privacy", lastmod: "2026-11-17", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", lastmod: "2026-11-17", changefreq: "yearly", priority: "0.3" },
          { path: "/refund", lastmod: "2026-11-17", changefreq: "yearly", priority: "0.3" },
          { path: "/cookies", lastmod: "2026-11-17", changefreq: "yearly", priority: "0.3" },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
