import { ReactElement } from "react";
import { Guest } from "../../constants/types";

type EpisodeCardProps = {
  guest: Guest;
  cover?: boolean;
};

const EpisodeCard = ({ guest, cover }: EpisodeCardProps): ReactElement => {
  const { description, img, name, week } = guest;

  return (
    <a
      className={`mt-4 mb-4 mx-2 p-5 cursor-pointer text-left text-xl md:text-2xl bg-white text-ldfGrey content-box ${
        !cover && "md:w-3/5"
      }`}
      href={`/episodios/${week}`}
      rel="noopener noreferrer"
    >
      {cover && <p className="font-titles">Episódio mais recente</p>}
      <div className="flex flex-col gap-5 md:flex-row text-left items-center justify-around">
        <div className="mt-4 flex flex-col gap-5">
          <p className="font-titles text-4xl">{name}</p>
          <p className="text-lg">{description}</p>
        </div>
        <img src={img} className="w-72 rounded-xl" />
      </div>
    </a>
  );
};

export default EpisodeCard;
