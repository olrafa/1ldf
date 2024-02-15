import { ReactElement } from "react";
import { LIST_DESCRIPTION } from "./strings";
import EpisodeCard from "./EpisodeCard";
import useGetGuests from "../../hooks/useGetGuests";
import Loader from "../loader";
import PageHelmet from "../PageHelmet";

const EpisodeList = (): ReactElement => {
  const { data: guests = [], isLoading } = useGetGuests();

  const guestData = guests.map(({ attributes }) => attributes);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <PageHelmet title="Episódios" description={LIST_DESCRIPTION} />
      <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl mb-24">
        <div className="font-titles text-6xl">Episódios</div>
        <div className="md:w-3/5">{LIST_DESCRIPTION}</div>
        {guestData.map((guest) => (
          <EpisodeCard guest={guest} key={guest.epNumber} />
        ))}
      </div>
    </div>
  );
};

export default EpisodeList;
