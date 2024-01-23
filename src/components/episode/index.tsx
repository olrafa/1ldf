import { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { GUESTS_LIST } from "../../constants";
import PieceCard from "./PieceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

const Episode = (): ReactElement => {
  const { pathname } = useLocation();
  const episode = pathname.split("/")[2];

  const guestWeek = parseInt(episode);

  const guest = GUESTS_LIST.find(({ week }) => week === guestWeek);

  if (!guest) {
    return <></>;
  }

  const { description, youTube, name, book, record, film } = guest;

  return (
    <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl">
      <div className="font-titles text-6xl">{name}</div>
      <div className="md:w-3/5">{description}</div>
      <div className="aspect-video w-full md:w-3/5">
        <iframe
          className="w-full h-full content-box"
          src={youTube}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share: fullscreen"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
      <div className="font-titles mt-8 flex gap-3 items-center"><span>Obras mencionadas no episódio</span><FontAwesomeIcon icon={faArrowDown}/></div>
      <div className="font-titles text-5xl mt-4">As escolhas</div>
      <div className="flex flex-col md:flex-row md:w-4/5 justify-between">
        <PieceCard
          type="Livro"
          title={book.title}
          author={book.author}
          year={book.year}
          imgSrc={book.cover}
          amazonLink={book.amazonLink}
        />
        <PieceCard
          type="Disco"
          title={record.title}
          author={record.artist}
          year={record.year}
          imgSrc={record.cover}
          songWhip={record.songWhip}
        />
        <PieceCard
          type="Filme"
          title={film.title}
          author={film.director}
          year={film.year}
          imgSrc={film.poster}
          justWatch={film.justWatch}
        />
      </div>
    </div>
  );
};

export default Episode;
