import type { Route } from "./+types/articleList.book";
import ArticleListView from "../components/list/ArticleListView";
import { makeArticleListLoader } from "./articleList-shared.server";
import { articleListMeta } from "./articleList-shared";

export const loader = makeArticleListLoader("book");
export const meta = articleListMeta("book");

export default function ArticleListBookRoute({
  loaderData,
}: Route.ComponentProps) {
  const { articles, type } = loaderData;

  return <ArticleListView type={type} articles={articles} />;
}
