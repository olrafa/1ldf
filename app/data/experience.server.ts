import { api } from "../lib/api.server";

export type Experience = {
  title: string;
  description: string;
  imgLink: string;
};

export const getExperience = async (): Promise<Experience | null> => {
  try {
    const result = await api.get("experience");

    return result.data.data.attributes ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
