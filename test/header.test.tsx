import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

import Header from "@/components/Header";

test("mobile navigation closes with Escape and returns focus to its trigger", () => {
  render(<Header />);

  const trigger = screen.getByRole("button", { name: "Open navigation menu" });
  fireEvent.click(trigger);
  fireEvent.keyDown(window, { key: "Escape" });

  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(trigger).toHaveFocus();
});
