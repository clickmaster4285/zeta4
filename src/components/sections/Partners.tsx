import Image from "next/image";
import { PARTNERS } from "@/lib/content";
import styles from "./Home.module.css";

export default function Partners() {
  return (
    <section className={`wide ${styles.partners}`} aria-labelledby="partners-title">
      <h2 id="partners-title" className={`display display-lg ${styles.partnersTitle}`}>
        {PARTNERS.line1}
        <br />
        <span className="accent">{PARTNERS.line2}</span>
      </h2>
      <ul className={styles.logoRow}>
        {PARTNERS.logos.map((l) => (
          <li key={l.src} className={l.height > 60 ? styles.logoTall : undefined}>
            <Image src={l.src} alt={l.alt} width={l.width} height={l.height} />
          </li>
        ))}
      </ul>
    </section>
  );
}
