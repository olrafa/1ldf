import { ReactElement } from "react";
import { Link } from "react-router";
import { ArticleCategory } from "../../lib/types";
import { CATEGORY_TRANSLATIONS } from "../../lib/util";

type ArticleNotFoundProps = {
  type: ArticleCategory;
};

const ArticleNotFound = ({ type }: ArticleNotFoundProps): ReactElement => (
  <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl mb-4">
    <div className="font-titles text-6xl">Artigo não encontrado</div>
    <div className="md:w-3/5">
      Não encontramos esse artigo. Fique à vontade para explorar a lista de
      artigos:
    </div>
    <Link
      to={`/maisum${CATEGORY_TRANSLATIONS[type]}`}
      className="content-box-small bg-slate-50 p-2 text-base"
    >
      {`Ver lista de ${CATEGORY_TRANSLATIONS[type]}s`}
    </Link>
  </div>
);

export default ArticleNotFound;
