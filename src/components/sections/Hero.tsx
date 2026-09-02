"use client";

import { useEffect, useState } from "react";
import NetworkCanvas from "@/components/NetworkCanvas";
import { HERO } from "@/lib/content";
import Image from "next/image";
import styles from "./Home.module.css";

const STATUS_TARGETS = {
  markets: 150,
  reliability: 99.9,
  experience: 15,
};

export default function Hero() {
  const [count, setCount] = useState(0.01);

  useEffect(() => {
    const startedAt = performance.now();
    const duration = 3200;
    let frame = 0;

    const animate = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(eased);

      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <NetworkCanvas className={styles.heroCanvas} />
      <div className={styles.heroTint} aria-hidden="true" />
      <div className={styles.heroVeil} aria-hidden="true" />
      <div className={styles.heroGrid}>
        <div className={`wide ${styles.heroContent}`}>
          <p className="overline">{HERO.overline}</p>
          <h1 id="hero-title" className={styles.heroTitle}>
            {HERO.lines.map((l) => (
              <span key={l.text} className={`${styles.heroLine} ${l.accent ? "accent" : ""}`}>
                {l.text}{" "}
              </span>
            ))}
          </h1>

          <div className={styles.heroBar}>
            <p className={styles.scrollCue}>
              <span className={styles.scrollLine} aria-hidden="true" />
              <span className="label">{HERO.scrollCue}</span>
            </p>
            <p className={styles.heroTagline}>{HERO.tagline}</p>
            <p className={`label ${styles.coords}`}>
              {HERO.coordinates.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </p>
          </div>
        </div>

        <div className={styles.heroGlobe}>
          <Image
            src="/images/homepage/Globe-Component.png"
            alt=""
            width={501}
            height={501}
            priority
            sizes="(max-width: 900px) 300px, 40vw"
          />
          <div className={styles.heroMarkets} aria-label="150 plus markets and 99.9 percent reliability">
            <p className={styles.heroMarketsLabel}>Connected Globally</p>
            <strong className={styles.heroMarketsValue}>
              {Math.max(1, Math.round(count * STATUS_TARGETS.markets))}+ Markets
            </strong>
            <span className={styles.heroMarketsBadge}>
              +{Math.max(0.1, count * STATUS_TARGETS.reliability).toFixed(1)}% Reliability
            </span>
          </div>
          <div className={styles.heroStatus} aria-label="15 plus years of experience">
            <p className={styles.heroStatusEstablished}>Established 2009</p>
            <strong className={styles.heroStatusValue}>{Math.max(1, Math.round(count * STATUS_TARGETS.experience))}+</strong>
            <span className={styles.heroStatusBadge}>Years of Experience</span>
          </div>
        </div>
      </div>
    </section>
  );
}
