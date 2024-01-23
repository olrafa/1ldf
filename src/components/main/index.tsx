import { ReactElement } from "react";
import About from "./About";
import EpisodeCard from "../list/EpisodeCard";
import { CURRENT_WEEK } from "../../constants";

const Main = (): ReactElement => (
  <div className="md:mt-4 flex flex-col mx-auto md:w-2/3">
    <EpisodeCard week={CURRENT_WEEK} cover={true} />
    <About />
  </div>
);

export default Main;
