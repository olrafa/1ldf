import { useQuery } from "@tanstack/react-query";
import { api } from "../constants/api";
import { ArtResponse, ArticleCategory } from "../constants/types";

type ArticleReturn = {
  id: number;
  attributes: {
    description: string;
    article: string;
    reference: ArtResponse;
    oneBook: ArtResponse;
    oneBookComment: string;
    oneRecord: ArtResponse;
    oneRecordComment: string;
    oneFilm: ArtResponse;
    oneFilmComment: string;
    publishedAt: string;
    updatedAt: string;
  };
};

const getArticle = async (
  type: ArticleCategory,
  articleId: number
): Promise<ArticleReturn> => {
  const result = await api.get(
    `${type}s/${articleId}?populate=reference&populate=oneBook&populate=oneRecord&populate=oneFilm`
  );

  return result.data.data;
};

const useGetArticle = (type: ArticleCategory, articleId: number) =>
  useQuery({
    queryKey: [type, articleId],
    queryFn: () => getArticle(type, articleId),
    staleTime: 4 * 60 * 60 * 1000,
  });

export default useGetArticle;
