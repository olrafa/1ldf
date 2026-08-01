import type { LoaderFunctionArgs } from "react-router";
import { data } from "react-router";
import { getArticle } from "../data/articles.server";
import type { ArticleCategory } from "../lib/types";

export const makeArticleLoader =
  (type: ArticleCategory) =>
  async ({ params }: LoaderFunctionArgs) => {
    const id = Number(params.id);
    if (!Number.isFinite(id)) {
      throw data(null, { status: 404 });
    }

    const article = await getArticle(type, id);
    if (!article) {
      throw data(null, { status: 404 });
    }

    return { article, type };
  };
