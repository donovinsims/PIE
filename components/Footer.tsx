import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-band">
        <div className="footer-cols">
          <div className="footer-col">
            <h3>Visit us</h3>
            <p>
              <a href={SITE.directions}>
                5724 Elevator RD
                <br />
                Roscoe, IL 61073
              </a>
            </p>
          </div>
          <div className="footer-col">
            <h3>Hours</h3>
            <p>
              {SITE.hoursShort}
            </p>
          </div>
          <div className="footer-col">
            <h3>Contact us</h3>
            <p>
              Main: <a href={SITE.phoneHref}>{SITE.phone}</a>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-directions">
        <a className="pill-btn" href={SITE.directions}>Get Directions</a>
      </div>
      <div className="footer-social">
        <a href={SITE.facebook} aria-label="Facebook" style={{ display: "inline-flex" }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
            <circle cx="20" cy="20" r="18" fill="#3b5998" />
            <path
              d="M26 13h-3a4 4 0 0 0-4 4v3h-3v4h3v9h4v-9h3l1-4h-4v-3a1 1 0 0 1 1-1h3v-3z"
              fill="#fff"
            />
          </svg>
        </a>
      </div>
      <nav className="footer-policy" aria-label="Legal">
        <a className="footer-link" href="http://budurl.com/hibuprivacy">Privacy Policy</a>
        <a className="footer-link" href="http://budurl.com/hibucookie">Do Not Share My Information</a>
        <a className="footer-link" href="http://budurl.com/hibuconditionsofuse">Conditions of Use</a>
        <a className="footer-link" href="http://budurl.com/hibunotice">Notice and Take Down Policy</a>
        <a className="footer-link" href="http://b.link/accessibility">Website Accessibility Policy</a>
      </nav>
      <div className="footer-copy">
        © 2026 The content on this website is owned by us and our licensors. Do not copy any content (including images)
        without our consent.
      </div>
    </footer>
  );
}