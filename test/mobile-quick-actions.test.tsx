import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import MobileQuickActions from "@/components/MobileQuickActions";
import { SITE } from "@/lib/site";

test("mobile quick actions include a direct call path", () => {
  render(<MobileQuickActions />);

  const callLink = screen.getByRole("link", { name: `Call ${SITE.name} at ${SITE.phone}` });
  expect(callLink).toHaveAttribute("href", SITE.phoneHref);
  expect(callLink).toHaveAttribute("href", "tel:+18156232112");
});

test("mobile quick actions expose a directions path", () => {
  const { container } = render(<MobileQuickActions />);
  const nav = within(container).getByRole("navigation", { name: "Quick actions" });

  expect(
    within(nav).getByRole("link", { name: `Get directions to ${SITE.name} at ${SITE.address}` }),
  ).toHaveAttribute("href", SITE.directions);
});
