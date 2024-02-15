import { ReactElement } from "react";
import { LIST_DESCRIPTION } from "./strings";
import EpisodeCard from "./EpisodeCard";
import useGetGuests from "../../hooks/useGetGuests";
import Loader from "../loader";

const EpisodeList = (): ReactElement => {
  const { data: guests = [], isLoading } = useGetGuests();

  const guestData = guests.map(({ attributes }) => attributes);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl mb-16">
      <div className="font-titles text-6xl">Episódios</div>
      <div className="md:w-3/5">{LIST_DESCRIPTION}</div>
      {guestData.map((guest) => (
        <EpisodeCard guest={guest} key={guest.epNumber} />
      ))}
    </div>
  );
};

export default EpisodeList;
