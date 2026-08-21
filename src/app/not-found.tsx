import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./contact/Contact.module.css";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className={styles.page}>
        <div className={`container ${styles.wrap}`}>
          <p className="overline overline--muted">404 — Route not found</p>
          <h1 className={`display display-xl ${styles.title}`}>
            No <span className="accent">path</span> here.
          </h1>
          <p className={`lede ${styles.lede}`}>The page you asked for is not on this network. Head back to the homepage or talk to the team.</p>
          <div className={styles.actions}>
            <Link href="/" className="btn btn--ghost">
              Back to home
            </Link>
            <Link href="/contact" className="btn btn--primary">
              Talk to Zeta
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
