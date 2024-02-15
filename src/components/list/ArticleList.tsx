import { ReactElement } from "react";
import Loader from "../loader";
import { ArticleCategory } from "../../constants/types";
import useGetArticles from "../../hooks/useGetArticles";
import ArticleCard from "./ArticleCard";
import { CATEGORY_TRANSLATIONS, toTitleCase } from "../../constants/util";
import PageHelmet from "../PageHelmet";

type ArticleListCategoryProps = {
  category: ArticleCategory;
};

const ArticleList = ({ category }: ArticleListCategoryProps): ReactElement => {
  const { data: articles = [], isLoading } = useGetArticles(category);

  if (isLoading || !articles) {
    return <Loader />;
  }

  const articleData = articles.map(({ id, attributes }) => ({
    id,
    attributes,
  }));

  return (
    <div>
      <PageHelmet
        title={`+1 ${toTitleCase(CATEGORY_TRANSLATIONS[category])}`}
      />
      <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl mb-24">
        <div className="font-titles text-6xl capitalize">{`+1 ${CATEGORY_TRANSLATIONS[category]}`}</div>
        {articleData.map((article) => (
          <ArticleCard key={article.id} category={category} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
