import { ReactElement } from "react";
import About from "./About";
import EpisodeCard from "../list/EpisodeCard";
import { CURRENT_WEEK, GUESTS_LIST } from "../../constants/guests";

const Main = (): ReactElement => {
  const latestGuest = GUESTS_LIST.find(({ week }) => week === CURRENT_WEEK);

  return (
    <div className="md:mt-4 flex flex-col mx-auto md:w-2/3">
      <About />
      {latestGuest && <EpisodeCard guest={latestGuest} cover={true} />}
    </div>
  );
};

export default Main;
