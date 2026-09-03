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
    <span className={cls} aria-label="4.3 out of 5 stars">
      <span className="stars-filled" aria-hidden="true">★★★★</span>
      <span className="stars-partial" aria-hidden="true" style={{ "--pct": "30%" } as React.CSSProperties}>★</span>
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const firstNavLinkRef = useRef<HTMLAnchorElement>(null);
  const menuActive = MENU_CHILD_PATHS.includes(pathname);
  const closeMobileNavigation = () => {
    setMobileMenuOpen(false);
    setMenuExpanded(false);
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
  useEffect(() => {
    if (mobileMenuOpen) requestAnimationFrame(() => firstNavLinkRef.current?.focus());
  }, [mobileMenuOpen]);

  return (
    <header className="site-header">
      <div className="topbar">
        <div className="topbar-left">
          <Link href="/reviews" className="rating-pill">
            <span className="rating-num">4.3</span>
            <Stars />
            <span>{SITE.ratingTotal}</span>
          </Link>
        </div>
        <div className="topbar-center">
          <Link href="/" className="topbar-logo" aria-label="Pietro's Pizzeria home">
            <img src={LOGO} alt="Pietro's Pizzeria logo: red cursive text slice of pizza" />
          </Link>
        </div>
        <div className="topbar-right">
          <span className="topbar-phone">
            <a href={SITE.phoneHref}>{SITE.phone}</a>
          </span>
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
              </a>
            </li>
          )}
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href === "/menu" && menuActive);
            const hasChildren = !!item.children;
            const dropsOpen = hasChildren && menuExpanded;
            return (
              <li className="nav-item" key={item.label}>
                <Link
                  href={item.href}
                  className={`nav-link${isActive ? " active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={closeMobileNavigation}
                  ref={item.label === "Home" ? firstNavLinkRef : undefined}
                >
                  {item.label}
                  {hasChildren && <span className="nav-caret" aria-hidden="true">▾</span>}
                </Link>
                {hasChildren && (
                  <>
                    <button
                      className="nav-submenu-toggle"
                      type="button"
                      aria-label={`${menuExpanded ? "Collapse" : "Expand"} ${item.label} submenu`}
                      aria-controls="menu-submenu"
                      aria-expanded={menuExpanded}
                      onClick={() => setMenuExpanded((open) => !open)}
                    >
                      <span aria-hidden="true">▾</span>
                    </button>
                    <div className={`nav-drop${dropsOpen ? " desktop-open" : ""}${menuExpanded ? " open" : ""}`} id="menu-submenu">
                      {item.children!.map((c) => (
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
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
