import { SITE } from "@/lib/site";

export default function MobileQuickActions() {
  return (
    <nav className="mobile-quick-actions" aria-label="Quick actions">
      <a href={SITE.orderUrl}>Order Now</a>
      <a href={SITE.phoneHref}>Call</a>
      <a href={SITE.directions}>Directions</a>
    </nav>
  );
}
