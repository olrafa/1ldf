import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockedQueryDb } = vi.hoisted(() => ({ mockedQueryDb: vi.fn() }));

vi.mock("../lib/db.server", () => ({
  queryDb: mockedQueryDb,
  toIso: (value: unknown) => value,
}));

import { getArticle, getArticles } from "./articles.server";

describe("getArticle", () => {
  beforeEach(() => {
    mockedQueryDb.mockReset();
  });

  it("queries the right table by id and shapes the result", async () => {
    mockedQueryDb.mockResolvedValueOnce([
      {
        id: 1,
        description: "desc",
        article: "full article",
        one_book_comment: null,
        one_record_comment: null,
        one_film_comment: null,
        published_at: "2024-01-01T00:00:00.000Z",
        updated_at: "2024-01-02T00:00:00.000Z",
        author_name: "Jane Doe",
        reference_id: 10,
        reference_title: "Some Book",
        reference_creator: "Some Author",
        reference_year: 2020,
        reference_cover_img: null,
        reference_link: null,
        reference_category: "book",
        one_book_id: null,
        one_record_id: null,
        one_film_id: null,
      },
    ]);

    const result = await getArticle("book", 1);

    expect(mockedQueryDb).toHaveBeenCalledWith(
      "getArticle:book:1",
      expect.stringContaining("FROM books a"),
      [1]
    );
    expect(result).toEqual({
      id: 1,
      attributes: {
        description: "desc",
        article: "full article",
        reference: {
          data: {
            id: 10,
            attributes: {
              title: "Some Book",
              creator: "Some Author",
              year: 2020,
              coverImg: undefined,
              link: undefined,
              category: "book",
            },
          },
        },
        oneBook: { data: null },
        oneBookComment: null,
        oneRecord: { data: null },
        oneRecordComment: null,
        oneFilm: { data: null },
        oneFilmComment: null,
        publishedAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-02T00:00:00.000Z",
        author: { data: { attributes: { name: "Jane Doe" } } },
      },
    });
  });

  it("returns null when no row is found", async () => {
    mockedQueryDb.mockResolvedValueOnce([]);

    const result = await getArticle("book", 999);

    expect(result).toBeNull();
  });

  it("normalizes a failed query to null", async () => {
    mockedQueryDb.mockRejectedValueOnce(new Error("connection error"));

    const result = await getArticle("book", 1);

    expect(result).toBeNull();
  });
});

describe("getArticles", () => {
  beforeEach(() => {
    mockedQueryDb.mockReset();
  });

  it("queries the right table ordered by id desc", async () => {
    mockedQueryDb.mockResolvedValueOnce([]);

    await getArticles("record");

    expect(mockedQueryDb).toHaveBeenCalledWith(
      "getArticles:record",
      expect.stringContaining("FROM records a")
    );
    expect(mockedQueryDb).toHaveBeenCalledWith(
      "getArticles:record",
      expect.stringContaining("ORDER BY a.id DESC")
    );
  });

  it("normalizes a failed query to an empty array", async () => {
    mockedQueryDb.mockRejectedValueOnce(new Error("network error"));

    const result = await getArticles("film");

    expect(result).toEqual([]);
  });
});
