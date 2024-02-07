import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api } from "../constants/api";

type DescriptionReturn = {
  data: {
    data: {
      id: number;
      attributes: {
        teamDescription: string;
      };
    };
  };
};

const getTeamDescription = async (): Promise<string> => {
  const result: DescriptionReturn = await api.get("description");
  return result.data.data.attributes.teamDescription;
};

const useGetTeamDescription = (): UseQueryResult<string, Error> =>
  useQuery({
    queryKey: ["teamDescription"],
    queryFn: () => getTeamDescription(),
    staleTime: 4 * 60 * 60 * 1000,
  });

export default useGetTeamDescription;
