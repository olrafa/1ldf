import { getArticles } from "../data/articles.server";
import { getGuests } from "../data/episodes.server";
import { CATEGORY_TRANSLATIONS } from "../lib/util";
import type { ArticleCategory } from "../lib/types";
import { SITE_URL } from "../lib/meta";

const STATIC_PATH_META: Record<
  string,
  { changefreq: string; priority: string }
> = {
  "/": { changefreq: "daily", priority: "1.0" },
  "/episodios": { changefreq: "weekly", priority: "0.8" },
  "/equipe": { changefreq: "monthly", priority: "0.5" },
  "/experiencia": { changefreq: "monthly", priority: "0.5" },
  "/maisumlivro": { changefreq: "weekly", priority: "0.8" },
  "/maisumdisco": { changefreq: "weekly", priority: "0.8" },
  "/maisumfilme": { changefreq: "weekly", priority: "0.8" },
};

const CATEGORIES: ArticleCategory[] = ["book", "record", "film"];

type SitemapUrl = {
  loc: string;
  lastmod?: string;
  changefreq: string;
  priority: string;
};

// Formats as the sitemap's required YYYY-MM-DD, in the site's own
// America/Sao_Paulo timezone (matching formatDate/ArticleView elsewhere)
// rather than UTC. Returns undefined for missing/unparseable CMS dates
// instead of throwing, since these fields aren't schema-validated.
export const toIsoDate = (date: string | undefined): string | undefined => {
  if (!date) return undefined;

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return undefined;

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
  }).format(parsed);
};

const renderUrlTag = (url: SitemapUrl): string =>
  `  <url>` +
  `<loc>${url.loc}</loc>` +
  (url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : "") +
  `<changefreq>${url.changefreq}</changefreq>` +
  `<priority>${url.priority}</priority>` +
  `</url>`;

export const loader = async () => {
  const [guests, ...articleLists] = await Promise.all([
    getGuests(),
    ...CATEGORIES.map((category) => getArticles(category)),
  ]);

  const articleUrls: SitemapUrl[] = CATEGORIES.flatMap((category, index) =>
    articleLists[index].map((article) => ({
      loc: `${SITE_URL}/maisum${CATEGORY_TRANSLATIONS[category]}/${article.id}`,
      lastmod: toIsoDate(article.attributes.publishedAt),
      changefreq: "monthly",
      priority: "0.6",
    }))
  );

  const episodeUrls: SitemapUrl[] = guests.map((guest) => ({
    loc: `${SITE_URL}/episodios/${guest.attributes.epNumber}`,
    lastmod: toIsoDate(guest.attributes.date),
    changefreq: "monthly",
    priority: "0.7",
  }));

  const staticUrls: SitemapUrl[] = Object.entries(STATIC_PATH_META).map(
    ([path, meta]) => ({
      loc: `${SITE_URL}${path}`,
      ...meta,
    })
  );

  const urls = [...staticUrls, ...episodeUrls, ...articleUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(renderUrlTag).join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
};
