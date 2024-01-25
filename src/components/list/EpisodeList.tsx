import { ReactElement } from "react";
import { LIST_DESCRIPTION } from "./strings";
import { GUESTS_LIST } from "../../constants/guests";
import EpisodeCard from "./EpisodeCard";

const EpisodeList = (): ReactElement => {
  const sortedGuests = [...GUESTS_LIST].sort((a, b) =>
    a.week > b.week ? -1 : 1
  );

  return (
    <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl mb-4">
      <div className="font-titles text-6xl">Episódios</div>
      <div className="md:w-3/5">{LIST_DESCRIPTION}</div>
      {sortedGuests.map((guest) => (
        <EpisodeCard guest={guest} key={guest.week} />
      ))}
    </div>
  );
};

export default EpisodeList;
