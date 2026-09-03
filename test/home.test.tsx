import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import HomePage from "@/app/page";

test("home continues from the dining invitation into useful gallery and review content", () => {
  const { container } = render(<HomePage />);

  expect(container.querySelector(".home-gap")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Read all reviews" })).toHaveAttribute("href", "/reviews");
});
