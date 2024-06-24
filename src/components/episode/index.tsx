import { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import PieceCard from "./PieceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import References from "./References";
import useGetEpisode from "../../hooks/useGetEpisode";
import Loader from "../loader";
import EpisodeNotFound from "./EpisodeNotFound";
import PageHelmet from "../PageHelmet";
import Extras from "./Extras";

const Episode = (): ReactElement => {
  const { pathname } = useLocation();
  const episode = pathname.split("/")[2];

  const guestWeek = parseInt(episode);

  const { data, isLoading } = useGetEpisode(guestWeek);

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <EpisodeNotFound />;
  }

  const { attributes: guest } = data;

  const {
    description,
    youtubeLink,
    name,
    book,
    record,
    film,
    references,
    imageLink,
    extras,
  } = guest;

  const embedLink = youtubeLink.replace("watch?v=", "embed/");

  const bookData = book?.data?.attributes;
  const recordData = record?.data?.attributes;
  const filmData = film?.data?.attributes;

  const extraContent = extras?.data;

  return (
    <div>
      <PageHelmet title={name} description={description} imgSrc={imageLink} />
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
};

export default Episode;
