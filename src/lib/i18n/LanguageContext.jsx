import { createContext, useContext, useEffect, useState } from "react";

export const LANGUAGES = [
  { code: "en", label: "English", short: "EN" },
  { code: "ne", label: "नेपाली", short: "NE" },
  { code: "hi", label: "हिन्दी", short: "HI" },
  { code: "zh", label: "中文", short: "ZH" },
];

const LangCtx = createContext({ lang: "en", setLang: () => {} });

export function useLang() {
  return useContext(LangCtx);
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("oz.lang");
      if (stored && LANGUAGES.some((l) => l.code === stored)) setLangState(stored);
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem("oz.lang", l); } catch { /* ignore */ }
  };

  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}
