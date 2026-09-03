import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import ContactPage from "@/app/contact/page";

test("contact offers working phone and email actions while message delivery is unavailable", () => {
  render(<ContactPage />);

  expect(screen.queryByRole("form")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Email us" })).toHaveAttribute("href", "mailto:myaunke75@gmail.com");
  expect(screen.getByRole("link", { name: "Call (815) 623-2112" })).toHaveAttribute("href", "tel:(815) 623-2112");
});
