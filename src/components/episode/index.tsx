import { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { GUESTS_LIST } from "../../constants";

const Episode = (): ReactElement => {
  const { pathname } = useLocation();
  const episode = pathname.split("/")[2];

  const guestWeek = parseInt(episode);

  const guest = GUESTS_LIST.find(({ week }) => week === guestWeek);

  if (!guest) {
    return <></>;
  }

  const { descriptionLong, youTube, name, book, record, film } = guest;

  return (
    <div>
      <div>{name}</div>
      <div>{descriptionLong}</div>
      <iframe
        width="624"
        height="351"
        src={youTube}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        loading="lazy"
      ></iframe>
      <div>{`As escolhas de ${name}`}</div>
      <div>
        <div>{book.title}</div>
        <div>{book.author}</div>
        {book.cover && <img src={book.cover} />}
      </div>
      <div>
        <div>{film.title}</div>
        <div>{film.director}</div>
        {film.poster && <img src={film.poster} />}
      </div>
      <div>
        <div>{record.title}</div>
        <div>{record.artist}</div>
        {record.cover && <img src={record.cover} />}
      </div>

    </div>
  );
};

export default Episode;
