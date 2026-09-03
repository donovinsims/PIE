import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import ContactPage from "@/app/contact/page";

test("contact page renders a working message form with required fields", () => {
  render(<ContactPage />);

  // The contact form (as deployed) is present with its required fields.
  expect(screen.getByLabelText("Name *")).toBeRequired();
  expect(screen.getByLabelText("Email *")).toBeRequired();
  expect(screen.getByLabelText("Phone *")).toBeRequired();
  expect(screen.getByLabelText("Message *")).toBeRequired();

  expect(screen.getByRole("button", { name: "Reach Out To Us" })).toBeInTheDocument();
  expect(screen.getByText(/This site is protected by reCAPTCHA/i)).toBeInTheDocument();
});
