type OzeonixErrorOptions = {
  mechanism?: "manual" | "onerror" | "unhandledrejection" | "react_error_boundary";
  handled?: boolean;
  severity?: "error" | "warning" | "info";
};

type OzeonixEvents = {
  captureException?: (
    error: unknown,
    context?: Record<string, unknown>,
    options?: OzeonixErrorOptions,
  ) => void;
};

declare global {
  interface Window {
    __ozeonixEvents?: OzeonixEvents;
  }
}

export function reportOzeonixError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.__ozeonixEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context,
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error",
    },
  );
}
