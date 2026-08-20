import Link from "next/link";
import { SITE } from "@/lib/site";
import { asset } from "@/lib/assets";

const HERO_IMG = asset("le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/pietrospizzeria-gallery-image-16-1920px-1920w.jpg");
const TESTI_BG = asset("le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/g1-1920w.jpg");


export const metadata = { title: "Pietro's Pizzeria" };

export default function HomePage() {
  return (
    <div className="page-home">
      <>
      {/* Hero */}
      <section className="hero" style={{ backgroundImage: `url(${HERO_IMG})` }} />
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

      {/* Captured source shows this region empty (lazy gallery never painted in capture) */}
      <section className="home-gap" aria-hidden="true" />

      {/* Testimonial band */}
      <section className="testimonial-band" style={{ backgroundImage: `url(${TESTI_BG})` }}>
        <h2>Here's what our satisfied customers are saying...</h2>

      </section>
    </>
    </div>
    
  );
}