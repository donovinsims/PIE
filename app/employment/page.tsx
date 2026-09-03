import { Banner } from "@/components/Banner";
import { asset } from "@/lib/assets";
import { SITE } from "@/lib/site";

export const metadata = { title: "Pietro's Pizzeria Jobs | Roscoe, IL" };

const p = (f: string) => asset(`le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/${f}`);

export default function EmploymentPage() {
  return (
    <div className="page-employment">
      <>
      <Banner title="Pietro's Pizzeria Jobs" bg={p("g1-2880w.jpg")} mobileBg={p("g1-640w.jpg")} />
      <section className="intro">
        <h3>Looking for a New Job?</h3>
        <p>
          If you're looking for a new career, reach out to Pietro's Pizzeria. We might have the right job opportunity
          for you. Fill out our form below and attach your latest resume, and we will get in touch with you soon. Call
          us for more details.
        </p>
      </section>

      <section className="employment-form-section">
        <form
          className="widget-form"
          action="#"
          style={{ background: "#fff", borderRadius: 8, padding: 28, border: "1px solid #e5e5e5" }}
        >
          <h3 style={{ fontFamily: "Quicksand", fontSize: 20, color: "#C10000", margin: "0 0 18px" }}>
            Apply for a Job With Us
          </h3>
          <div className="form-row">
            <label htmlFor="j-name">Name:</label>
            <input id="j-name" name="name" required />
          </div>
          <div className="form-row">
            <label htmlFor="j-email">Email:</label>
            <input id="j-email" name="email" type="email" required />
          </div>
          <div className="form-row">
            <label htmlFor="j-phone">Phone:</label>
            <input id="j-phone" name="phone" type="tel" required />
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
            Contact Us
          </button>
          <p style={{ marginTop: 14 }}>
            Or call us at <a href={SITE.phoneHref}>{SITE.phone}</a>
          </p>
        </form>
      </section>

      <section className="cta-band" style={{ backgroundImage: `url(${p("green-vegetables-1920w.jpg")})` }}>
        <h2>
          <a href={SITE.phoneHref}>{SITE.phone}</a>
        </h2>
      </section>
    </>
    </div>
    
  );
}
