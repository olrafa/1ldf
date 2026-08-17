import { cachedGet } from "../lib/api.server";
import { ArtResponse, ArticleCategory } from "../lib/types";

export type ArticleReturn = {
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
    author: {
      data: {
        attributes: {
          name: string;
        };
      };
    };
  };
};

export const getArticle = async (
  type: ArticleCategory,
  articleId: number
): Promise<ArticleReturn | null> => {
  try {
    const result = await cachedGet<{ data: ArticleReturn | null }>(
      `${type}s/${articleId}?populate=reference&populate=oneBook&populate=oneRecord&populate=oneFilm&populate=author`
    );

    return result.data ?? null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export type ArticleListReturn = {
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

export const getArticles = async (
  type: ArticleCategory
): Promise<ArticleListReturn[]> => {
  try {
    const result = await cachedGet<{ data: ArticleListReturn[] }>(
      `${type}s?populate=reference&populate=author&sort=id:desc`
    );

    return result.data ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
};
