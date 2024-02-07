import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api } from "../constants/api";

type Exp = {
  title: string;
  description: string;
  imgLink: string;
};

type ExperienceReturn = {
  data: {
    data: {
      id: number;
      attributes: Exp
    };
  };
};

const getExperience = async (): Promise<Exp> => {
  const result: ExperienceReturn = await api.get("experience");
  return result.data.data.attributes;
};

const useGetExperience = (): UseQueryResult<Exp, Error> =>
  useQuery({
    queryKey: ["experience"],
    queryFn: () => getExperience(),
    staleTime: 4 * 60 * 60 * 1000,
  });

export default useGetExperience;
