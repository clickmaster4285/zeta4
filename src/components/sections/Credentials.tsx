import { CREDENTIALS } from "@/lib/content";
import styles from "./Home.module.css";

export default function Credentials() {
  return (
    <section id="credentials" className={styles.credentials} aria-label="Infrastructure credentials">
      <div className="container">
        <div className={styles.credHead}>
          <div>
            <p className="overline">{CREDENTIALS.overline}</p>
            <p className={styles.credLede}>{CREDENTIALS.lede}</p>
          </div>
          <p className={styles.credTag}>
            <span aria-hidden="true" />
            <span className="label">{CREDENTIALS.tag}</span>
          </p>
        </div>

        <dl className={styles.stats}>
          {CREDENTIALS.stats.map((s) => (
            <div key={s.index} className={styles.stat}>
              <dt className="label">{s.index}</dt>
              <dd className={styles.statValue}>
                {s.prefix && <span className={styles.statPrefix}>{s.prefix} </span>}
                {s.value}
              </dd>
              <dd className={`label ${styles.statCaption}`}>{s.caption}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
