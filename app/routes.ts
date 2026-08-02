import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/main.tsx"),
  route("episodios", "routes/episodeList.tsx"),
  route("episodios/:id", "routes/episode.tsx"),
  route("equipe", "routes/team.tsx"),
  route("experiencia", "routes/experience.tsx"),
  route("maisumlivro", "routes/articleList.book.tsx"),
  route("maisumlivro/:id", "routes/article.book.tsx"),
  route("maisumdisco", "routes/articleList.record.tsx"),
  route("maisumdisco/:id", "routes/article.record.tsx"),
  route("maisumfilme", "routes/articleList.film.tsx"),
  route("maisumfilme/:id", "routes/article.film.tsx"),
  route("sitemap.xml", "routes/sitemap.xml.tsx"),
] satisfies RouteConfig;
