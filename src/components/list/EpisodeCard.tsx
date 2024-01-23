import { ReactElement } from "react";
import { GUESTS_LIST } from "../../constants";

type EpisodeCardProps = {
  week: number;
  cover?: boolean;
};

const EpisodeCard = ({ week, cover }: EpisodeCardProps): ReactElement => {
  const guest = GUESTS_LIST.find(({ week: guestWeek }) => week === guestWeek);

  if (!guest) {
    return <></>;
  }

  const { description, img, name } = guest;

  return (
    <a
      className="mt-4 mx-2 p-5 cursor-pointer text-left text-xl md:text-2xl bg-white text-ldfGrey content-box"
      href={`/episodios/${week}`}
      rel="noreferrer noopener"
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
