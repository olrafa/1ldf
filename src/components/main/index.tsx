import { ReactElement } from "react";
import About from "./About";
import EpisodeCard from "../list/EpisodeCard";
import useGetGuests from "../../hooks/useGetGuests";
import Loader from "../loader";

const Main = (): ReactElement => {
  const { data: guests = [], isLoading } = useGetGuests();

  if (isLoading) {
    return <Loader />;
  }

  const [latestGuest] = guests;

  const { attributes } = latestGuest;

  return (
    <div className="md:mt-4 mb-4 flex flex-col mx-auto md:w-2/3">
      <About />
      {latestGuest && <EpisodeCard guest={attributes} cover={true} />}
    </div>
  );
};

export default Main;
