import Script from 'next/script';
import { Banner } from "@/components/Banner";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Contact Pietro's Pizzeria | Roscoe, IL",
  description: "Contact Pietro's Pizzeria in Roscoe, IL. Call (815) 623-2112 for delivery, carry out, or dine-in. Visit us at 5724 Elevator RD, Roscoe, IL 61073.",
};

export default function ContactPage() {
  return (
    <div className="page-contact">
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
        <h2>Get In Touch With Us</h2>
        <p>
          Send us a message. We&apos;ll contact you shortly.
        </p>
      </section>

      <section className="contact-form-section">
        <iframe
          data-tally-src="https://tally.so/embed/eqXgox?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="500"
          frameBorder={0}
          marginHeight={0}
          marginWidth={0}
          title="Contact Pietro's Pizzeria"
        />
        <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" />
      </section>
    </div>
  );
}
