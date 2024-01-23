import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { GUESTS_LIST } from "../../constants";

type EpisodeCardProps = {
  week: number;
  cover?: boolean;
};

const EpisodeCard = ({ week, cover }: EpisodeCardProps): ReactElement => {
  const navigate = useNavigate();

  const guest = GUESTS_LIST.find(({ week: guestWeek }) => week === guestWeek);

  if (!guest) {
    return <></>;
  }

  const { description, img, name } = guest;

  return (
    <div
      className="mt-4 mx-2 p-5 border-4 border-ldfRed cursor-pointer text-left text-xl md:text-2xl"
      onClick={() => navigate(`/episodios/${week}`)}
    >
      {cover && <p className="font-titles">Episódio mais recente</p>}
      <div className="flex flex-col gap-5 md:flex-row text-left items-center justify-around">
        <div className="mt-4 flex flex-col gap-5">
          <p className="font-titles text-4xl">{name}</p>
          <p className="text-lg">{description}</p>
        </div>
        <img src={img} className="w-96" />
      </div>
    </div>
  );
};

export default EpisodeCard;
