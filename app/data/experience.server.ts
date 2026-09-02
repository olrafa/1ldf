import { queryDb } from "../lib/db.server";

export type Experience = {
  title: string;
  description: string;
  imgLink: string;
};

export const getExperience = async (): Promise<Experience | null> => {
  try {
    const rows = await queryDb<Record<string, unknown>>(
      "getExperience",
      `SELECT title, description, img_link FROM experiences
       WHERE published_at IS NOT NULL LIMIT 1`
    );
    const row = rows[0];

    if (!row) return null;

    return {
      title: row.title as string,
      description: row.description as string,
      imgLink: row.img_link as string,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
