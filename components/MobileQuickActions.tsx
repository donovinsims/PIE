import { SITE } from "@/lib/site";

export default function MobileQuickActions() {
  return (
    <nav className="mobile-quick-actions" aria-label="Quick actions">
      <a href={SITE.orderUrl} target="_blank" rel="noopener noreferrer" aria-label="Order now (opens in a new tab)">
        Order Now
        <svg className="external-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M15 3h6v6M10 14 21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
      <a href={SITE.phoneHref} aria-label={`Call ${SITE.name} at ${SITE.phone}`}>Call</a>
      <a href={SITE.directions} aria-label={`Get directions to ${SITE.name} at ${SITE.address}`}>Directions</a>
    </nav>
  );
}
