import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import MobileQuickActions from "@/components/MobileQuickActions";

test("mobile quick actions include a direct call path", () => {
  render(<MobileQuickActions />);

  expect(screen.getByRole("link", { name: "Call" })).toHaveAttribute("href", "tel:(815) 623-2112");
});
