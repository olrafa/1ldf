import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockedQuery, MockNeonDbError } = vi.hoisted(() => {
  class MockNeonDbError extends Error {
    name = "NeonDbError" as const;
  }

  return { mockedQuery: vi.fn(), MockNeonDbError };
});

vi.mock("@neondatabase/serverless", () => ({
  neon: () => ({ query: mockedQuery }),
  NeonDbError: MockNeonDbError,
}));

import { queryDb } from "./db.server";

describe("queryDb", () => {
  beforeEach(() => {
    mockedQuery.mockReset();
  });

  it("returns fresh data and caches it on success", async () => {
    mockedQuery.mockResolvedValueOnce([{ id: 1 }]);

    const result = await queryDb("stable-key", "SELECT 1");

    expect(result).toEqual([{ id: 1 }]);
  });

  it("serves the last cached response when a later query fails with a connectivity error", async () => {
    mockedQuery.mockResolvedValueOnce([{ id: 1, name: "warm" }]);
    await queryDb("flaky-key", "SELECT 1");

    mockedQuery.mockRejectedValueOnce(new Error("fetch failed"));
    const result = await queryDb("flaky-key", "SELECT 1");

    expect(result).toEqual([{ id: 1, name: "warm" }]);
  });

  it("rethrows when there is no cached response to fall back to", async () => {
    mockedQuery.mockRejectedValueOnce(new Error("fetch failed"));

    await expect(
      queryDb("never-succeeded-key", "SELECT 1")
    ).rejects.toThrow("fetch failed");
  });

  it("does not serve stale data for a definitive NeonDbError, even if cached", async () => {
    mockedQuery.mockResolvedValueOnce([{ id: 1, name: "was here" }]);
    await queryDb("deleted-key", "SELECT 1");

    mockedQuery.mockRejectedValueOnce(new MockNeonDbError("permission denied"));

    await expect(queryDb("deleted-key", "SELECT 1")).rejects.toThrow(
      "permission denied"
    );
  });
});
