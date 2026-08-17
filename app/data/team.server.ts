import { cachedGet } from "../lib/api.server";
import { TeamMember } from "../lib/types";

export type TeamMemberReturn = {
  id: number;
  attributes: TeamMember;
};

export const getTeamMembers = async (): Promise<TeamMemberReturn[]> => {
  try {
    const result = await cachedGet<{ data: TeamMemberReturn[] }>(
      "equipes?sort=id&filters[active][$eq]=true"
    );

    return result.data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTeamDescription = async (): Promise<string | null> => {
  try {
    const result = await cachedGet<{
      data: { attributes: { teamDescription: string } };
    }>("description");

    return result.data.attributes.teamDescription ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
