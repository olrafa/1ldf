import type { Route } from "./+types/articleList.film";
import ArticleListView from "../components/list/ArticleListView";
import { makeArticleListLoader } from "./articleList-shared.server";
import { articleListMeta } from "./articleList-shared";

export const loader = makeArticleListLoader("film");
export const meta = articleListMeta("film");

export default function ArticleListFilmRoute({
  loaderData,
}: Route.ComponentProps) {
  const { articles, type } = loaderData;

  return <ArticleListView type={type} articles={articles} />;
}
