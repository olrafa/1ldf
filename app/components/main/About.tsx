import { ReactElement } from "react";
import profile from "../../assets/profile.jpg";

type AboutProps = {
  description: string;
};

const About = ({ description }: AboutProps): ReactElement => (
  <div className="mt-4 mx-2 p-5 items-center text-left md:text-lg text-white md:flex-row flex-col flex gap-8 md:gap-12 whitespace-pre-line">
    <img src={profile} loading="lazy" />
    <div>{description}</div>
  </div>
);

export default About;
