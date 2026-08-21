import NetworkCanvas from "@/components/NetworkCanvas";
import { HERO } from "@/lib/content";
import styles from "./Home.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <NetworkCanvas className={styles.heroCanvas} />
      <div className={styles.heroTint} aria-hidden="true" />
      <div className={styles.heroVeil} aria-hidden="true" />

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
    </section>
  );
}
