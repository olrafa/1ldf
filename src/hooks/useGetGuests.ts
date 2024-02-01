import { useQuery } from "@tanstack/react-query";
import { api } from "../constants/api";
import { Guest } from "../constants/types";

type GuestsReturn = {
  id: number;
  attributes: Guest;
};

const getGuests = async (): Promise<GuestsReturn[]> => {
  const result = await api.get("convidados?sort=epNumber:desc");

  return result.data.data;
};

const useGetGuests = () =>
  useQuery({
    queryKey: ["guests"],
    queryFn: getGuests,
    staleTime: 60 * 60 * 1000,
  });

export default useGetGuests;
