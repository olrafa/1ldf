import type { Route } from "./+types/articleList.book";
import ArticleCard from "../components/list/ArticleCard";
import { CATEGORY_TRANSLATIONS } from "../lib/util";
import { makeArticleListLoader } from "./articleList-shared.server";
import { articleListMeta } from "./articleList-shared";

export const loader = makeArticleListLoader("book");
export const meta = articleListMeta("book");

export default function ArticleListBookRoute({
  loaderData,
}: Route.ComponentProps) {
  const { articles, type } = loaderData;

  return (
    <div>
      <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl mb-24">
        <div className="font-titles text-6xl capitalize">{`+1 ${CATEGORY_TRANSLATIONS[type]}`}</div>
        {articles.map((article) => (
          <ArticleCard key={article.id} category={type} article={article} />
        ))}
      </div>
    </div>
  );
}
