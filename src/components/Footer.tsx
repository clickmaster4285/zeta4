import Image from "next/image";
import Link from "next/link";
import { FOOTER } from "@/lib/content";
import { SITE } from "@/lib/site";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href="/" aria-label="Zeta Technologies — home" className={styles.logo}>
              <Image src="/images/zeta-logo-white.png" alt="Zeta Technologies (Pvt.) Ltd." width={258} height={79} />
            </Link>
            <p className={styles.tagline}>{FOOTER.tagline}</p>
          </div>

          {FOOTER.columns.map((col) => (
            <div key={col.title} className={styles.col}>
              <p className="label">{col.title}</p>
              <ul className={styles.links}>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className={styles.col}>
            <p className="label">Operations</p>
            <ul className={styles.links}>
              <li>
                <span>{SITE.address}</span>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </li>
              <li>
                <a href={SITE.phoneHref}>{SITE.phone}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className="label">© {new Date().getFullYear()} Zeta Technologies</p>
          <p className={`label ${styles.legal}`}>
            {FOOTER.legal.map((item, i) => (
              <span key={item.label}>
                {i > 0 && <span aria-hidden="true"> · </span>}
                {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
