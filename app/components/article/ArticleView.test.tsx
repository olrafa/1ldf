import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ArticleView from "./ArticleView";
import type { ArticleReturn } from "../../data/articles.server";

const buildArticle = (): ArticleReturn => ({
  id: 1,
  attributes: {
    description: "Uma descrição",
    article: "Corpo do artigo em markdown",
    reference: {
      data: {
        id: 10,
        attributes: {
          title: "Livro de Referência",
          creator: "Autor Principal",
          year: 2020,
          coverImg: "https://example.com/cover.jpg",
          link: "https://example.com/buy",
          category: "book",
        },
      },
    },
    oneBook: {
      data: {
        id: 11,
        attributes: {
          title: "Outro Livro",
          creator: "Outro Autor",
          year: 2019,
          category: "book",
        },
      },
    },
    oneBookComment: "Comentário sobre o livro",
    oneRecord: {
      data: {
        id: 12,
        attributes: {
          title: "Disco Legal",
          creator: "Banda",
          year: 2018,
          category: "record",
        },
      },
    },
    oneRecordComment: "Comentário sobre o disco",
    oneFilm: {
      data: {
        id: 13,
        attributes: {
          title: "Filme Legal",
          creator: "Diretor",
          year: 2017,
          category: "film",
        },
      },
    },
    oneFilmComment: "Comentário sobre o filme",
    publishedAt: "2024-01-01T12:00:00.000Z",
    updatedAt: "2024-01-01T12:00:00.000Z",
    author: { data: { attributes: { name: "Fulano" } } },
  },
});

describe("ArticleView", () => {
  it("renders the reference title, author, and comments", () => {
    render(<ArticleView article={buildArticle()} type="book" />);

    expect(screen.getAllByText("Livro de Referência").length).toBeGreaterThan(0);
    expect(screen.getByText(/Fulano/)).toBeInTheDocument();
    expect(screen.getByText("Outro Livro", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Comentário sobre o disco")).toBeInTheDocument();
  });
});
