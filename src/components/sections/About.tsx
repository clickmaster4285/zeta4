import Image from "next/image";
import Link from "next/link";
import { ABOUT } from "@/lib/content";
import styles from "./Home.module.css";

export default function About() {
  return (
    <section id="about" className={`light ${styles.about}`} aria-labelledby="about-title">
      <div className={styles.aboutImage} aria-hidden="true">
        <Image src={ABOUT.image.src} alt="" width={1600} height={933} sizes="(max-width: 900px) 100vw, 64vw" />
      </div>
      <div className={`container ${styles.aboutGrid}`}>
        <div className={styles.aboutText}>
          <p className="overline overline--light">{ABOUT.overline}</p>
          <h2 id="about-title" className={`display display-xl ${styles.aboutTitle}`}>
            {ABOUT.headingBefore}
            <span className="accent">{ABOUT.headingAccent}</span>
            {ABOUT.headingAfter}
          </h2>
          <p className={styles.aboutBody}>{ABOUT.body}</p>
          <Link href={ABOUT.cta.href} className="btn btn--primary">
            {ABOUT.cta.label} <span className="btn__arrow">↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
