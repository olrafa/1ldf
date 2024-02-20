import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { api } from "../constants/api";

type Description = {
  description: string;
};

type mainPageDescriptionReturn = {
  data: {
    data: {
      id: number;
      attributes: Description;
    };
  };
};

const getMainPageDescription = async (): Promise<Description> => {
  const result: mainPageDescriptionReturn = await api.get("main-page-description");
  return result.data.data.attributes;
};

const useGetMainPageDescription = (): UseQueryResult<Description, Error> =>
  useQuery({
    queryKey: ["mainPageDescription"],
    queryFn: () => getMainPageDescription(),
    staleTime: 4 * 60 * 60 * 1000,
  });

export default useGetMainPageDescription;
