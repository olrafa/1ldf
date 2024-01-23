import { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { GUESTS_LIST } from "../../constants";
import PieceCard from "./PieceCard";

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
      <div className="aspect-w-16 aspect-h-9 w-full md:aspect-w-16 md:aspect-h-9 md:w-3/4">
        <iframe className="w-full h-full"
          src={youTube}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share: fullscreen"
          loading="lazy"
          allowFullScreen
        ></iframe>
      </div>
      <div className="font-titles text-5xl">As escolhas</div>
      <PieceCard
        type="Livro"
        title={book.title}
        author={book.author}
        year={book.year}
        imgSrc={book.cover}
      />
      <PieceCard
        type="Disco"
        title={record.title}
        author={record.artist}
        year={record.year}
        imgSrc={record.cover}
      />
      <PieceCard
        type="Filme"
        title={film.title}
        author={film.director}
        year={film.year}
        imgSrc={film.poster}
      />
    </div>
  );
};

export default Episode;
