"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import styles from "./Tilt.module.css";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  /** Maximum translation in px (parallax drift toward the pointer). */
  shift?: number;
  /** Scale while hovered. */
  scale?: number;
  /** Soft specular highlight that follows the pointer (for photographic media). */
  glare?: boolean;
  /** Track the pointer over this element or over its parent (e.g. the whole card). */
  listen?: "self" | "parent";
  mirror?: boolean;
};

/**
 * Pointer-driven 3D tilt. Writes transforms straight to the DOM (no re-renders),
 * only on fine-pointer devices, and never when the visitor prefers reduced motion.
 */
export default function Tilt({
  children,
  className,
  style,
  max = 6,
  shift = 0,
  scale = 1,
  glare = false,
  listen = "self",
  mirror,
}: Props) {
  const root = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    const target = listen === "parent" ? (el.parentElement ?? el) : el;
    const shine = glareRef.current;

    let raf = 0;
    let rx = 0;
    let ry = 0;
    let dx = 0;
    let dy = 0;
    let gx = 50;
    let gy = 50;
    let hovered = false;

    const paint = () => {
      raf = 0;
      el.style.transform = `perspective(1000px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translate3d(${dx.toFixed(1)}px, ${dy.toFixed(1)}px, 0) scale(${hovered ? scale : 1})`;
      if (shine) {
        shine.style.opacity = hovered ? "1" : "0";
        shine.style.background = `radial-gradient(circle at ${gx.toFixed(1)}% ${gy.toFixed(1)}%, rgba(255,255,255,0.16), rgba(255,255,255,0.04) 38%, transparent 62%)`;
      }
    };
    const schedule = () => {
      if (!raf) raf = window.requestAnimationFrame(paint);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = Math.max(-0.5, Math.min(0.5, (e.clientX - r.left) / r.width - 0.5));
      const ny = Math.max(-0.5, Math.min(0.5, (e.clientY - r.top) / r.height - 0.5));
      rx = -ny * 2 * max;
      ry = nx * 2 * max;
      dx = nx * 2 * shift;
      dy = ny * 2 * shift;
      gx = 50 + nx * 100;
      gy = 50 + ny * 100;
      hovered = true;
      el.style.transitionDuration = "160ms";
      schedule();
    };
    const onLeave = () => {
      rx = ry = dx = dy = 0;
      gx = gy = 50;
      hovered = false;
      el.style.transitionDuration = "700ms";
      schedule();
    };

    target.addEventListener("pointermove", onMove, { passive: true });
    target.addEventListener("pointerleave", onLeave);
    return () => {
      window.cancelAnimationFrame(raf);
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", onLeave);
    };
  }, [max, shift, scale, listen]);

  return (
    <div ref={root} className={`${styles.tilt}${className ? ` ${className}` : ""}`} style={style} data-mirror={mirror ? "true" : undefined}>
      {children}
      {glare && <span ref={glareRef} className={styles.glare} aria-hidden="true" />}
    </div>
  );
}
