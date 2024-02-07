import { ReactElement } from "react";
import useGetTeamDescription from "../../hooks/useGetTeamDescription";
import Loader from "../loader";
import useGetTeamMembers from "../../hooks/useGetTeamMembers";
import TeamMemberCard from "./TeamMemberCard";

const Team = (): ReactElement => {
  const { data: description, isLoading: isLoadingDescription } =
    useGetTeamDescription();

  const { data: teamMembers = [], isLoading: isLoadingTeamMembers } =
    useGetTeamMembers();

  console.log("description", description);

  if (!description || isLoadingDescription || isLoadingTeamMembers) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center gap-5 p-6 text-center justify-center text-xl">
      <div className="font-titles text-6xl">Equipe</div>
      <div className="md:w-3/5">{description}</div>
      {teamMembers.map(({ attributes }) => (
        <TeamMemberCard teamMember={attributes} />
      ))}
    </div>
  );
};

export default Team;
