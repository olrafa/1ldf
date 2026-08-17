import { cachedGet } from "../lib/api.server";

export type MainPageDescription = {
  description: string;
};

export const getMainPageDescription = async (): Promise<MainPageDescription | null> => {
  try {
    const result = await cachedGet<{
      data: { attributes: MainPageDescription };
    }>("main-page-description");

    return result.data.attributes ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
