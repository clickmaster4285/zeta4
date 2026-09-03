import { HERO } from "@/lib/content";
import HeroTitleTypewriter from "@/components/HeroTitleTypewriter";
import styles from "./Home.module.css";

export default function Hero() {
  return (
    <section className={styles.hero} aria-label={HERO.typingText}>
      <video
        className={styles.heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/videos/robotic-earth.mp4" type="video/mp4" />
      </video>
      <div className={styles.heroOverlay} aria-hidden="true" />
      <div className={`wide ${styles.heroContent}`}>
        <HeroTitleTypewriter />

        <div className={styles.heroBar}>
          <p className={styles.scrollCue}>
            <span className={styles.scrollLine} aria-hidden="true" />
            <span className="label">{HERO.scrollCue}</span>
          </p>
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
