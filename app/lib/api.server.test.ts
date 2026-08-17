import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockedGet } = vi.hoisted(() => ({ mockedGet: vi.fn() }));

vi.mock("axios", () => ({
  default: {
    create: () => ({
      get: mockedGet,
      interceptors: { request: { use: vi.fn() } },
    }),
    isAxiosError: (error: unknown) =>
      typeof error === "object" && error !== null && "isAxiosError" in error,
  },
}));

import { cachedGet } from "./api.server";

describe("cachedGet", () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it("returns fresh data and caches it on success", async () => {
    mockedGet.mockResolvedValueOnce({ data: { data: "fresh" } });

    const result = await cachedGet("stable-url");

    expect(result).toEqual({ data: "fresh" });
  });

  it("serves the last cached response when a later request fails", async () => {
    mockedGet.mockResolvedValueOnce({ data: { data: "warm" } });
    await cachedGet("flaky-url");

    mockedGet.mockRejectedValueOnce(new Error("timeout"));
    const result = await cachedGet("flaky-url");

    expect(result).toEqual({ data: "warm" });
  });

  it("rethrows when there is no cached response to fall back to", async () => {
    mockedGet.mockRejectedValueOnce(new Error("cold start"));

    await expect(cachedGet("never-succeeded-url")).rejects.toThrow(
      "cold start"
    );
  });

  it("does not serve stale data for a definitive 404, even if cached", async () => {
    mockedGet.mockResolvedValueOnce({ data: { data: "was here" } });
    await cachedGet("deleted-url");

    mockedGet.mockRejectedValueOnce({
      isAxiosError: true,
      response: { status: 404 },
    });

    await expect(cachedGet("deleted-url")).rejects.toMatchObject({
      response: { status: 404 },
    });
  });

  it("still serves stale data for a 5xx server error", async () => {
    mockedGet.mockResolvedValueOnce({ data: { data: "warm" } });
    await cachedGet("flaky-5xx-url");

    mockedGet.mockRejectedValueOnce({
      isAxiosError: true,
      response: { status: 503 },
    });
    const result = await cachedGet("flaky-5xx-url");

    expect(result).toEqual({ data: "warm" });
  });
});
