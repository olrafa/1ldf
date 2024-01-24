import { ReactElement } from "react";
import About from "./About";
import EpisodeCard from "../list/EpisodeCard";
import { CURRENT_WEEK } from "../../constants/guests";

const Main = (): ReactElement => (
  <div className="md:mt-4 flex flex-col mx-auto md:w-2/3">
    <About />
    <EpisodeCard week={CURRENT_WEEK} cover={true} />
  </div>
);

export default Main;
