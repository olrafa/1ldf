import { cachedGet } from "../lib/api.server";
import { Guest } from "../lib/types";

export type GuestReturn = {
  id: number;
  attributes: Guest;
};

export const getEpisode = async (
  epNumber: number
): Promise<GuestReturn | null> => {
  try {
    const result = await cachedGet<{ data: GuestReturn | null }>(
      `convidados/${epNumber}?populate=book&populate=film&populate=record&populate=references&populate=extras`
    );

    return result.data ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getGuests = async (): Promise<GuestReturn[]> => {
  try {
    const result = await cachedGet<{ data: GuestReturn[] }>(
      "convidados?sort=epNumber:desc"
    );

    return result.data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
