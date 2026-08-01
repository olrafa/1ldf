import { describe, it, expect } from "vitest";
import { buildMeta, buildJsonLd } from "./meta";

describe("buildMeta", () => {
  it("falls back to site-wide defaults when given no input", () => {
    const tags = buildMeta({});

    expect(tags).toContainEqual({ title: "1 Livro, 1 Disco, 1 Filme" });
    expect(tags).toContainEqual({
      property: "og:description",
      content:
        "Um papo sobre o livro, disco e filme que marcaram a vida dos nossos convidados.",
    });
    expect(tags).toContainEqual({
      name: "image",
      property: "og:image",
      content: "https://1livrodiscofilme.com.br/profile.jpg",
    });
  });

  it("uses page-specific values when provided", () => {
    const tags = buildMeta({
      title: "Episódio 1",
      description: "Um papo bacana",
      imgSrc: "https://example.com/cover.jpg",
      author: "Fulano",
    });

    expect(tags).toContainEqual({
      title: "Episódio 1 | 1 Livro, 1 Disco, 1 Filme",
    });
    expect(tags).toContainEqual({
      property: "og:description",
      content: "Um papo bacana",
    });
    expect(tags).toContainEqual({
      name: "image",
      property: "og:image",
      content: "https://example.com/cover.jpg",
    });
    expect(tags).toContainEqual({
      property: "article:author",
      content: "Fulano",
    });
  });

  it("omits the article:author tag when no author is given", () => {
    const tags = buildMeta({ title: "Sem autor" });

    expect(
      tags.some((tag) => "property" in tag && tag.property === "article:author")
    ).toBe(false);
  });
});

describe("buildJsonLd", () => {
  it("wraps the schema in a script:ld+json descriptor", () => {
    const schema = { "@type": "WebSite", name: "1 Livro, 1 Disco, 1 Filme" };

    expect(buildJsonLd(schema)).toEqual({ "script:ld+json": schema });
  });
});
