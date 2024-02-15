import { ReactElement } from "react";
import useGetExperience from "../../hooks/useGetExperience";
import Loader from "../loader";

const Experience = (): ReactElement => {
  const { data: exp, isLoading } = useGetExperience();

  if (!exp || isLoading) {
    return <Loader />;
  }

  const { title, description, imgLink } = exp;

  return (
    <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl mb-16">
      <div className="font-titles text-6xl">{title}</div>
      <div className="md:w-3/5">{description}</div>
      <img src={imgLink} className="md:w-3/5 content-box-small md:mb-4" />
    </div>
  );
};

export default Experience;
