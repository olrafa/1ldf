import type { Route } from "./+types/article.record";
import { makeArticleLoader } from "./article-shared.server";
import { articleMeta } from "./article-shared";
import ArticleView from "../components/article/ArticleView";
import { makeArticleErrorBoundary } from "../components/article/ArticleErrorBoundary";

export const loader = makeArticleLoader("record");
export const meta = articleMeta;

export default function ArticleRecordRoute({
  loaderData,
}: Route.ComponentProps) {
  return <ArticleView article={loaderData.article} type={loaderData.type} />;
}

export const ErrorBoundary = makeArticleErrorBoundary("record");
