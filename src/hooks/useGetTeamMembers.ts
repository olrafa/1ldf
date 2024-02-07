import { useQuery } from "@tanstack/react-query";
import { api } from "../constants/api";
import { TeamMember } from "../constants/types";



type TeamMemberReturn = {
  id: number;
  attributes: TeamMember;
};

const getTeamMembers = async (): Promise<TeamMemberReturn[]> => {
  const result = await api.get("equipes");

  return result.data.data;
};

const useGetTeamMembers = () =>
  useQuery({
    queryKey: ["teamMembers"],
    queryFn: getTeamMembers,
    staleTime: 4 * 60 * 60 * 1000,
  });

export default useGetTeamMembers;
