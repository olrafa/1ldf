import { describe, it, expect } from "vitest";
import { toIsoDate } from "./sitemap.xml";

describe("toIsoDate", () => {
  it("formats a UTC timestamp as YYYY-MM-DD in the site's timezone", () => {
    expect(toIsoDate("2024-06-15T12:00:00.000Z")).toBe("2024-06-15");
  });

  it("rolls back to the previous day for late-evening São Paulo timestamps", () => {
    expect(toIsoDate("2024-01-01T01:00:00.000Z")).toBe("2023-12-31");
  });

  it("returns undefined instead of throwing for an empty string", () => {
    expect(toIsoDate("")).toBeUndefined();
  });

  it("returns undefined instead of throwing for an unparseable date", () => {
    expect(toIsoDate("not-a-date")).toBeUndefined();
  });

  it("returns undefined for undefined input", () => {
    expect(toIsoDate(undefined)).toBeUndefined();
  });
});
