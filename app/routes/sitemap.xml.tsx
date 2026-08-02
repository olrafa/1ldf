import { getArticles } from "../data/articles.server";
import { getGuests } from "../data/episodes.server";
import { CATEGORY_TRANSLATIONS } from "../lib/util";
import type { ArticleCategory } from "../lib/types";

const BASE_URL = "https://1livrodiscofilme.com.br";

const STATIC_PATHS = [
  "/",
  "/episodios",
  "/equipe",
  "/experiencia",
  "/maisumlivro",
  "/maisumdisco",
  "/maisumfilme",
];

const CATEGORIES: ArticleCategory[] = ["book", "record", "film"];

export const loader = async () => {
  const [guests, ...articleLists] = await Promise.all([
    getGuests(),
    ...CATEGORIES.map((category) => getArticles(category)),
  ]);

  const articleUrls = CATEGORIES.flatMap((category, index) =>
    articleLists[index].map(
      (article) =>
        `${BASE_URL}/maisum${CATEGORY_TRANSLATIONS[category]}/${article.id}`
    )
  );

  const episodeUrls = guests.map(
    (guest) => `${BASE_URL}/episodios/${guest.attributes.epNumber}`
  );

  const staticUrls = STATIC_PATHS.map((path) => `${BASE_URL}${path}`);

  const urls = [...staticUrls, ...episodeUrls, ...articleUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};
