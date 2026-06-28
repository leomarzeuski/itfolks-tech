import type { ReactNode } from "react";
import BorderGlow from "@/components/BorderGlow";

/**
 * Brand-tuned wrapper around React Bits BorderGlow so every card across the
 * site shares the same edge-following hover glow. Pass content as children
 * (include your own padding). Tweak the glow once here.
 */
export function GlowCard({
  children,
  className = "",
  radius = 14,
  glowRadius = 34,
}: {
  children: ReactNode;
  className?: string;
  radius?: number;
  glowRadius?: number;
}) {
  return (
    <BorderGlow
      className={className}
      backgroundColor="#0e0f11"
      borderRadius={radius}
      glowColor="258 85 72"
      colors={["#38bdf8", "#6d5efc", "#a855f7"]}
      edgeSensitivity={30}
      glowRadius={glowRadius}
      coneSpread={25}
    >
      {children}
    </BorderGlow>
  );
}
