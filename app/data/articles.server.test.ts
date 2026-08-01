import { describe, it, expect, vi, beforeEach } from "vitest";
import { getArticle, getArticles } from "./articles.server";
import { api } from "../lib/api.server";

vi.mock("../lib/api.server", () => ({
  api: { get: vi.fn() },
}));

const mockedGet = api.get as unknown as ReturnType<typeof vi.fn>;

describe("getArticle", () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it("fetches with the expected populate query and returns the entity", async () => {
    mockedGet.mockResolvedValueOnce({
      data: { data: { id: 1, attributes: {} } },
    });

    const result = await getArticle("book", 1);

    expect(mockedGet).toHaveBeenCalledWith(
      "books/1?populate=reference&populate=oneBook&populate=oneRecord&populate=oneFilm&populate=author"
    );
    expect(result).toEqual({ id: 1, attributes: {} });
  });

  it("normalizes a failed request to null", async () => {
    mockedGet.mockRejectedValueOnce(new Error("not found"));

    const result = await getArticle("book", 999);

    expect(result).toBeNull();
  });
});

describe("getArticles", () => {
  beforeEach(() => {
    mockedGet.mockReset();
  });

  it("fetches with the expected list query", async () => {
    mockedGet.mockResolvedValueOnce({ data: { data: [] } });

    await getArticles("record");

    expect(mockedGet).toHaveBeenCalledWith(
      "records?populate=reference&populate=author&sort=id:desc"
    );
  });

  it("normalizes a failed request to an empty array", async () => {
    mockedGet.mockRejectedValueOnce(new Error("network error"));

    const result = await getArticles("film");

    expect(result).toEqual([]);
  });
});
