import { expect, test } from "vitest";
import { SITE } from "@/lib/site";

test("shared hours copy does not claim a live open status", () => {
  expect(SITE.hoursLine).not.toContain("Open");
  expect(SITE.hoursLine).toContain("Fri");
});
