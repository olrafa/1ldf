import { useQuery } from "@tanstack/react-query";
import { api } from "../constants/api";
import { ArtResponse, ArticleCategory } from "../constants/types";

type ArticleListReturn = {
  id: number;
  attributes: {
    description: string;
    reference: ArtResponse;
    publishedAt: string;
    author: {
      data: {
        attributes: {
          name: string;
        };
      };
    };
  };
};

const getArticles = async (
  type: ArticleCategory
): Promise<ArticleListReturn[]> => {
  const result = await api.get(`${type}s?populate=reference&populate=author`);

  return result.data.data;
};

const useGetArticles = (type: ArticleCategory) =>
  useQuery({
    queryKey: [type],
    queryFn: () => getArticles(type),
    staleTime: 10 * 60 * 1000,
  });

export default useGetArticles;
