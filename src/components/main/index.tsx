import { ReactElement } from "react";
import About from "./About";
import EpisodeCard from "../list/EpisodeCard";
import useGetGuests from "../../hooks/useGetGuests";
import Loader from "../loader";
import useGetArticles from "../../hooks/useGetArticles";
import ArticleCard from "../list/ArticleCard";
import PageHelmet from "../PageHelmet";
import MediumComponent from "../medium";

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
  const lastThreeGuests = guests.slice(0, 3);

  const [latestBook] = books;
  const [latestRecord] = records;
  const [latestFilm] = films;

  return (
    <div>
      <PageHelmet />
      <div className="md:mt-4 mb-24 flex flex-col items-center mx-auto md:w-2/3">
        <About />
        <div className="font-titles text-3xl mx-4 justify-center flex mt-12 mb-10 bg-white text-ldfGrey content-box-small w-fit p-4">
          Últimos episódios
        </div>
        <div className="flex flex-col items-center gap-5 text-center justify-center text-xl mb-8">
          {lastThreeGuests.map((guest) => (
            <EpisodeCard guest={guest.attributes} key={guest.id} cover={true} />
          ))}
        </div>
        <a
          href="/episodios"
          className="font-titles justify-center text-ldfGreen text-3xl flex mx-4"
        >
          Veja a lista completa aqui
        </a>
        {/* <MediumComponent /> */}
        <div className="font-titles text-3xl mx-4 flex mt-12 mb-4 bg-white text-ldfGrey content-box-small w-fit p-4">
          Descubra mais dicas da nossa equipe
        </div>
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
