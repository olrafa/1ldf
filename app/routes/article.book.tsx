import type { Route } from "./+types/article.book";
import { isRouteErrorResponse } from "react-router";
import { makeArticleLoader } from "./article-shared.server";
import { articleMeta } from "./article-shared";
import ArticleView from "../components/article/ArticleView";
import ArticleNotFound from "../components/article/ArticleNotFound";

export const loader = makeArticleLoader("book");
export const meta = articleMeta;

export default function ArticleBookRoute({
  loaderData,
}: Route.ComponentProps) {
  return <ArticleView article={loaderData.article} type={loaderData.type} />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <ArticleNotFound type="book" />;
  }

  throw error;
}
