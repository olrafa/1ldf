import { api } from "../lib/api.server";
import { TeamMember } from "../lib/types";

export type TeamMemberReturn = {
  id: number;
  attributes: TeamMember;
};

export const getTeamMembers = async (): Promise<TeamMemberReturn[]> => {
  try {
    const result = await api.get(
      "equipes?sort=id&filters[active][$eq]=true"
    );

    return result.data.data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTeamDescription = async (): Promise<string | null> => {
  try {
    const result = await api.get("description");

    return result.data.data.attributes.teamDescription ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
