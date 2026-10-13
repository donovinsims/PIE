"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS, MENU_CHILD_PATHS, SITE } from "@/lib/site";
import { asset } from "@/lib/assets";

const LOGO = asset("le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/Transparent_Logo-removebg-preview-b5dcba56-288w.png");

function Stars({ size = "sm" }: { size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "stars-lg" : "stars";
  return (
    <span className={cls} role="img" aria-label="4.3 out of 5 stars">
      <span className="stars-filled" aria-hidden="true">★★★★</span>
      <span className="stars-partial" aria-hidden="true" style={{ "--pct": "30%" } as React.CSSProperties}>★</span>
    </span>
  );
}

function useIsCompact() {
  const [isCompact, setIsCompact] = useState(false);
  useEffect(() => {
    // jsdom and some SSR/test environments do not implement matchMedia.
    if (typeof window.matchMedia !== "function") return;
    const query = window.matchMedia("(max-width: 899px)");
    const sync = () => setIsCompact(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return isCompact;
}

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null);
  const isCompact = useIsCompact();
  const menuActive = MENU_CHILD_PATHS.includes(pathname);
  const closeMobileNavigation = () => {
    setMobileMenuOpen(false);
    setMenuExpanded(false);
    menuToggleRef.current?.focus();
  };
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileMenuOpen(false);
      setMenuExpanded(false);
      menuToggleRef.current?.focus();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);


  return (
    <header className="site-header">
      <div className="topbar">
        <div className="topbar-left">
          <Link href="/reviews" className="rating-pill" aria-label={`4.3 out of 5 stars based on ${SITE.ratingTotal.replace(/[()]/g, "")}`}>
            <span className="rating-num">4.3</span>
            <Stars />
            <span className="rating-total">{SITE.ratingTotal}</span>
          </Link>
        </div>
        <div className="topbar-center">
          <Link href="/" className="topbar-logo" aria-label="Pietro's Pizzeria home">
            <img src={LOGO} alt="Pietro's Pizzeria logo: red cursive text slice of pizza" width={290} height={187} />
          </Link>
        </div>
        <div className="topbar-right">
          <span className="topbar-phone">
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </span>
          <a
            className="pill-btn topbar-order-btn"
            href={SITE.orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Order now (opens in a new tab)"
          >
            Order Now
            <svg className="external-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 3h6v6M10 14 21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <span className="topbar-tagline">{SITE.topbarTagline}</span>
        </div>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="main-navigation"
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
          ref={menuToggleRef}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </div>
      <nav
        className={`site-nav${mobileMenuOpen ? " mobile-open" : ""}`}
        id="main-navigation"
        aria-label="Main navigation"
      >
        <ul className="nav-list">
          {mobileMenuOpen && (
            <li className="nav-item nav-item-cta">
              <a
                className="nav-link nav-link-cta"
                href={SITE.orderUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Order now (opens in a new tab)"
              >
                Order Now
                <svg className="external-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 3h6v6M10 14 21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
          )}
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href === "/menu" && menuActive);
            const hasChildren = !!item.children;
            // One control per label: on compact screens the Menu link is a
            // disclosure button (the pizza page lives inside the submenu);
            // on desktop it stays a link and the submenu opens on hover/focus.
            const togglesMenu = hasChildren && isCompact;
            const children = togglesMenu && !item.children!.some((c) => c.href === item.href)
              ? [{ label: "Pizza", href: item.href }, ...item.children!]
              : item.children;
            return (
              <li className="nav-item" key={item.label}>
                <Link
                  href={item.href}
                  className={`nav-link${isActive ? " active" : ""}`}
                  aria-current={isActive && !togglesMenu ? "page" : undefined}
                  aria-expanded={togglesMenu ? menuExpanded : undefined}
                  aria-haspopup={togglesMenu ? "true" : undefined}
                  onClick={(event) => {
                    if (togglesMenu) {
                      event.preventDefault();
                      setMenuExpanded((open) => !open);
                      return;
                    }
                    closeMobileNavigation();
                  }}
                  ref={item.label === "Home" ? firstNavLinkRef : undefined}
                >
                  {item.label}
                  {hasChildren && <span className="nav-caret" aria-hidden="true">▾</span>}
                </Link>
                {hasChildren && (
                  <div className={`nav-drop${menuExpanded ? " open" : ""}`} id={`menu-submenu-${item.label}`}>
                    {children!.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`nav-drop-link${pathname === c.href ? " active" : ""}`}
                        aria-current={pathname === c.href ? "page" : undefined}
                        onClick={closeMobileNavigation}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
