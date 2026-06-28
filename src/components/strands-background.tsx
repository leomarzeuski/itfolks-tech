"use client";

import React, { useEffect, useState, type ComponentProps } from "react";
import Strands from "@/components/Strands";

/** Renders nothing if its child throws (e.g. WebGL context lost). */
class SilentBoundary extends React.Component<
  { children: React.ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    /* swallow — decorative */
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return (
      !!window.WebGLRenderingContext &&
      !!(canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Guarded wrapper around the React Bits Strands (WebGL) background. Fills its
 * parent; mounts only when WebGL is available and reduced motion isn't
 * requested, failing silently otherwise.
 */
export function StrandsBackground(props: ComponentProps<typeof Strands>) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (!reduceMotion && supportsWebGL()) setEnabled(true);
  }, []);

  if (!enabled) return null;

  return (
    <SilentBoundary>
      <Strands {...props} />
    </SilentBoundary>
  );
}
