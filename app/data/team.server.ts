import { queryDb } from "../lib/db.server";
import { TeamMember } from "../lib/types";

export type TeamMemberReturn = {
  id: number;
  attributes: TeamMember;
};

export const getTeamMembers = async (): Promise<TeamMemberReturn[]> => {
  try {
    const rows = await queryDb<Record<string, unknown>>(
      "getTeamMembers",
      `SELECT id, name, description, img_link, socials, active FROM equipes
       WHERE published_at IS NOT NULL AND active = true
       ORDER BY id`
    );

    return rows.map((row) => ({
      id: row.id as number,
      attributes: {
        name: row.name as string,
        description: row.description as string,
        imgLink: row.img_link as string,
        socials: (row.socials as string) ?? null,
        active: row.active as boolean,
      },
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getTeamDescription = async (): Promise<string | null> => {
  try {
    const rows = await queryDb<Record<string, unknown>>(
      "getTeamDescription",
      `SELECT team_description FROM descriptions
       WHERE published_at IS NOT NULL LIMIT 1`
    );
    const row = rows[0];

    return (row?.team_description as string) ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
