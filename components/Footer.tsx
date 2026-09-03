import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-band">
        <div className="footer-cols">
          <div className="footer-col">
            <h3>Visit us</h3>
            <p>
              5724 Elevator RD
              <br />
              Roscoe, IL 61073
            </p>
          </div>
          <div className="footer-col">
            <h3>Hours</h3>
            <p>
              Mon - Thu, Sun 10:00 am - 9:45 pm
              <br />
              Fri, Sat 10:00 am - 10:45 pm
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
        <a href={SITE.directions}>Get Directions</a>
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
      <div className="footer-policy">
        <a href="http://budurl.com/hibuprivacy">Privacy Policy</a>
        <a href="http://budurl.com/hibucookie">Do Not Share My Information</a>
        <a href="http://budurl.com/hibuconditionsofuse">Conditions of Use</a>
        <a href="http://budurl.com/hibunotice">Notice and Take Down Policy</a>
        <a href="http://b.link/accessibility">Website Accessibility Policy</a>
      </div>
      <div className="footer-copy">
        © 2026 The content on this website is owned by us and our licensors. Do not copy any content (including images)
        without our consent.
      </div>
    </footer>
  );
}