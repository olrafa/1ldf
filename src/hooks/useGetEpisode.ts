import { useQuery } from "@tanstack/react-query";
import { api } from "../constants/api";
import { Guest } from "../constants/types";

type GuestsReturn = {
  id: number;
  attributes: Guest;
};

const getEpisode = async (epNumber: number): Promise<GuestsReturn> => {
  const result = await api.get(
    `convidados/${epNumber}?populate=book&populate=film&populate=record&populate=references`
  );

  return result.data.data;
};

const useGetEpisode = (epNumber: number) =>
  useQuery({
    queryKey: ["episode", epNumber],
    queryFn: () => getEpisode(epNumber),
    staleTime: 4 * 60 * 60 * 1000,
  });

export default useGetEpisode;
