import type { Route } from "./+types/article.film";
import { isRouteErrorResponse } from "react-router";
import { makeArticleLoader } from "./article-shared.server";
import { articleMeta } from "./article-shared";
import ArticleView from "../components/article/ArticleView";
import ArticleNotFound from "../components/article/ArticleNotFound";

export const loader = makeArticleLoader("film");
export const meta = articleMeta;

export default function ArticleFilmRoute({
  loaderData,
}: Route.ComponentProps) {
  return <ArticleView article={loaderData.article} type={loaderData.type} />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <ArticleNotFound type="film" />;
  }

  throw error;
}
