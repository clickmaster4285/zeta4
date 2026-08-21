import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactForm from "./ContactForm";
import { SITE } from "@/lib/site";
import styles from "./Contact.module.css";

export const metadata: Metadata = {
  title: "Talk to Zeta",
  description:
    "Connect with the Zeta Technologies infrastructure team — connectivity, cloud, CPaaS, wholesale voice, A2P messaging and careers.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className={styles.page}>
        <div className={`container ${styles.grid}`}>
          <div className={styles.intro}>
            <p className="overline overline--muted">Build with Zeta</p>
            <h1 className={`display display-xl ${styles.title}`}>
              Talk to <span className="accent">Zeta</span>.
            </h1>
            <p className={`lede ${styles.lede}`}>
              Tell us what you are building. An engineer from the relevant practice — not a sales queue — replies within two
              working days.
            </p>
            <dl className={styles.details}>
              <div>
                <dt className="label">Email</dt>
                <dd>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </dd>
              </div>
              <div>
                <dt className="label">Phone</dt>
                <dd>
                  <a href={SITE.phoneHref}>{SITE.phone}</a>
                </dd>
              </div>
              <div>
                <dt className="label">Operations</dt>
                <dd>{SITE.address}</dd>
              </div>
            </dl>
          </div>
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
