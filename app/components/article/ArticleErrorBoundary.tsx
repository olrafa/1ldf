import { isRouteErrorResponse } from "react-router";
import type { ArticleCategory } from "../../lib/types";
import ArticleNotFound from "./ArticleNotFound";

export const makeArticleErrorBoundary =
  (type: ArticleCategory) =>
  ({ error }: { error: unknown }) => {
    if (isRouteErrorResponse(error) && error.status === 404) {
      return <ArticleNotFound type={type} />;
    }

    throw error;
  };
