"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";

/**
 * Loads and themes the Cal.com embed once. Any element with a `data-cal-link`
 * attribute then opens the booking modal on click (Cal uses event delegation),
 * so booking buttons can be plain server-rendered elements.
 */
export function CalInit() {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi();
      cal("ui", {
        theme: "dark",
        cssVarsPerTheme: {
          dark: { "cal-brand": "#5e6ad2" },
          light: { "cal-brand": "#5e6ad2" },
        },
        hideEventTypeDetails: false,
      });
    })();
  }, []);

  return null;
}
