"use client";

import { useEffect, useRef } from "react";

/**
 * Hero backdrop: a network of nodes in a 3D volume, projected with a simple
 * pinhole camera. The camera drifts forward on its own and advances further as
 * the visitor scrolls ("Scroll through the network"); the pointer nudges the
 * view a few pixels for parallax. Nodes that pass the camera respawn at the
 * far plane, so the flight is endless in both directions.
 *
 * Plain canvas 2D — no WebGL, no dependencies. Static single frame under
 * prefers-reduced-motion; paused while hidden or scrolled out of view.
 */

type Node = { x: number; y: number; z: number; r: number; red: boolean };

const NEAR = 90;
const FAR = 1600;
const DEPTH = FAR - NEAR;
const DRIFT = 22; // world units per second
const SCROLL_GAIN = 1.15; // world units per scrolled pixel
const STEPS = 20;

const grey = Array.from({ length: STEPS + 1 }, (_, i) => `rgba(140,150,163,${(i / STEPS).toFixed(3)})`);
const red = Array.from({ length: STEPS + 1 }, (_, i) => `rgba(211,25,32,${(i / STEPS).toFixed(3)})`);
const ink = Array.from({ length: STEPS + 1 }, (_, i) => `rgba(246,246,243,${(i / STEPS).toFixed(3)})`);

export default function NetworkCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let w = 0;
    let h = 0;
    let f = 0; // focal length
    let cx = 0;
    let cy = 0;
    let link = 220;
    let nodes: Node[] = [];

    let cam = 0; // camera z (world)
    let drift = 0; // ambient travel
    let scrollY = 0;
    let px = 0;
    let py = 0; // pointer parallax (current)
    let tx = 0;
    let ty = 0; // pointer parallax (target)

    let raf = 0;
    let running = false;
    let inView = true;
    let last = 0;

    // projected scratch buffers
    let sx = new Float32Array(0);
    let sy = new Float32Array(0);
    let sr = new Float32Array(0);
    let sa = new Float32Array(0);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const spawn = (n: Node, z: number) => {
      // Spread so the far plane is comfortably over-filled; near the camera only
      // nodes close to the axis stay in frame, which is what gives the flight its depth.
      const ex = (w * 0.5 * FAR) / f;
      const ey = (h * 0.5 * FAR) / f;
      n.x = rand(-ex, ex) * 0.85;
      n.y = rand(-ey, ey) * 0.85;
      n.z = z;
      n.r = Math.random() < 0.14 ? 2.6 : 1.6;
      n.red = Math.random() < 0.12;
    };

    const seed = () => {
      const count = Math.round(Math.min(320, Math.max(120, (w * h) / 6000)));
      nodes = Array.from({ length: count }, () => ({ x: 0, y: 0, z: 0, r: 1, red: false }));
      for (const n of nodes) spawn(n, cam + rand(NEAR, FAR));
      sx = new Float32Array(count);
      sy = new Float32Array(count);
      sr = new Float32Array(count);
      sa = new Float32Array(count);
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      f = Math.max(h * 1.05, w * 0.6);
      cx = w / 2;
      cy = h / 2;
      link = Math.max(190, Math.min(w, h) * 0.36);
      seed();
      draw();
    };

    const project = () => {
      const nearFade = 160;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        let rz = n.z - cam;
        // wrap in both directions so scrolling back still works
        if (rz < NEAR) {
          spawn(n, n.z + DEPTH);
          rz = n.z - cam;
        } else if (rz > FAR) {
          spawn(n, n.z - DEPTH);
          rz = n.z - cam;
        }
        const t = (rz - NEAR) / DEPTH; // 0 near … 1 far
        const depth = Math.pow(1 - t, 1.2);
        const fade = Math.min(1, (rz - NEAR) / nearFade);
        sa[i] = fade * (0.22 + 0.78 * depth);
        const k = f / rz;
        sx[i] = cx + px + n.x * k;
        sy[i] = cy + py + n.y * k;
        sr[i] = Math.min(3.4, Math.max(0.6, n.r * k * 1.1));
      }
    };

    const draw = () => {
      project();
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;

      // links — tested in 3D so depth genuinely separates the layers
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ai = sa[i];
        if (ai <= 0.02) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dz = a.z - b.z;
          if (dz > link || dz < -link) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d > link) continue;
          const strength = (1 - d / link) * Math.min(ai, sa[j]);
          const isRed = a.red && b.red;
          const idx = Math.round(Math.min(1, strength * (isRed ? 1 : 0.62)) * STEPS);
          if (idx === 0) continue;
          ctx.strokeStyle = isRed ? red[idx] : grey[idx];
          ctx.beginPath();
          ctx.moveTo(sx[i], sy[i]);
          ctx.lineTo(sx[j], sy[j]);
          ctx.stroke();
        }
      }

      // nodes
      for (let i = 0; i < nodes.length; i++) {
        const idx = Math.round(Math.min(1, sa[i] * (nodes[i].red ? 1 : 0.9)) * STEPS);
        if (idx === 0) continue;
        ctx.fillStyle = nodes[i].red ? red[idx] : ink[idx];
        ctx.beginPath();
        ctx.arc(sx[i], sy[i], sr[i], 0, Math.PI * 2);
        ctx.fill();
        if (nodes[i].red && sr[i] > 1.6) {
          ctx.fillStyle = red[Math.max(1, Math.round(idx * 0.25))];
          ctx.beginPath();
          ctx.arc(sx[i], sy[i], sr[i] * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      drift += DRIFT * dt;
      const target = drift + scrollY * SCROLL_GAIN;
      cam += (target - cam) * Math.min(1, dt * 6);
      px += (tx - px) * Math.min(1, dt * 5);
      py += (ty - py) * Math.min(1, dt * 5);
      draw();
      raf = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || reduce || !inView || document.hidden) return;
      running = true;
      last = performance.now();
      raf = window.requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      window.cancelAnimationFrame(raf);
    };

    const onScroll = () => {
      scrollY = Math.max(0, window.scrollY);
    };
    const onPointer = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      tx = -((e.clientX - rect.left) / rect.width - 0.5) * 36;
      ty = -((e.clientY - rect.top) / rect.height - 0.5) * 24;
    };
    const onPointerLeave = () => {
      tx = 0;
      ty = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(host);

    resize();
    if (!reduce) {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      if (finePointer) {
        host.addEventListener("pointermove", onPointer, { passive: true });
        host.addEventListener("pointerleave", onPointerLeave);
      }
      start();
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onPointer);
      host.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
