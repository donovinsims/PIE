import { Banner } from "@/components/Banner";
import { asset } from "@/lib/assets";
import { SITE } from "@/lib/site";

export const metadata = {
  title: "Pietro's Pizzeria Jobs | Roscoe, IL",
  description: "Join the Pietro's Pizzeria team in Roscoe, IL. We're hiring for pizza makers, servers, and more. Apply today for carry out, delivery, and dine-in positions.",
};

const p = (f: string) => asset(`le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/${f}`);

export default function EmploymentPage() {
  return (
    <div className="page-employment">
      <>
      <Banner title="Pietro's Pizzeria Jobs" bg={p("g1-2880w.jpg")} mobileBg={p("g1-640w.jpg")} />
      <section className="intro">
        <h2>Looking for a New Job?</h2>
        <p>
          If you're looking for a new career, reach out to Pietro's Pizzeria. We might have the right job opportunity
          for you. Call us for more details, or send your latest resume and we will get in touch with you soon.
        </p>
      </section>

      <section className="employment-form-section">
        <div className="widget-form employment-form">
          <h2 className="employment-form-title">
            Apply for a Job With Us
          </h2>
          <ol className="employment-steps">
            <li>Call us to ask about current openings.</li>
            <li>Email your latest resume.</li>
            <li>We will get in touch with you soon.</li>
          </ol>
          <div className="contact-actions">
            <a className="pill-btn" href={SITE.phoneHref}>Call {SITE.phone}</a>
            <a className="pill-btn" href={`mailto:${SITE.email}?subject=Job Application`}>Email Your Resume</a>
          </div>
        </div>
      </section>

      <section className="cta-band" style={{ backgroundImage: `url(${asset("le-cdn.hibuwebsites.com/md/dmip/dms3rep/multi/opt/green-vegetables-pepper-avocado-asparagus-2880w.jpg")})` }}>
        <h2>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
        </h2>
      </section>
    </>
    </div>
    
  );
}
