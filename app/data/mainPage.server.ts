import { queryDb } from "../lib/db.server";

export type MainPageDescription = {
  description: string;
};

export const getMainPageDescription =
  async (): Promise<MainPageDescription | null> => {
    try {
      const rows = await queryDb<Record<string, unknown>>(
        "getMainPageDescription",
        `SELECT description FROM main_page_descriptions
         WHERE published_at IS NOT NULL LIMIT 1`
      );
      const row = rows[0];

      if (!row) return null;

      return { description: row.description as string };
    } catch (error) {
      console.error(error);
      return null;
    }
  };
