import type { Route } from "./+types/main";
import { Link } from "react-router";
import About from "../components/main/About";
import EpisodeCard from "../components/list/EpisodeCard";
import ArticleCard from "../components/list/ArticleCard";
import MediumSection from "../components/medium/MediumSection";
import { getMainPageDescription } from "../data/mainPage.server";
import { getGuests } from "../data/episodes.server";
import { getArticles } from "../data/articles.server";
import { getMediumPosts } from "../data/medium.server";
import { buildMeta } from "../lib/meta";

export async function loader() {
  const [mainPageDescription, guests, books, records, films, mediumPosts] =
    await Promise.all([
      getMainPageDescription(),
      getGuests(),
      getArticles("book"),
      getArticles("record"),
      getArticles("film"),
      getMediumPosts(),
    ]);

  return { mainPageDescription, guests, books, records, films, mediumPosts };
}

export function meta() {
  return buildMeta({});
}

export default function MainRoute({ loaderData }: Route.ComponentProps) {
  const { mainPageDescription, guests, books, records, films, mediumPosts } =
    loaderData;

  const lastThreeGuests = guests.slice(0, 3);

  const [latestBook] = books;
  const [latestRecord] = records;
  const [latestFilm] = films;

  return (
    <div>
      <div className="md:mt-4 mb-24 flex flex-col items-center mx-auto md:w-4/5 lg:w-2/3 w-full">
        <About description={mainPageDescription?.description ?? ""} />
        <div className="font-titles text-3xl mx-4 justify-center flex mt-12 mb-10 bg-white text-ldfGrey content-box-small w-fit p-4">
          Últimos episódios
        </div>
        <div className="flex flex-col items-center gap-5 text-center justify-center text-xl mb-8">
          {lastThreeGuests.map((guest) => (
            <EpisodeCard guest={guest.attributes} key={guest.id} cover={true} />
          ))}
        </div>
        <Link
          to="/episodios"
          className="font-titles justify-center text-ldfGreen text-3xl flex mx-4"
        >
          Veja a lista completa aqui
        </Link>
        <MediumSection items={mediumPosts} />
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
}
