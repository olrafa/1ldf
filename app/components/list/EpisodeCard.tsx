import { ReactElement } from "react";
import { Link } from "react-router";
import { Guest } from "../../lib/types";
import { formatDate, personAlt } from "../../lib/util";

type EpisodeCardProps = {
  guest: Guest;
  cover?: boolean;
};

const EpisodeCard = ({ guest, cover }: EpisodeCardProps): ReactElement => {
  const { description, imageLink, name, epNumber, date } = guest;

  return (
    <Link
      className={`my-2 mx-3 p-5 cursor-pointer text-left text-xl md:text-2xl bg-white text-ldfGrey content-box-small ${
        !cover && "md:w-3/5"
      }`}
      to={`/episodios/${epNumber}`}
    >
      <div className="flex flex-col gap-5 md:flex-row text-left items-center justify-around">
        <div className="mt-4 flex flex-col gap-5">
          <p className="font-titles text-4xl">{name}</p>
          <p className="text-lg">{description}</p>
          <p className="text-base">{formatDate(date)}</p>
        </div>
        <img
          src={imageLink}
          className="w-72 rounded"
          alt={personAlt(name)}
          loading="lazy"
        />
      </div>
    </Link>
  );
};

export default EpisodeCard;
