import { ReactElement } from "react";
import { Link } from "react-router";
import { ArticleCategory } from "../../lib/types";
import { CATEGORY_TRANSLATIONS } from "../../lib/util";
import type { ArticleListReturn } from "../../data/articles.server";

type ArticleCardProps = {
  category: ArticleCategory;
  article: ArticleListReturn;
  cover?: boolean;
};

const ArticleCard = ({
  category,
  article,
  cover,
}: ArticleCardProps): ReactElement => {
  const { id, attributes } = article;
  const { description, reference, publishedAt } = attributes;
  const {
    data: { attributes: refAttributes },
  } = reference;
  const { title, creator, coverImg } = refAttributes;
  const { name: authorName } = attributes.author.data.attributes;

  return (
    <Link
      className={`my-8 mx-3 p-5 cursor-pointer text-left text-xl md:text-2xl bg-white text-ldfGrey content-box-small ${
        !cover && "md:w-3/5"
      }`}
      to={`/maisum${CATEGORY_TRANSLATIONS[category]}/${id}`}
    >
      <div className="flex flex-col gap-5 md:flex-row text-left items-center justify-around">
        <div className="mt-4 flex flex-col gap-5 justify-start">
          {cover && (
            <p className="font-titles capitalize">{`+1 ${CATEGORY_TRANSLATIONS[category]}`}</p>
          )}
          <p className="font-titles text-4xl">
            {title}
            <span className="text-2xl">, de {creator}</span>
          </p>
          <p className="text-lg">{description}</p>
          <p className="text-base">Por {authorName}</p>
          <p className="text-base">
              {new Date(publishedAt).toLocaleDateString("pt-BR", {
                month: "long",
                day: "numeric",
               // year: "numeric",
              })}
            </p>
        </div>
        <img src={coverImg} className="h-72" loading="lazy"/>
      </div>
    </Link>
  );
};

export default ArticleCard;
