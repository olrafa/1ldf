import { ReactElement } from "react";
import useGetTeamDescription from "../../hooks/useGetTeamDescription";
import Loader from "../loader";

const Team = (): ReactElement => {
  const { data: description, isLoading: isLoadingDescription } =
    useGetTeamDescription();

  console.log("description", description);

  if (!description || isLoadingDescription) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl">
      <div className="font-titles text-6xl">Equipe</div>
      <div className="md:w-3/5">
        {description}
      </div>
    </div>
  );
};

export default Team;
