import { api } from "../lib/api.server";

export type MainPageDescription = {
  description: string;
};

export const getMainPageDescription = async (): Promise<MainPageDescription | null> => {
  try {
    const result = await api.get("main-page-description");

    return result.data.data.attributes ?? null;
  } catch {
    return null;
  }
};
