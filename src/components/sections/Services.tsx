import Image from "next/image";
import Tilt from "@/components/Tilt";
import { SERVICES } from "@/lib/content";
import styles from "./Home.module.css";

export default function Services() {
  return (
    <section id="services" className={styles.services} aria-labelledby="services-title">
      <div className="container">
        <div className={styles.sectionHead}>
          <p className="overline overline--muted">{SERVICES.overline}</p>
          <h2 id="services-title" className="display display-xl">
            {SERVICES.headingBefore}
            <span className="accent">{SERVICES.headingAccent}</span>
            {SERVICES.headingAfter}
          </h2>
        </div>

        <div className={styles.bento}>
          {SERVICES.items.map((s) => (
            <article key={s.id} id={s.id} className={styles.card} data-area={s.area}>
              <p className={styles.cap}>{s.cap}</p>
              <span className={styles.cardArrow} aria-hidden="true">
                →
              </span>

              {s.image && (
                <Tilt className={styles.cardMedia} mirror={s.image.mirror} style={{ opacity: s.image.opacity ?? 1 }} listen="parent" max={7} shift={10}>
                  {s.area === "connectivity" && (
                    <svg className={styles.route} viewBox="0 0 526.5 112" fill="none" aria-hidden="true">
                      <path
                        d="M100.85 87.36C151.25 87.36 156.85 24.64 212.85 24.64C268.85 24.64 263.25 85.12 321.49 85.12C379.73 85.12 369.65 38.08 425.65 38.08"
                        stroke="#8C96A3"
                        strokeWidth="1.12"
                      />
                      <circle cx="212.85" cy="24.64" r="5.6" stroke="#8C96A3" strokeWidth="1.12" />
                      <circle cx="321.49" cy="85.12" r="5.6" stroke="#8C96A3" strokeWidth="1.12" />
                    </svg>
                  )}
                  <Image src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} sizes={`${s.image.width}px`} />
                </Tilt>
              )}

              <div className={styles.cardText}>
                <h3 className="h3">{s.title}</h3>
                <p className={styles.cardDesc}>{s.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
