import { ReactElement } from "react";
import profile from "../../assets/profile.jpg";
import About from "./About";
import Latest from "./Latest";

const Main = (): ReactElement => (
  <>
    <div className="flex flex-col md:flex-row items-center gap-5 p-5 text-ldfGrey border-4 border-ldfPink text-left justify-center text-2xl md:text-4xl">
      <img src={profile} />
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </div>
    <About />
    <Latest />
  </>
);

export default Main;
