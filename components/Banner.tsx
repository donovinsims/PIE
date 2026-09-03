import { SITE } from "@/lib/site";
import type { MenuCat } from "@/lib/menus";
import type { CSSProperties } from "react";

export function Banner({
  title,
  tagline = SITE.tagline,
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
        <h3>{tagline}</h3>
        <div className="banner-actions">
          <a className="pill-btn lg" href={SITE.orderUrl}>
            Order Now
          </a>
          <a className="pill-btn lg" href={SITE.directions}>
            Visit Us at 5724 Elevator RD, Roscoe, IL
          </a>
        </div>
        <div className="banner-hours">{SITE.hoursLine}</div>
        {children}
      </div>
    </section>
  );
}

export function Intro({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="intro">
      <h3>{title}</h3>
      <p>{children}</p>
    </div>
  );
}


export function MenuSection({
  title = "Menu",
  cats,
  note,
}: {
  title?: string;
  cats?: MenuCat[];
  note?: string;
}) {
  return (
    <div className="menu-section">
      <h3>{title}</h3>
      {cats?.map((cat, ci) => (
        <div className="menu-cat" id={cat.id} key={ci}>
          {cat.title && <h4 className="menu-cat-title">{cat.title}</h4>}
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
    </div>
  );
}
