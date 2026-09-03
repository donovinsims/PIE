import { SITE } from "@/lib/site";

export default function MobileQuickActions() {
  return (
    <nav className="mobile-quick-actions" aria-label="Quick actions">
      <a href={SITE.orderUrl} target="_blank" rel="noopener noreferrer" aria-label="Order now (opens in a new tab)">
        Order Now
      </a>
      <a href={SITE.phoneHref}>Call</a>
      <a href={SITE.directions}>Directions</a>
    </nav>
  );
}
