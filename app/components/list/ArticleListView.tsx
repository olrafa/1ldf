import { ReactElement } from "react";
import ArticleCard from "./ArticleCard";
import { CATEGORY_TRANSLATIONS } from "../../lib/util";
import type { ArticleCategory } from "../../lib/types";
import type { ArticleListReturn } from "../../data/articles.server";

type ArticleListViewProps = {
  type: ArticleCategory;
  articles: ArticleListReturn[];
};

const ArticleListView = ({
  type,
  articles,
}: ArticleListViewProps): ReactElement => (
  <div>
    <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl mb-24">
      <div className="font-titles text-6xl capitalize">{`+1 ${CATEGORY_TRANSLATIONS[type]}`}</div>
      {articles.map((article) => (
        <ArticleCard key={article.id} category={type} article={article} />
      ))}
    </div>
  </div>
);

export default ArticleListView;
