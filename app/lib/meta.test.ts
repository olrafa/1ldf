import { describe, it, expect } from "vitest";
import { buildMeta, buildJsonLd } from "./meta";

describe("buildMeta", () => {
  it("falls back to site-wide defaults when given no input", () => {
    const tags = buildMeta({});

    expect(tags).toContainEqual({ title: "1 Livro, 1 Disco, 1 Filme" });
    expect(tags).toContainEqual({
      name: "description",
      content:
        "Um papo sobre o livro, disco e filme que marcaram a vida dos nossos convidados.",
    });
    expect(tags).toContainEqual({
      property: "og:description",
      content:
        "Um papo sobre o livro, disco e filme que marcaram a vida dos nossos convidados.",
    });
    expect(tags).toContainEqual({
      property: "og:type",
      content: "website",
    });
    expect(tags).toContainEqual({
      name: "image",
      property: "og:image",
      content: "https://1livrodiscofilme.com.br/profile.jpg",
    });
    expect(tags).toContainEqual({
      property: "og:image:width",
      content: "176",
    });
    expect(tags).toContainEqual({
      property: "og:image:height",
      content: "176",
    });
    expect(tags).toContainEqual({
      name: "twitter:card",
      content: "summary_large_image",
    });
    expect(tags).toContainEqual({
      name: "twitter:image",
      content: "https://1livrodiscofilme.com.br/profile.jpg",
    });
  });

  it("uses page-specific values when provided", () => {
    const tags = buildMeta({
      title: "Episódio 1",
      description: "Um papo bacana",
      imgSrc: "https://example.com/cover.jpg",
      author: "Fulano",
      type: "article",
    });

    expect(tags).toContainEqual({
      title: "Episódio 1 | 1 Livro, 1 Disco, 1 Filme",
    });
    expect(tags).toContainEqual({
      property: "og:description",
      content: "Um papo bacana",
    });
    expect(tags).toContainEqual({
      property: "og:type",
      content: "article",
    });
    expect(tags).toContainEqual({
      name: "image",
      property: "og:image",
      content: "https://example.com/cover.jpg",
    });
    expect(tags).toContainEqual({
      name: "twitter:title",
      content: "Episódio 1 | 1 Livro, 1 Disco, 1 Filme",
    });
    expect(tags).toContainEqual({
      name: "twitter:description",
      content: "Um papo bacana",
    });
    expect(tags).toContainEqual({
      property: "article:author",
      content: "Fulano",
    });
  });

  it("omits og:image:width/height when a custom imgSrc is given", () => {
    const tags = buildMeta({ imgSrc: "https://example.com/cover.jpg" });

    expect(
      tags.some((tag) => "property" in tag && tag.property === "og:image:width")
    ).toBe(false);
    expect(
      tags.some((tag) => "property" in tag && tag.property === "og:image:height")
    ).toBe(false);
  });

  it("omits the article:author tag when no author is given", () => {
    const tags = buildMeta({ title: "Sem autor" });

    expect(
      tags.some((tag) => "property" in tag && tag.property === "article:author")
    ).toBe(false);
  });

  it("derives og:image:type from the image's actual extension", () => {
    const pngTags = buildMeta({ imgSrc: "https://example.com/cover.png" });
    expect(pngTags).toContainEqual({
      property: "og:image:type",
      content: "image/png",
    });

    const jpgTags = buildMeta({ imgSrc: "https://example.com/cover.jpg" });
    expect(jpgTags).toContainEqual({
      property: "og:image:type",
      content: "image/jpeg",
    });

    const defaultTags = buildMeta({});
    expect(defaultTags).toContainEqual({
      property: "og:image:type",
      content: "image/jpeg",
    });
  });

  it("keeps an explicitly empty description instead of falling back", () => {
    const tags = buildMeta({ description: "" });

    expect(tags).toContainEqual({ name: "description", content: "" });
    expect(tags).toContainEqual({ property: "og:description", content: "" });
  });
});

describe("buildJsonLd", () => {
  it("wraps the schema in a script:ld+json descriptor", () => {
    const schema = { "@type": "WebSite", name: "1 Livro, 1 Disco, 1 Filme" };

    expect(buildJsonLd(schema)).toEqual({ "script:ld+json": schema });
  });
});
