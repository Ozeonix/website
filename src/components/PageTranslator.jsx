import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useLang } from "@/lib/i18n/LanguageContext";
import { translateBatch } from "@/lib/i18n/translate.functions";

const SKIP_TAGS = new Set([
  "SCRIPT", "STYLE", "NOSCRIPT", "CODE", "PRE", "TEXTAREA", "INPUT",
  "SELECT", "OPTION", "IFRAME", "SVG", "PATH", "CANVAS",
]);

function isTranslatable(text) {
  if (!text) return false;
  const t = text.trim();
  if (t.length < 2) return false;
  if (!/[A-Za-z]/.test(t)) return false;
  return true;
}

function collectTextNodes(root) {
  const out = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (SKIP_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT;
      if (parent.closest("[data-no-translate]")) return NodeFilter.FILTER_REJECT;
      return isTranslatable(node.textContent) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    },
  });
  let n;
  while ((n = walker.nextNode())) out.push(n);
  return out;
}

function loadCache(lang) {
  try { return JSON.parse(localStorage.getItem(`oz.i18n.${lang}`) || "{}"); } catch { return {}; }
}
function saveCache(lang, cache) {
  try { localStorage.setItem(`oz.i18n.${lang}`, JSON.stringify(cache)); } catch { /* ignore quota */ }
}

/**
 * PageTranslator — client-side runtime translator.
 * Walks visible text nodes under <main>, batches unique English strings to the
 * Ozeonix AI translate server function, caches results in localStorage, and
 * swaps textContent in place. English restores original text.
 */
export default function PageTranslator() {
  const { lang } = useLang();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const translate = useServerFn(translateBatch);
  const originals = useRef(new WeakMap()); // Text node -> original textContent
  const runToken = useRef(0);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const token = ++runToken.current;
    let cancelled = false;

    const run = async () => {
      // Give the router a moment to paint the new route
      await new Promise((r) => setTimeout(r, 60));
      if (cancelled || token !== runToken.current) return;

      const root = document.querySelector("main") || document.body;
      if (!root) return;
      const nodes = collectTextNodes(root);

      // Ensure we always remember the English original the first time we see a node
      nodes.forEach((n) => {
        if (!originals.current.has(n)) originals.current.set(n, n.textContent);
      });

      if (lang === "en") {
        nodes.forEach((n) => {
          const orig = originals.current.get(n);
          if (orig != null && n.textContent !== orig) n.textContent = orig;
        });
        return;
      }

      // Group nodes by their trimmed English original
      const groups = new Map(); // trimmed original -> Text[]
      nodes.forEach((n) => {
        const orig = (originals.current.get(n) ?? n.textContent) || "";
        const key = orig.trim();
        if (!key) return;
        if (!groups.has(key)) groups.set(key, []);
        groups.get(key).push(n);
      });

      const cache = loadCache(lang);
      const applyOne = (key, translated) => {
        const list = groups.get(key);
        if (!list) return;
        list.forEach((n) => {
          const src = originals.current.get(n) ?? n.textContent ?? "";
          const m = src.match(/^(\s*)([\s\S]*?)(\s*)$/);
          n.textContent = (m ? m[1] : "") + translated + (m ? m[3] : "");
        });
      };

      // Apply cached translations first
      const missing = [];
      groups.forEach((_v, key) => {
        if (cache[key]) applyOne(key, cache[key]);
        else missing.push(key);
      });
      if (missing.length === 0) return;

      const CHUNK = 30;
      for (let i = 0; i < missing.length; i += CHUNK) {
        if (cancelled || token !== runToken.current) return;
        const batch = missing.slice(i, i + CHUNK);
        try {
          const { translations } = await translate({ data: { texts: batch, target: lang } });
          batch.forEach((key, idx) => {
            const t = translations[idx];
            if (typeof t === "string" && t.trim().length > 0 && t !== key) {
              cache[key] = t;
              applyOne(key, t);
            }
          });
          saveCache(lang, cache);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error("[i18n] translate failed", err);
          break;
        }
      }
    };

    run();
    return () => { cancelled = true; };
  }, [lang, pathname, translate]);

  return null;
}
