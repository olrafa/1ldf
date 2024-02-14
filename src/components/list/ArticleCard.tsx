import { ReactElement } from "react";
import { ArtReference, ArticleCategory } from "../../constants/types";
import { CATEGORY_TRANSLATIONS } from "../../constants/util";

type ArticleCardProps = {
  description: string;
  reference: ArtReference;
  category: ArticleCategory;
  id: number;
  author: string;
};

const ArticleCard = ({
  description,
  reference,
  category,
  id,
  author,
}: ArticleCardProps): ReactElement => {
  const { title, creator, coverImg } = reference;

  return (
    <a
      className="my-4 md:mx-2 mx-4 p-5 cursor-pointer text-left text-xl md:text-2xl bg-white text-ldfGrey content-box-small md:w-3/5"
      href={`/maisum${CATEGORY_TRANSLATIONS[category]}/${id}`}
      rel="noopener noreferrer"
    >
      <div className="flex flex-col gap-5 md:flex-row text-left items-center justify-around">
        <div className="mt-4 flex flex-col gap-5 justify-start">
          <p className="font-titles text-4xl">
            {title}
            <span className="text-2xl">, de {creator}</span>
          </p>
          <p className="text-lg">{description}</p>
          <p className="text-base">Por {author}</p>
        </div>
        <img src={coverImg} className="h-72" />
      </div>
    </a>
  );
};

export default ArticleCard;
