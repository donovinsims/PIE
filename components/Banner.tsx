import { SITE } from "@/lib/site";
import type { MenuCat } from "@/lib/menus";

export function Banner({
  title,
  tagline = SITE.tagline,
  bg,
  tall = false,
  children,
}: {
  title: string;
  tagline?: string;
  bg?: string;
  tall?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className={`banner${tall ? " banner-contact" : ""}`} style={bg ? { backgroundImage: `url(${bg})` } : undefined}>
      <div className="banner-inner">
        <h1>{title}</h1>
        <h3>{tagline}</h3>
        <div className="banner-actions">
          <a className="pill-btn lg" href={SITE.phoneHref}>
            {SITE.phone}
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
        <div className="menu-cat" key={ci}>
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