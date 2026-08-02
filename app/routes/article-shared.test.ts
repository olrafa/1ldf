import { describe, it, expect, vi, beforeEach } from "vitest";
import { makeArticleLoader } from "./article-shared.server";
import { articleMeta } from "./article-shared";
import { getArticle } from "../data/articles.server";
import type { LoaderFunctionArgs } from "react-router";

vi.mock("../data/articles.server", () => ({
  getArticle: vi.fn(),
}));

const mockedGetArticle = getArticle as unknown as ReturnType<typeof vi.fn>;

const makeArgs = (id: string): LoaderFunctionArgs =>
  ({ params: { id } }) as unknown as LoaderFunctionArgs;

describe("makeArticleLoader", () => {
  beforeEach(() => {
    mockedGetArticle.mockReset();
  });

  it("throws a 404 when the id param is not numeric", async () => {
    const loader = makeArticleLoader("book");

    await expect(loader(makeArgs("not-a-number"))).rejects.toMatchObject({
      init: { status: 404 },
    });
    expect(mockedGetArticle).not.toHaveBeenCalled();
  });

  it("throws a 404 when the article is not found", async () => {
    mockedGetArticle.mockResolvedValueOnce(null);
    const loader = makeArticleLoader("book");

    await expect(loader(makeArgs("999"))).rejects.toMatchObject({
      init: { status: 404 },
    });
  });

  it("returns the article and type on the happy path", async () => {
    const article = { id: 1, attributes: {} };
    mockedGetArticle.mockResolvedValueOnce(article);
    const loader = makeArticleLoader("book");

    const result = await loader(makeArgs("1"));

    expect(result).toEqual({ article, type: "book" });
    expect(mockedGetArticle).toHaveBeenCalledWith("book", 1);
  });
});

describe("articleMeta", () => {
  it("returns fallback meta when there is no loader data", () => {
    const tags = articleMeta({ data: undefined });

    expect(tags).toContainEqual({ title: "1 Livro, 1 Disco, 1 Filme" });
  });

  it("returns article-specific meta when loader data is present", () => {
    const tags = articleMeta({
      data: {
        type: "book",
        article: {
          id: 1,
          attributes: {
            description: "desc",
            reference: {
              data: { attributes: { title: "My Book", coverImg: "img.jpg" } },
            },
          },
        } as never,
      },
    });

    expect(tags).toContainEqual({
      title: "My Book | 1 Livro, 1 Disco, 1 Filme",
    });
    expect(tags).toContainEqual({
      property: "og:description",
      content: "desc",
    });
  });
});
