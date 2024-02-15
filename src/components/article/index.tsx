import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";
import { ArticleCategory } from "../../constants/types";
import { useLocation } from "react-router-dom";
import useGetArticle from "../../hooks/useGetArticle";
import Loader from "../loader";
import ArticleNotFound from "./ArticleNotFound";
import Markdown from "react-markdown";
import { faAmazon } from "@fortawesome/free-brands-svg-icons";
import { getLinkString } from "./util";
import { CATEGORY_ICONS } from "../../constants/util";

type ArticleProps = {
  type: ArticleCategory;
};

const Article = ({ type }: ArticleProps): ReactElement => {
  const { pathname } = useLocation();
  const articleNumber = pathname.split("/")[2];

  const { data: articleData, isLoading } = useGetArticle(
    type,
    parseInt(articleNumber)
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!articleData) {
    return <ArticleNotFound type={type} />;
  }

  console.log(articleData);

  const { attributes } = articleData;
  const {
    article,
    description,
    reference,
    oneBook,
    oneRecord,
    oneFilm,
    publishedAt,
    oneBookComment,
    oneRecordComment,
    oneFilmComment,
  } = attributes;

  const {
    data: { attributes: refAttributes },
  } = reference;

  console.log(refAttributes);

  const { title, creator, link, coverImg, year } = refAttributes;

  const publishDate = new Date(publishedAt).toLocaleString("pt-BR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "numeric",
    hour12: false,
  });

  const {
    data: { attributes: bookAttributes },
  } = oneBook;

  const {
    title: bookTitle,
    creator: bookCreator,
    link: bookLink,
    year: bookYear,
  } = bookAttributes;

  const {
    data: { attributes: recordAttributes },
  } = oneRecord;

  const {
    title: recordTitle,
    creator: recordCreator,
    link: recordLink,
    year: recordYear,
  } = recordAttributes;

  const {
    data: { attributes: filmAttributes },
  } = oneFilm;

  const {
    title: filmTitle,
    creator: filmCreator,
    link: filmLink,
    year: filmYear,
  } = filmAttributes;

  return (
    <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl mb-16">
      <div className="flex md:w-3/5 mb-4 flex-col md:flex-row">
        <img
          className="m-auto md:m-0 max-h-80 w-fit content-box-small"
          src={coverImg}
        />
        <div className="md:ml-12 mt-8 md:mt-0 text-left">
          <div className="font-titles text-6xl">{title}</div>
          <div className="font-bold mb-4">
            {creator}, <span>{year}</span>
          </div>
          <div className="mb-4 text-lg">{description}</div>
          <p className="text-base mt-4">
            Por {attributes.author.data.attributes.name}
          </p>
          <p className="text-base">
            Publicado em <span>{publishDate}</span>
          </p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm p-2 items-center w-fit flex flex-row gap-2 bg-slate-50 mt-4"
          >
            {type === "book" && <FontAwesomeIcon icon={faAmazon} />}
            <span>{getLinkString(type)}</span>
          </a>
        </div>
      </div>

      <div className="md:w-3/5 whitespace-pre-line text-left text-base">
        <Markdown>{article}</Markdown>
      </div>
      <div className="font-titles mt-8 flex gap-3 items-center">
        <p>
          <span className="font-bold">1 LIVRO, 1 DISCO, 1 FILME</span> que
          dialogam com <span className="font-bold">{title}</span>
        </p>
        <FontAwesomeIcon icon={faArrowDown} />
      </div>
      <div className="text-left md:w-3/5 text-base">
        <a
          href={bookLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-50 items-center flex flex-row justify-between p-2 border-b hover:bg-slate-700 hover:text-slate-100 border-b-gray-600"
        >
          <div className="font-bold text-left">
            {bookTitle}
            {", "}
            <span className="font-normal">{bookCreator}</span>{" "}
            <span className="font-normal">({bookYear})</span>
          </div>
          <div className="md:w-[3%]">
            <FontAwesomeIcon icon={CATEGORY_ICONS.book} />
          </div>
        </a>
        <div className="mt-4">{oneBookComment}</div>
      </div>
      <div className="text-left md:w-3/5 text-base">
        <a
          href={recordLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-50 items-center flex flex-row justify-between p-2 border-b hover:bg-slate-700 hover:text-slate-100 border-b-gray-600"
        >
          <div className="font-bold text-left">
            {recordTitle}
            {", "}
            <span className="font-normal">{recordCreator}</span>{" "}
            <span className="font-normal">({recordYear})</span>
          </div>
          <div className="md:w-[3%]">
            <FontAwesomeIcon icon={CATEGORY_ICONS.record} />
          </div>
        </a>
        <div className="mt-4">{oneRecordComment}</div>
      </div>
      <div className="text-left md:w-3/5 text-base">
        <a
          href={filmLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-50 items-center flex flex-row justify-between p-2 border-b hover:bg-slate-700 hover:text-slate-100 border-b-gray-600"
        >
          <div className="font-bold text-left">
            {filmTitle}
            {", "}
            <span className="font-normal">{filmCreator}</span>{" "}
            <span className="font-normal">({filmYear})</span>
          </div>
          <div className="md:w-[3%]">
            <FontAwesomeIcon icon={CATEGORY_ICONS.film} />
          </div>
        </a>
        <div className="mt-4">{oneFilmComment}</div>
      </div>
    </div>
  );
};

export default Article;
