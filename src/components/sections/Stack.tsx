"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { STACK } from "@/lib/content";
import styles from "./Home.module.css";

/**
 * Sovereign Intelligence Stack — five planes in real CSS 3D (perspective +
 * rotateX/rotateZ, each layer lifted on its own translateZ). The layer list
 * drives the highlighted plane, the pointer tilts the whole stack a few
 * degrees, and an ambient cycle runs until the visitor takes over.
 */
export default function Stack() {
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const touched = useRef(false);
  const planesRef = useRef<HTMLDivElement>(null);

  /* Ambient cycle; off under reduced motion */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      if (!touched.current) setActive((a) => (a + 1) % STACK.layers.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  /* Pointer tilt — written straight to CSS variables, no re-render */
  useEffect(() => {
    const planes = planesRef.current;
    const art = planes?.parentElement?.parentElement;
    if (!planes || !art) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }
    let raf = 0;
    let tx = 0;
    let ty = 0;
    const paint = () => {
      raf = 0;
      planes.style.setProperty("--tilt-x", `${tx.toFixed(2)}deg`);
      planes.style.setProperty("--tilt-y", `${ty.toFixed(2)}deg`);
    };
    const onMove = (e: PointerEvent) => {
      const r = art.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      tx = -ny * 10; // tip toward / away from the viewer
      ty = nx * 12; // swing left / right
      if (!raf) raf = window.requestAnimationFrame(paint);
    };
    const onLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = window.requestAnimationFrame(paint);
    };
    art.addEventListener("pointermove", onMove, { passive: true });
    art.addEventListener("pointerleave", onLeave);
    return () => {
      window.cancelAnimationFrame(raf);
      art.removeEventListener("pointermove", onMove);
      art.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const select = (i: number) => {
    touched.current = true;
    setActive(i);
  };

  const shown = hover ?? active;

  return (
    <section id="stack" className={styles.stack} aria-labelledby="stack-title">
      <div className={`wide ${styles.stackGrid}`}>
        <div className={styles.stackText}>
          <p className="overline overline--muted">{STACK.overline}</p>
          <h2 id="stack-title" className={`display display-lg ${styles.stackTitle}`}>
            {STACK.headingBefore}
            <span className="accent">{STACK.headingAccent}</span>
            {STACK.headingAfter}
          </h2>
          <p className={`lede ${styles.stackLede}`}>{STACK.lede}</p>
          <button type="button" className="btn btn--ghost" onClick={() => select((active + 1) % STACK.layers.length)}>
            {STACK.cta.label} <span className="btn__arrow">↗</span>
          </button>
        </div>

        <div className={styles.stackArt} aria-hidden="true">
          <div className={styles.stackCore}>
            <Image src={STACK.image.src} alt="" width={1024} height={977} sizes="(max-width: 1023px) 90vw, 36vw" />
          </div>
          <div className={styles.scene}>
            <div className={styles.planes} ref={planesRef}>
              {STACK.layers.map((layer, i) => (
                <div
                  key={layer.name}
                  className={styles.plane}
                  data-active={i === shown ? "true" : undefined}
                  data-below={i < shown ? "true" : undefined}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className={styles.planeGrid} />
                  <span className={styles.planeLabel}>
                    <span className={styles.planeIndex}>{String(i + 1).padStart(2, "0")}</span>
                    {layer.plane ?? layer.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <ol className={styles.layerList}>
          {STACK.layers.map((layer, i) => (
            <li key={layer.name}>
              <button
                type="button"
                className={styles.layer}
                data-active={i === active ? "true" : undefined}
                aria-pressed={i === active}
                onClick={() => select(i)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => select(i)}
              >
                <span className={styles.layerIndex}>{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.layerName}>{layer.name}</span>
                <span className={styles.layerDetail}>{layer.detail}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
