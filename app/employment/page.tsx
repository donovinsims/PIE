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
          for you. Fill out our form below and attach your latest resume, and we will get in touch with you soon. Call
          us for more details.
        </p>
      </section>

      <section className="employment-form-section">
        <form
          className="widget-form employment-form"
          action="#"
        >
          <h2 className="employment-form-title">
            Apply for a Job With Us
          </h2>
          <div className="form-row">
            <label htmlFor="j-name">Name:</label>
            <input id="j-name" name="name" required autoComplete="name" />
          </div>
          <div className="form-row">
            <label htmlFor="j-email">Email:</label>
            <input id="j-email" name="email" type="email" required autoComplete="email" />
          </div>
          <div className="form-row">
            <label htmlFor="j-phone">Phone:</label>
            <input id="j-phone" name="phone" type="tel" required autoComplete="tel" />
          </div>
          <div className="form-row">
            <label htmlFor="j-message">Message:</label>
            <textarea id="j-message" name="message" required />
          </div>
          <div className="form-row">
            <label htmlFor="j-resume">Attach Resume:</label>
            <input id="j-resume" name="resume" type="file" accept=".pdf,.doc,.docx,.txt" />
          </div>
          <button className="pill-btn" type="submit">
            Submit Application
          </button>
          <p className="employment-form-alt">
            Or call us at <a href={SITE.phoneHref}>{SITE.phone}</a>
          </p>
        </form>
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
