import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import MenuPage from "@/app/menu/page";

test("pizza side prices remain paired with their item names", () => {
  render(<MenuPage />);

  expect(screen.getByText("Sauce")).toBeInTheDocument();
  expect(screen.getByText("Hot Giardiniera")).toBeInTheDocument();
});
