"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { CTA_HREF, CTA_LABEL, NAV, PRODUCTS_MENU, SERVICES_MENU } from "@/lib/content";
import styles from "./Header.module.css";

type MenuKey = "services" | "products" | null;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const menuId = useId();

  /* Solid bar once the hero starts scrolling away */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Escape closes whatever is open; clicking outside closes the mega menu */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, []);

  /* Lock page scroll behind the mobile drawer */
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const cancelClose = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 160);
  };
  const closeAll = useCallback(() => {
    cancelClose();
    setOpenMenu(null);
    setMobileOpen(false);
  }, []);

  return (
    <header
      ref={headerRef}
      className={styles.header}
      data-scrolled={scrolled || openMenu !== null || mobileOpen ? "true" : undefined}
      onMouseLeave={scheduleClose}
    >
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.logo} aria-label="Zeta Technologies — home" onClick={closeAll}>
          <Image src="/images/zeta-mark.png" alt="" width={35} height={35} priority />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList}>
            {NAV.map((item) => {
              const hasMenu = Boolean(item.menu);
              const isOpen = hasMenu && openMenu === item.menu;
              return (
                <li
                  key={item.label}
                  className={styles.navItem}
                  onMouseEnter={() => {
                    cancelClose();
                    if (hasMenu) setOpenMenu(item.menu!);
                  }}
                >
                  {hasMenu ? (
                    <button
                      type="button"
                      className={styles.navLink}
                      aria-expanded={isOpen}
                      aria-controls={`${menuId}-${item.menu}`}
                      onClick={() => setOpenMenu(isOpen ? null : item.menu!)}
                    >
                      <span className={styles.roll}>
                        <span>{item.label}</span>
                        <span aria-hidden="true">{item.label}</span>
                      </span>
                    </button>
                  ) : (
                    <Link href={item.href} className={styles.navLink} onClick={closeAll}>
                      <span className={styles.roll}>
                        <span>{item.label}</span>
                        <span aria-hidden="true">{item.label}</span>
                      </span>
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href={CTA_HREF} className={`btn btn--primary ${styles.cta}`} onClick={closeAll}>
            {CTA_LABEL}
          </Link>
          <button
            type="button"
            className={styles.burger}
            aria-expanded={mobileOpen}
            aria-controls={`${menuId}-mobile`}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* ---------- Mega menus (desktop) ---------- */}
      <div
        id={`${menuId}-services`}
        className={styles.mega}
        data-open={openMenu === "services" ? "true" : undefined}
        onMouseEnter={cancelClose}
        aria-hidden={openMenu !== "services"}
      >
        <div className={styles.megaInner}>
          <div className={styles.megaGlow} aria-hidden="true" />
          <div className={styles.megaIntro}>
            <h2 className={styles.megaTitle}>{SERVICES_MENU.title}</h2>
            <p className={styles.megaDesc}>{SERVICES_MENU.description}</p>
            <div className={styles.megaImage}>
              <Image src={SERVICES_MENU.image} alt="" fill sizes="388px" />
            </div>
          </div>
          <div className={styles.megaDivider} aria-hidden="true" />
          <div className={styles.megaColumn}>
            <p className={styles.megaColumnTitle}>{SERVICES_MENU.columnTitle}</p>
            <ul className={styles.megaGrid}>
              {SERVICES_MENU.items.map((s) => (
                <li key={s.title}>
                  <Link href={s.href} className={styles.megaItem} onClick={closeAll} tabIndex={openMenu === "services" ? 0 : -1}>
                    <span className={styles.megaItemTitle}>{s.title}</span>
                    <span className={styles.megaItemDesc}>{s.description}</span>
                    <span className={styles.megaExplore}>Explore →</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.megaDivider} aria-hidden="true" />
          <div className={styles.megaFeature}>
            <Link href={SERVICES_MENU.featured.href} className={styles.megaItem} onClick={closeAll} tabIndex={openMenu === "services" ? 0 : -1}>
              <span className={styles.megaItemTitle}>{SERVICES_MENU.featured.title}</span>
              <span className={styles.megaItemDesc}>{SERVICES_MENU.featured.description}</span>
              <span className={styles.megaExplore}>Explore →</span>
            </Link>
            <ul className={styles.megaSublinks}>
              {SERVICES_MENU.featured.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} onClick={closeAll} tabIndex={openMenu === "services" ? 0 : -1}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div
        id={`${menuId}-products`}
        className={styles.mega}
        data-open={openMenu === "products" ? "true" : undefined}
        onMouseEnter={cancelClose}
        aria-hidden={openMenu !== "products"}
      >
        <div className={styles.megaInner}>
          <div className={styles.megaGlow} aria-hidden="true" />
          <div className={styles.megaIntro}>
            <h2 className={styles.megaTitle}>{PRODUCTS_MENU.title}</h2>
            <p className={styles.megaDesc}>{PRODUCTS_MENU.description}</p>
            <div className={styles.megaImage}>
              <Image src={PRODUCTS_MENU.image} alt="" fill sizes="388px" />
            </div>
          </div>
          <div className={styles.megaDivider} aria-hidden="true" />
          <div className={styles.megaColumn}>
            <p className={styles.megaColumnTitle}>{PRODUCTS_MENU.columnTitle}</p>
            <ul className={styles.productRows}>
              {PRODUCTS_MENU.items.map((p) => (
                <li key={p.title}>
                  <Link href={p.href} className={styles.productRow} onClick={closeAll} tabIndex={openMenu === "products" ? 0 : -1}>
                    <span>{p.title}</span>
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className={styles.productArrow}>
                      <path
                        d="M14 23.3333V4.80783C13.5362 4.80793 13.0914 4.99215 12.7633 5.32L6.125 11.9583M21.875 11.9583L15.2367 5.32C14.9084 4.99257 14.4636 4.80879 14 4.809"
                        stroke="currentColor"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.megaDivider} aria-hidden="true" />
          <div className={styles.megaFeature}>
            <div className={`${styles.megaImage} ${styles.megaImageWide} ${styles.mirror}`}>
              <Image src={PRODUCTS_MENU.featured.image} alt="" fill sizes="444px" />
            </div>
            <p className={styles.megaFeatureDesc}>{PRODUCTS_MENU.featured.description}</p>
            <a
              href={PRODUCTS_MENU.featured.href}
              className={styles.megaExplore}
              target="_blank"
              rel="noopener"
              onClick={closeAll}
              tabIndex={openMenu === "products" ? 0 : -1}
            >
              {PRODUCTS_MENU.featured.linkLabel} →
            </a>
          </div>
        </div>
      </div>

      {/* ---------- Mobile drawer ---------- */}
      <div id={`${menuId}-mobile`} className={styles.drawer} data-open={mobileOpen ? "true" : undefined} aria-hidden={!mobileOpen}>
        <nav aria-label="Mobile" className={styles.drawerInner}>
          <ul className={styles.drawerList}>
            {NAV.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className={styles.drawerLink} onClick={closeAll} tabIndex={mobileOpen ? 0 : -1}>
                  {item.label}
                </Link>
                {item.menu === "services" && (
                  <ul className={styles.drawerSub}>
                    {[...SERVICES_MENU.items, SERVICES_MENU.featured].map((s) => (
                      <li key={s.title}>
                        <Link href={s.href} onClick={closeAll} tabIndex={mobileOpen ? 0 : -1}>
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
                {item.menu === "products" && (
                  <ul className={styles.drawerSub}>
                    {PRODUCTS_MENU.items.map((p) => (
                      <li key={p.title}>
                        <Link href={p.href} onClick={closeAll} tabIndex={mobileOpen ? 0 : -1}>
                          {p.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Link href={CTA_HREF} className="btn btn--primary" onClick={closeAll} tabIndex={mobileOpen ? 0 : -1}>
            {CTA_LABEL}
          </Link>
        </nav>
      </div>
    </header>
  );
}
