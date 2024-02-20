import { ReactElement } from "react";
import About from "./About";
import EpisodeCard from "../list/EpisodeCard";
import useGetGuests from "../../hooks/useGetGuests";
import Loader from "../loader";
import useGetArticles from "../../hooks/useGetArticles";
import ArticleCard from "../list/ArticleCard";
import PageHelmet from "../PageHelmet";

const Main = (): ReactElement => {
  const { data: guests = [], isLoading } = useGetGuests();
  const { data: books = [], isLoading: isLoadingBooks } =
    useGetArticles("book");

  const { data: records = [], isLoading: isLoadingRecords } =
    useGetArticles("record");

  const { data: films = [], isLoading: isLoadingFilms } =
    useGetArticles("film");

  if (isLoading || isLoadingBooks || isLoadingRecords || isLoadingFilms) {
    return <Loader />;
  }

  const [latestGuest] = guests;
  const { attributes } = latestGuest;

  const [latestBook] = books;
  const [latestRecord] = records;
  const [latestFilm] = films;

  return (
    <div>
      <PageHelmet />
      <div className="md:mt-4 mb-24 flex flex-col mx-auto md:w-2/3">
        <About />
        {latestGuest && <EpisodeCard guest={attributes} cover={true} />}
        <div className="font-titles text-3xl justify-center mx-4 flex mt-12">Descubra mais dicas da nossa equipe</div>
        {latestBook && (
          <ArticleCard category="book" article={latestBook} cover={true} />
        )}
        {latestRecord && (
          <ArticleCard category="record" article={latestRecord} cover={true} />
        )}
        {latestFilm && (
          <ArticleCard category="film" article={latestFilm} cover={true} />
        )}
      </div>
    </div>
  );
};

export default Main;
