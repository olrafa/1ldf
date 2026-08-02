import type { ArticleReturn } from "../data/articles.server";
import type { ArticleCategory } from "../lib/types";
import { buildJsonLd, buildMeta } from "../lib/meta";

type ArticleMetaArgs = {
  data?: {
    article: ArticleReturn | null;
    type: ArticleCategory;
  };
};

export const articleMeta = ({ data: loaderData }: ArticleMetaArgs) => {
  if (!loaderData?.article) {
    return buildMeta({});
  }

  const {
    attributes: { description, reference, publishedAt },
  } = loaderData.article;
  const { title, coverImg, creator } = reference.data?.attributes ?? {};

  return [
    ...buildMeta({ title, description, imgSrc: coverImg, type: "article" }),
    buildJsonLd({
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      name: title,
      creator,
      description,
      image: coverImg,
      datePublished: publishedAt,
    }),
  ];
};
