import { Banner } from "@/components/Banner";
import { SITE } from "@/lib/site";

export const metadata = { title: "Contact Pietro's Pizzeria | Roscoe, IL" };

export default function ContactPage() {
  return (
    <div className="page-contact">
      <>
      <Banner title="Contact Pietro's Pizzeria" tall>
        <div className="contact-hero-details">
          <p>
            {"5724 Elevator RD, Roscoe, IL 61073"} — <a href={SITE.directions}>Get Directions</a>
          </p>
          <p>
            Main: <a href={SITE.phoneHref}>{SITE.phone}</a>
          </p>
          <p>{SITE.hoursShort}</p>
        </div>
      </Banner>

      <section className="contact-map-section">
        <div className="map-box">
          <a href={SITE.directions} aria-label="Open directions in Google Maps">
            <span className="pin">
              <i />
            </span>
            <span>Visit Us — 5724 Elevator RD, Roscoe, IL</span>
          </a>
        </div>
      </section>

      <section className="intro">
        <h3>Get In Touch With Us</h3>
        <p>
          Send us a message. Please fill out the short form and we&apos;ll contact you shortly.
          <br />
          <em>Fields marked * are required.</em>
        </p>
      </section>

      <section className="contact-form-section">
        <form className="widget-form" action="#">
          <div className="form-row">
            <label htmlFor="name">Name *</label>
            <input id="name" name="name" required />
          </div>
          <div className="form-row">
            <label htmlFor="email">Email *</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="form-row">
            <label htmlFor="phone">Phone *</label>
            <input id="phone" name="phone" type="tel" required />
          </div>
          <div className="form-row">
            <label htmlFor="message">Message *</label>
            <textarea id="message" name="message" required />
          </div>
          <p style={{ fontSize: 13, color: "#888" }}>This site is protected by reCAPTCHA.</p>
          <button className="pill-btn" type="submit">
            Reach Out To Us
          </button>
        </form>
      </section>
    </>
    </div>
    
  );
}
