import Link from "next/link";
import { SITE } from "@/lib/site";
import { asset } from "@/lib/assets";

const HERO_IMG = asset("le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/IMG_7604-1920w.jpg");
const TESTI_BG = asset("le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/g11-1920w.jpg");
const CTA_BG = asset("le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/IMG_1907-1920w.jpg");

const STACK = [
  "462555236_1534003907229545_522452832192335924_n-558w.jpg",
  "462638863_1820287058503695_513161489995355554_n-558w.jpg",
  "462555684_1059535438909765_3194058447595834118_n-558w.jpg",
  "462559326_384914098027152_4512526269900734695_n-558w.jpg",
].map((f) => asset(`le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/${f}`));

export const metadata = { title: "Pietro's Pizzeria" };

export default function HomePage() {
  return (
    <div className="page-home">
      <>
      {/* Hero */}
      <section className="hero" style={{ backgroundImage: `url(${HERO_IMG})` }}>
        <div className="hero-content">
          <h1>Roscoe's Favorite Pizzeria</h1>
          <p className="hero-upsell">NEW DINING AREA NOW OPEN!</p>
          <p className="hero-upsell">Full Service Bar-GAMING-Sunday Ticket!</p>
          <h3>{SITE.tagline}</h3>
          <div className="hero-actions">
            <a className="pill-btn lg" href={SITE.phoneHref}>
              {SITE.phone}
            </a>
            <a className="pill-btn lg" href={SITE.directions}>
              Visit Us at 5724 Elevator RD, Roscoe, IL
            </a>
          </div>
          <div className="hero-hours">{SITE.hoursLine}</div>
        </div>
      </section>

      {/* Intro */}
      <section>
        <h3 className="about-h3">Serving Delicious Homemade Food Using Fresh Ingredients</h3>
        <p className="about-p">
          Pietro's Pizzeria is a family-owned and locally operated restaurant known for its homemade pizzas,
          sandwiches, and desserts, all made with fresh ingredients.{" "}
          <Link href="/menu#pizza">Visit us</Link> for carry out or delivery. You won't be disappointed.
        </p>
      </section>

      {/* STOP AND SMELL THE ROSES */}
      <section className="stop-band">
        <h2>STOP AND SMELL THE ROSES EVERY DAY!</h2>
        <p>Take a look at our spacious new dining area and some of our quality food options.</p>
      </section>

      {/* Full-width stacked photos */}
      <section className="home-stack">
        {STACK.map((src, i) => (
          <img key={i} src={src} alt="" loading="lazy" />
        ))}
      </section>

      {/* Testimonial band */}
      <section className="testimonial-band" style={{ backgroundImage: `url(${TESTI_BG})` }}>
        <h2>Here's what our satisfied customers are saying...</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p className="q">
              <strong>4.0</strong> ★★★★☆
              <br />
              Great Food!
              <br />
              <em>- JT</em>
            </p>
          </div>
          <div className="testimonial-card">
            <p className="q">
              <strong>4.3</strong> ★★★★★
              <br />
              Excellent Food &amp; Service
              <br />
              <em>- John</em>
            </p>
          </div>
        </div>
        <div className="testimonial-video">
          <a href="/gallery" style={{ color: "#fff" }}>
            ▶ WATCH OUR VIDEO HERE
          </a>
        </div>
      </section>

      {/* CTA band */}
      <section className="cta-band" style={{ backgroundImage: `url(${CTA_BG})` }}>
        <h2>
          <Link href="/about">Learn More About Pietro's Pizzeria</Link>
        </h2>
      </section>
    </>
    </div>
    
  );
}