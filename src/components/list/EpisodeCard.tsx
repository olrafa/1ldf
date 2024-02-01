import { ReactElement } from "react";
import { Guest } from "../../constants/types";

type EpisodeCardProps = {
  guest: Guest;
  cover?: boolean;
};

const EpisodeCard = ({ guest, cover }: EpisodeCardProps): ReactElement => {
  const { description, imageLink, name, epNumber } = guest;

  return (
    <a
      className={`my-4 md:mx-2 mx-4 p-5 cursor-pointer text-left text-xl md:text-2xl bg-white text-ldfGrey content-box-small ${
        !cover && "md:w-3/5"
      }`}
      href={`/episodios/${epNumber}`}
      rel="noopener noreferrer"
    >
      {cover && <p className="font-titles">Episódio mais recente</p>}
      <div className="flex flex-col gap-5 md:flex-row text-left items-center justify-around">
        <div className="mt-4 flex flex-col gap-5">
          <p className="font-titles text-4xl">{name}</p>
          <p className="text-lg">{description}</p>
        </div>
        <img src={imageLink} className="w-72 rounded" />
      </div>
    </a>
  );
};

export default EpisodeCard;
