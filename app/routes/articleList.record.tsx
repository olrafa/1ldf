import type { Route } from "./+types/articleList.record";
import ArticleListView from "../components/list/ArticleListView";
import { makeArticleListLoader } from "./articleList-shared.server";
import { articleListMeta } from "./articleList-shared";

export const loader = makeArticleListLoader("record");
export const meta = articleListMeta("record");

export default function ArticleListRecordRoute({
  loaderData,
}: Route.ComponentProps) {
  const { articles, type } = loaderData;

  return <ArticleListView type={type} articles={articles} />;
}
