import { ReactElement } from "react";
import profile from "../../assets/profile.jpg";
import About from "./About";
import EpisodeCard from "../list/EpisodeCard";
import { CURRENT_WEEK } from "../../constants";

const Main = (): ReactElement => (
  <>
    <div className="flex flex-col md:flex-row items-center gap-5 p-5 border-4 border-ldfPink text-left justify-center text-2xl md:text-4xl">
      <img src={profile} />
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </div>
    <About />
    <EpisodeCard week={CURRENT_WEEK} cover={true} />
  </>
);

export default Main;
