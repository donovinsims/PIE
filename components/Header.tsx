"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, MENU_CHILD_PATHS, SITE } from "@/lib/site";
import { asset } from "@/lib/assets";

const LOGO = asset("le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/Transparent_Logo-removebg-preview-b5dcba56-288w.png");

function Stars({ size = "sm" }: { size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "stars-lg" : "stars";
  return (
    <span className={cls} aria-label="4.3 out of 5 stars">
      ★★★★★
    </span>
  );
}

export default function Header() {
  const pathname = usePathname();
  const menuActive = MENU_CHILD_PATHS.includes(pathname);
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
      </div>
      <nav className="site-nav" aria-label="Main navigation">
        <ul className="nav-list">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href === "/menu" && menuActive);
            const hasChildren = !!item.children;
            const dropsOpen = hasChildren && menuActive;
            return (
              <li className="nav-item" key={item.label}>
                <Link
                  href={item.href}
                  className={`nav-link${isActive ? " active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                  {hasChildren && <span className="nav-caret">▾</span>}
                </Link>
                {hasChildren && (
                  <div className={`nav-drop${dropsOpen ? " open" : ""}`}>
                    {item.children!.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className={`nav-drop-link${pathname === c.href ? " active" : ""}`}
                        aria-current={pathname === c.href ? "page" : undefined}
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