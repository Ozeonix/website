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
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env.OZEONIX_API_KEY;
    if (!key) throw new Error("Missing OZEONIX_API_KEY");

    const system =
      `You are a professional website translator. Translate each string from English to ${NAMES[data.target]}. ` +
      `Preserve punctuation, numbers, capitalisation intent, URLs, email addresses, phone numbers, and brand names such as "Ozeonix Infinity". ` +
      `Keep short technical acronyms untranslated (CRM, ERP, LMS, HRMS, POS, API, SEO, AI, UI, UX, React, Node.js, Flutter, MongoDB, PostgreSQL, Firebase, AWS, Docker, Kubernetes). ` +
      `Return STRICT JSON in the shape {"translations": string[]} with EXACTLY the same length and order as the input array. No commentary.`;

    const user = JSON.stringify({ items: data.texts });

    const res = await fetch("https://ai.gateway.ozeonix.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Ozeonix-API-Key": key,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`AI gateway error ${res.status}: ${body.slice(0, 300)}`);
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
