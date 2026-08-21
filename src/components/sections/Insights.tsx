import { INSIGHTS } from "@/lib/content";
import styles from "./Home.module.css";

export default function Insights() {
  return (
    <section id="insights" className={styles.insights} aria-labelledby="insights-title">
      <div className="container">
        <div className={styles.insightsHead}>
          <div>
            <p className="overline overline--muted">{INSIGHTS.overline}</p>
            <h2 id="insights-title" className={`display display-xl ${styles.insightsTitle}`}>
              {INSIGHTS.headingBefore}
              <span className="accent">{INSIGHTS.headingAccent}</span>
              {INSIGHTS.headingAfter}
            </h2>
          </div>
          <p className={`lede ${styles.insightsLede}`}>{INSIGHTS.lede}</p>
        </div>

        <ul className={styles.insightList}>
          {INSIGHTS.items.map((i) => (
            <li key={i.title} className={styles.insight}>
              <span className="label">{i.category}</span>
              <h3 className={styles.insightTitle}>{i.title}</h3>
              <span className={`label ${styles.insightTag}`}>{i.tag}</span>
              <span className={styles.insightArrow} aria-hidden="true">
                ↗
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
