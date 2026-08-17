import { cachedGet } from "../lib/api.server";

export type Experience = {
  title: string;
  description: string;
  imgLink: string;
};

export const getExperience = async (): Promise<Experience | null> => {
  try {
    const result = await cachedGet<{ data: { attributes: Experience } }>(
      "experience"
    );

    return result.data.attributes ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
