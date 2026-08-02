const SITE_TITLE = "1 Livro, 1 Disco, 1 Filme";
const DEFAULT_DESCRIPTION =
  "Um papo sobre o livro, disco e filme que marcaram a vida dos nossos convidados.";
const DEFAULT_IMAGE = "https://1livrodiscofilme.com.br/profile.jpg";

type LdJsonObject = Record<string, unknown>;

export const buildJsonLd = (schema: LdJsonObject) => ({
  "script:ld+json": schema,
});

// React Router's <Meta/> replaces (rather than merges) ancestor route meta
// arrays, so root.tsx's meta() never renders once any leaf route matches.
// Every route calls buildMeta(), so baking the sitewide JSON-LD in here is
// what keeps it present on every page instead of only the true 404 case.
const WEBSITE_JSON_LD = buildJsonLd({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_TITLE,
  url: "https://1livrodiscofilme.com.br",
});

type MetaInput = {
  title?: string;
  description?: string;
  imgSrc?: string;
  author?: string;
};

export const buildMeta = ({ title, description, imgSrc, author }: MetaInput) => {
  const fullTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;

  return [
    { title: fullTitle },
    { property: "og:title", content: fullTitle },
    {
      property: "og:description",
      content: description || DEFAULT_DESCRIPTION,
    },
    { property: "og:type", content: "website" },
    {
      name: "image",
      property: "og:image",
      content: imgSrc || DEFAULT_IMAGE,
    },
    { property: "og:image:type", content: "image/jpg" },
    { property: "og:image:width", content: "400" },
    { property: "og:image:height", content: "400" },
    ...(author ? [{ property: "article:author", content: author }] : []),
    WEBSITE_JSON_LD,
  ];
};
