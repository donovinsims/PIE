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
          Our online message form is temporarily unavailable. Please call or email us and we&apos;ll be happy to help.
        </p>
      </section>

      <section className="contact-form-section contact-actions">
        <a className="pill-btn" href={SITE.phoneHref} aria-label={`Call ${SITE.phone}`}>Call {SITE.phone}</a>
        <a className="pill-btn" href={`mailto:${SITE.email}`}>Email us</a>
      </section>
    </>
    </div>
    
  );
}
