import Link from "next/link";
import { CLOSING } from "@/lib/content";
import styles from "./Home.module.css";

export default function ClosingCta() {
  return (
    <section id="contact-cta" className={styles.closing} aria-labelledby="closing-title">
      <div className={styles.rings} aria-hidden="true">
        <span className={styles.ringOuter} />
        <span className={styles.ringMid} />
        <span className={styles.ringInner} />
        <span className={styles.ringRed} />
      </div>
      <div className={styles.closingContent}>
        <p className={styles.closingOverline}>{CLOSING.overline}</p>
        <h2 id="closing-title" className={styles.closingTitle}>
          {CLOSING.heading}
        </h2>
        <p className={`lede ${styles.closingLede}`}>{CLOSING.lede}</p>
        <Link href={CLOSING.cta.href} className="btn btn--primary">
          {CLOSING.cta.label}
        </Link>
      </div>
    </section>
  );
}
