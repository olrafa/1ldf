import { getArticles } from "../data/articles.server";
import type { ArticleCategory } from "../lib/types";

export const makeArticleListLoader = (type: ArticleCategory) => async () => {
  const articles = await getArticles(type);
  return { articles, type };
};
