import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import ContactPage from "@/app/contact/page";

test("contact page renders Tally form embed", () => {
  render(<ContactPage />);

  // The Tally iframe embed is present with the correct form URL.
  const iframe = screen.getByTitle("Contact Pietro's Pizzeria");
  expect(iframe).toBeInTheDocument();
  expect(iframe).toHaveAttribute(
    "data-tally-src",
    expect.stringContaining("tally.so/embed/eqXgox")
  );
});

test("contact page shows address and phone info", () => {
  render(<ContactPage />);

  expect(screen.getAllByText(/5724 Elevator RD/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText("Get In Touch With Us").length).toBeGreaterThan(0);
});
