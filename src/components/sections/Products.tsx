import Image from "next/image";
import Tilt from "@/components/Tilt";
import { PRODUCTS } from "@/lib/content";
import styles from "./Home.module.css";

export default function Products() {
  return (
    <section id="products" className={`light ${styles.products}`} aria-labelledby="products-title">
      <div className={styles.productsGlow} aria-hidden="true" />
      <div className="container">
        <div className={styles.sectionHead}>
          <p className="overline overline--light">{PRODUCTS.overline}</p>
          <h2 id="products-title" className={`display display-xl ${styles.productsTitle}`}>
            {PRODUCTS.headingBefore}
            <span className="accent">{PRODUCTS.headingAccent}</span>
            {PRODUCTS.headingAfter}
          </h2>
        </div>

        <div className={styles.productList}>
          {PRODUCTS.items.map((p) => (
            <article key={p.id} id={p.id} className={styles.product}>
              <div className={styles.productText}>
                <div>
                  <p className={`label ${styles.productKicker}`}>{p.kicker}</p>
                  <h3 className={`h3 ${styles.productName}`}>{p.name}</h3>
                  <p className={styles.productDesc}>{p.description}</p>
                </div>
                <a href={p.href} className="btn btn--dark" target="_blank" rel="noopener">
                  Explore {p.name} <span className="btn__arrow">↗</span>
                </a>
              </div>
              <Tilt className={styles.productMedia} mirror={p.image.mirror} max={5} scale={1.025} glare>
                <Image src={p.image.src} alt={p.image.alt} fill sizes="(max-width: 900px) 100vw, 747px" />
                <span className={styles.productShade} aria-hidden="true" />
                {p.dark && (
                  <svg className={styles.topology} viewBox="0 0 746.672 466.664" fill="none" preserveAspectRatio="none" aria-hidden="true">
                    <path
                      d="M0.00481084 242.665H74.671L112.004 83.9995L166.137 382.664L227.737 177.332L289.336 298.665L354.669 139.999L420.002 270.665L485.335 195.999H550.668L606.668 65.333L662.668 363.998L709.334 242.665H746.667"
                      stroke="#F6F6F3"
                      strokeWidth="0.93"
                    />
                  </svg>
                )}
              </Tilt>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
