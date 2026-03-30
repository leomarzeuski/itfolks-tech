"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";

const GridScan = dynamic(
  () => import("@/components/react-bits/GridScan").then((m) => m.GridScan),
  { ssr: false }
);

export function GridBackground() {
  const shouldRender = useSyncExternalStore(
    () => () => {},
    () => {
      const mobile = window.matchMedia("(max-width: 900px)").matches;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      return !mobile && !reduceMotion;
    },
    () => false
  );

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 -z-10">
      <GridScan
        sensitivity={0.55}
        lineThickness={1}
        linesColor="#0a1628"
        gridScale={0.1}
        scanColor="#3B82F6"
        scanOpacity={0.35}
        enablePost
        bloomIntensity={0.5}
        chromaticAberration={0.002}
        noiseIntensity={0.01}
      />
    </div>
  );
}
