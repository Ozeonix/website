import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  texts: z.array(z.string().min(1).max(2000)).min(1).max(60),
  target: z.enum(["ne", "hi", "zh"]),
});

const NAMES: Record<"ne" | "hi" | "zh", string> = {
  ne: "Nepali (Devanagari script)",
  hi: "Hindi (Devanagari script)",
  zh: "Simplified Chinese",
};

export const translateBatch = createServerFn({ method: "POST" })
  .validator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env.OPENAI_API_KEY || process.env.AI_API_KEY || process.env.GEMINI_API_KEY;
    if (!key) {
      // Graceful fallback when AI translation API key is not configured in cloud/local environment
      return { translations: data.texts };
    }

    const endpoint =
      process.env.AI_GATEWAY_URL ||
      (process.env.OPENAI_API_KEY ? "https://api.openai.com/v1/chat/completions" : "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions");

    const system =
      `You are a professional website translator. Translate each string from English to ${NAMES[data.target]}. ` +
      `Preserve punctuation, numbers, capitalisation intent, URLs, email addresses, phone numbers, and brand names such as "Ozeonix Infinity". ` +
      `Keep short technical acronyms untranslated (CRM, ERP, LMS, HRMS, POS, API, SEO, AI, UI, UX, React, Node.js, Flutter, MongoDB, PostgreSQL, Firebase, AWS, Docker, Kubernetes). ` +
      `Return STRICT JSON in the shape {"translations": string[]} with EXACTLY the same length and order as the input array. No commentary.`;

    const user = JSON.stringify({ items: data.texts });

    const model = process.env.AI_MODEL || (process.env.OPENAI_API_KEY ? "gpt-4o-mini" : "gemini-2.0-flash");

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (!res.ok) {
      console.warn(`[translateBatch] AI translation service error ${res.status}. Falling back to source texts.`);
      return { translations: data.texts };
    }

    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = json.choices?.[0]?.message?.content ?? "{}";
    let parsed: { translations?: unknown } = {};
    try { parsed = JSON.parse(content); } catch { parsed = {}; }
    const arr = Array.isArray(parsed.translations) ? parsed.translations : [];
    const translations = data.texts.map((src, i) =>
      typeof arr[i] === "string" && (arr[i] as string).trim().length > 0 ? (arr[i] as string) : src,
    );
    return { translations };
  });
