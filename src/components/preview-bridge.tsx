"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Bridges the live preview docked inside the Strapi admin (strapi-plugin-mcp-chat):
 * reports location changes to the parent frame and restores scroll position on
 * reload. No-op when the page is not rendered inside an iframe.
 */
export function PreviewBridge() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined" || window.self === window.top) return;

    const key = `preview-scroll:${pathname}`;
    try {
      window.parent.postMessage(
        { type: "preview:location", href: window.location.href },
        "*"
      );
    } catch {}

    const saved = sessionStorage.getItem(key);
    if (saved != null) {
      const y = parseInt(saved, 10) || 0;
      [0, 60, 180, 400, 800].forEach((t) =>
        setTimeout(() => window.scrollTo(0, y), t)
      );
    }

    const save = () => {
      try {
        sessionStorage.setItem(key, String(window.scrollY));
      } catch {}
    };
    window.addEventListener("scroll", save, { passive: true });
    window.addEventListener("beforeunload", save);
    return () => {
      save();
      window.removeEventListener("scroll", save);
      window.removeEventListener("beforeunload", save);
    };
  }, [pathname]);

  return null;
}
