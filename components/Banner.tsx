import { SITE } from "@/lib/site";
import type { MenuCat } from "@/lib/menus";
import type { CSSProperties } from "react";

export function Banner({
  title,
  tagline,
  bg,
  mobileBg,
  tall = false,
  children,
}: {
  title: string;
  tagline?: string;
  bg?: string;
  mobileBg?: string;
  tall?: boolean;
  children?: React.ReactNode;
}) {
  const backgroundStyle = bg
    ? ({ backgroundImage: `url(${bg})`, "--mobile-background-image": `url(${mobileBg ?? bg})` } as CSSProperties)
    : undefined;

  return (
    <section className={`banner${tall ? " banner-contact" : ""}`} style={backgroundStyle}>
      <div className="banner-inner">
        <h1>{title}</h1>
        {tagline && <p className="banner-tagline">{tagline}</p>}
        {children}
      </div>
    </section>
  );
}

export function Intro({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="intro">
      <h2>{title}</h2>
      <p>{children}</p>
    </div>
  );
}


export function MenuSection({
  title = "Menu",
  cats = [],
  note,
}: {
  title?: string;
  cats?: MenuCat[];
  note?: string;
}) {
  if (!cats?.length) {
    return (
      <div className="menu-section">
        <h2>{title}</h2>
        <p className="menu-unavailable">
          Our online menu is unavailable right now. <a href={SITE.phoneHref}>Call {SITE.phone}</a> to order.
        </p>
      </div>
    );
  }

  return (
    <div className="menu-section">
      <h2>{title}</h2>
      {cats.map((cat, ci) => (
        <div className="menu-cat" id={cat.id} key={ci} tabIndex={-1}>
          {cat.title && <h3 className="menu-cat-title">{cat.title}</h3>}
          {cat.rows.map((row, ri) => (
            <div className="menu-row-block" key={ri}>
              {(row.name || row.price) && (
                <div className="menu-item">
                  <span>{row.name}</span>
                  {row.price && <span className="price">{row.price}</span>}
                </div>
              )}
              {row.subs?.map((s, si) => (
                <div className="menu-sub" key={si}>
                  {s.name && <span>{s.name}</span>}
                  {s.price && <span className="price-sub">{s.price}</span>}
                </div>
              ))}
              {row.desc?.map((d, di) => (
                <div className="menu-desc" key={di}>
                  {d}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      {note && <div className="menu-footnote">{note}</div>}
      <div className="menu-end">
        <a className="pill-btn ghost" href="#main-content">Back to top</a>
      </div>
    </div>
  );
}

export function OrderCta() {
  return (
    <section className="order-cta">
      <h2>Ready to Order?</h2>
      <p>
        Place your order online for carry out or delivery, or call us at{" "}
        <a href={SITE.phoneHref}>{SITE.phone}</a>.
      </p>
      <a
        className="pill-btn lg"
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
    </section>
  );
}
