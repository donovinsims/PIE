import Link from "next/link";
import type { CSSProperties } from "react";
import { SITE } from "@/lib/site";
import { asset } from "@/lib/assets";
import { REVIEWS } from "@/lib/reviews";
import { OrderCta } from "@/components/Banner";

const HERO_IMG = asset("le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/IMG_7606-1920w.jpg");
const HERO_IMG_MOBILE = asset("le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/IMG_7606-640w.jpg");
const TESTI_BG = asset("le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/g1-1920w.jpg");
const HOME_GALLERY = [
  {
    src: asset("le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/IMG_7604-640w.jpg"),
    alt: "Pizza with pepperoni, olives, green peppers, mushrooms, and meat toppings",
  },
  {
    src: asset("le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/IMG_7605-640w.jpg"),
    alt: "Pizza with sausage and melted cheese on a cardboard box",
  },
  {
    src: asset("le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/g6-640w.jpg"),
    alt: "Two pizzas in delivery boxes — pepperoni and black olive",
  },
];


export const metadata = {
  title: "Pietro's Pizzeria",
  description: "Pietro's Pizzeria in Roscoe, IL — homemade pizza, sandwiches, and desserts. Order online for delivery, carry out, or dine-in at 5724 Elevator RD.",
};

export default function HomePage() {
  return (
    <div className="page-home">
      {/* Hero */}
      <section className="hero-wrap" aria-label="Pietro's Pizzeria hero banner">
        <div
          className="hero"
          style={{ backgroundImage: `url(${HERO_IMG})`, "--mobile-hero-image": `url(${HERO_IMG_MOBILE})` } as CSSProperties}
        />
        <div className="hero-content">
          <h1>Roscoe's Favorite Pizzeria</h1>
          <p className="hero-upsell">New dining area now open — full bar, gaming & Sunday Ticket</p>
          <p className="hero-tagline">{SITE.tagline}</p>
          <div className="hero-actions">
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
            <a className="pill-btn lg ghost" href={SITE.directions}>
              Get Directions
            </a>
          </div>
          <p className="hero-hours">{SITE.hoursLine}</p>
        </div>
      </section>

      {/* Intro */}
      <section>
        <h2 className="about-h3">Serving Delicious Homemade Food Using Fresh Ingredients</h2>
        <p className="about-p">
          Pietro's Pizzeria is a family-owned and locally operated restaurant known for its homemade pizzas,
          sandwiches, and desserts, all made with fresh ingredients.{" "}
          <Link href="/menu">View our pizza menu</Link> for carry out or delivery.
        </p>
      </section>

      {/* STOP AND SMELL THE ROSES */}
      <section className="stop-band">
        <h2>Stop and smell the roses every day!</h2>
        <p>Take a look at our spacious new dining area and some of our quality food options.</p>
      </section>

      <section className="home-gallery-preview" aria-labelledby="home-gallery-title">
        <h2 id="home-gallery-title">A Taste of Pietro&apos;s</h2>
        <div className="home-gallery-grid">
          {HOME_GALLERY.map(({ src, alt }, idx) => {
            const dims = idx === 2 ? { width: 600, height: 490 } : { width: 640, height: 480 };
            return <img key={src} src={src} alt={alt} loading="lazy" width={dims.width} height={dims.height} />;
          })}
        </div>
        <Link className="pill-btn" href="/gallery">View Full Gallery</Link>
      </section>

      <OrderCta />

      {/* Testimonial band */}
      <section className="testimonial-band" style={{ backgroundImage: `url(${TESTI_BG})` }}>
        <h2>What Our Customers Say</h2>
        <div className="testimonial-cards">
          {REVIEWS.slice(0, 2).map((review) => <article className="testimonial-card" key={review.name}><p className="q">“{review.text}”</p><strong>{review.name}</strong></article>)}
        </div>
        <Link className="testimonial-more" href="/reviews">Read all reviews</Link>
      </section>
    </div>
    
  );
}
