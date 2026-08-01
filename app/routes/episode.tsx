import type { Route } from "./+types/episode";
import { data, isRouteErrorResponse } from "react-router";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PieceCard from "../components/episode/PieceCard";
import References from "../components/episode/References";
import Extras from "../components/episode/Extras";
import EpisodeNotFound from "../components/episode/EpisodeNotFound";
import { getEpisode } from "../data/episodes.server";
import { buildJsonLd, buildMeta } from "../lib/meta";

export async function loader({ params }: Route.LoaderArgs) {
  const epNumber = Number(params.id);
  if (!Number.isFinite(epNumber)) {
    throw data(null, { status: 404 });
  }

  const episode = await getEpisode(epNumber);
  if (!episode) {
    throw data(null, { status: 404 });
  }

  return { episode };
}

export function meta({ data: loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return buildMeta({});
  }

  const { name, description, imageLink, date } = loaderData.episode.attributes;

  return [
    ...buildMeta({ title: name, description, imgSrc: imageLink }),
    buildJsonLd({
      "@context": "https://schema.org",
      "@type": "PodcastEpisode",
      name,
      description,
      image: imageLink,
      datePublished: date,
    }),
  ];
}

export default function EpisodeRoute({ loaderData }: Route.ComponentProps) {
  const { attributes: guest } = loaderData.episode;

  const {
    description,
    youtubeLink,
    name,
    book,
    record,
    film,
    references,
    extras,
  } = guest;

  const embedLink = youtubeLink.replace("watch?v=", "embed/");

  const bookData = book?.data?.attributes;
  const recordData = record?.data?.attributes;
  const filmData = film?.data?.attributes;

  const extraContent = extras?.data;

  return (
    <div>
      <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl mb-24">
        <div className="font-titles text-6xl">{name}</div>
        <div className="md:w-3/5">{description}</div>
        <div className="aspect-video w-full md:w-3/5">
          <iframe
            title={name}
            className="w-full h-full content-box"
            src={embedLink}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share: fullscreen"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
        <div className="font-titles mt-8 flex gap-3 items-center">
          <span>Obras mencionadas no episódio</span>
          <FontAwesomeIcon icon={faArrowDown} />
        </div>
        <div className="flex flex-col md:flex-row md:w-4/5 justify-between">
          {bookData && (
            <PieceCard
              type="Livro"
              title={bookData.title}
              author={bookData.creator}
              year={bookData.year}
              imgSrc={bookData.coverImg}
              amazonLink={bookData.link}
            />
          )}
          {recordData && (
            <PieceCard
              type="Disco"
              title={recordData.title}
              author={recordData.creator}
              year={recordData.year}
              imgSrc={recordData.coverImg}
              songWhip={recordData.link}
            />
          )}
          {filmData && (
            <PieceCard
              type="Filme"
              title={filmData.title}
              author={filmData.creator}
              year={filmData.year}
              imgSrc={filmData.coverImg}
              justWatch={filmData.link}
            />
          )}
        </div>
        {!!extraContent?.length && <Extras extras={extraContent} />}
        {references && <References guestRefs={references} />}
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <EpisodeNotFound />;
  }

  throw error;
}
