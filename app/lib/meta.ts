export const SITE_URL = "https://1livrodiscofilme.com.br";

const SITE_TITLE = "1 Livro, 1 Disco, 1 Filme";
const DEFAULT_DESCRIPTION =
  "Um papo sobre o livro, disco e filme que marcaram a vida dos nossos convidados.";
const DEFAULT_IMAGE = `${SITE_URL}/profile.jpg`;
const DEFAULT_IMAGE_SIZE = "176";

type LdJsonObject = Record<string, unknown>;

export const buildJsonLd = (schema: LdJsonObject) => ({
  "script:ld+json": schema,
});

const IMAGE_MIME_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
};

const getImageMimeType = (url: string) => {
  const extension = url.split(".").pop()?.toLowerCase().split(/[?#]/)[0];
  return (extension && IMAGE_MIME_TYPES[extension]) || "image/jpeg";
};

// React Router's <Meta/> replaces (rather than merges) ancestor route meta
// arrays, so root.tsx's meta() never renders once any leaf route matches.
// Every route calls buildMeta(), so baking the sitewide JSON-LD in here is
// what keeps it present on every page instead of only the true 404 case.
const WEBSITE_JSON_LD = buildJsonLd({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_TITLE,
  url: SITE_URL,
});

type MetaInput = {
  title?: string;
  description?: string;
  imgSrc?: string;
  author?: string;
  type?: "website" | "article";
};

export const buildMeta = ({
  title,
  description,
  imgSrc,
  author,
  type,
}: MetaInput) => {
  const fullTitle = title ? `${title} | ${SITE_TITLE}` : SITE_TITLE;
  const fullDescription = description ?? DEFAULT_DESCRIPTION;
  const isDefaultImage = !imgSrc;
  const image = imgSrc || DEFAULT_IMAGE;

  return [
    { title: fullTitle },
    { name: "description", content: fullDescription },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: fullDescription },
    { property: "og:type", content: type ?? "website" },
    {
      name: "image",
      property: "og:image",
      content: image,
    },
    { property: "og:image:type", content: getImageMimeType(image) },
    ...(isDefaultImage
      ? [
          { property: "og:image:width", content: DEFAULT_IMAGE_SIZE },
          { property: "og:image:height", content: DEFAULT_IMAGE_SIZE },
        ]
      : []),
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: fullDescription },
    { name: "twitter:image", content: image },
    ...(author ? [{ property: "article:author", content: author }] : []),
    WEBSITE_JSON_LD,
  ];
};
