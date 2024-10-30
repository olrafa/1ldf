import { ReactElement } from "react";
import profile from "../../assets/profile.jpg";
import useGetMainPageDescription from "../../hooks/useGetMainPageDescription";
import Loader from "../loader";

const About = (): ReactElement => {
  const { data, isLoading } = useGetMainPageDescription();

  if (isLoading || !data) {
    return <Loader />;
  }

  const { description } = data;

  return (
    <div className="mt-4 mx-2 p-5 items-center text-left md:text-lg text-white md:flex-row flex-col flex gap-8 md:gap-12 whitespace-pre-line">
      <img src={profile} loading="lazy"/>
      <div>{description}</div>
    </div>
  );
};

export default About;
