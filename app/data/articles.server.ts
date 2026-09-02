import { queryDb, toIso } from "../lib/db.server";
import { ArtReference, ArtResponse, ArticleCategory } from "../lib/types";

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

const TABLE_BY_CATEGORY: Record<ArticleCategory, string> = {
  book: "books",
  record: "records",
  film: "films",
};

type Row = Record<string, unknown>;

const toArtResponse = (row: Row, prefix: string): ArtResponse => {
  const id = row[`${prefix}_id`];

  if (id == null) return { data: null };

  return {
    data: {
      id: id as number,
      attributes: {
        title: row[`${prefix}_title`] as string,
        creator: row[`${prefix}_creator`] as string,
        year: row[`${prefix}_year`] as number,
        coverImg: (row[`${prefix}_cover_img`] as string) ?? undefined,
        link: (row[`${prefix}_link`] as string) ?? undefined,
        category: row[`${prefix}_category`] as ArtReference["category"],
      },
    },
  };
};

const obraSelect = (joinAlias: string, prefix: string) => `
  ${joinAlias}.id AS ${prefix}_id,
  ${joinAlias}.title AS ${prefix}_title,
  ${joinAlias}.creator AS ${prefix}_creator,
  ${joinAlias}.year AS ${prefix}_year,
  ${joinAlias}.cover_img AS ${prefix}_cover_img,
  ${joinAlias}.link AS ${prefix}_link,
  ${joinAlias}.category AS ${prefix}_category`;

export const getArticle = async (
  type: ArticleCategory,
  articleId: number
): Promise<ArticleReturn | null> => {
  try {
    const table = TABLE_BY_CATEGORY[type];
    const fk = `${type}_id`;

    const text = `
      SELECT
        a.id, a.description, a.article,
        a.one_book_comment, a.one_record_comment, a.one_film_comment,
        a.published_at, a.updated_at,
        equipe.name AS author_name,
        ${obraSelect("ref", "reference")},
        ${obraSelect("ob", "one_book")},
        ${obraSelect("orec", "one_record")},
        ${obraSelect("ofilm", "one_film")}
      FROM ${table} a
      LEFT JOIN ${table}_author_links al ON al.${fk} = a.id
      LEFT JOIN equipes equipe ON equipe.id = al.equipe_id
      LEFT JOIN ${table}_reference_links refl ON refl.${fk} = a.id
      LEFT JOIN obras ref ON ref.id = refl.obra_id
      LEFT JOIN ${table}_one_book_links obl ON obl.${fk} = a.id
      LEFT JOIN obras ob ON ob.id = obl.obra_id
      LEFT JOIN ${table}_one_record_links orl ON orl.${fk} = a.id
      LEFT JOIN obras orec ON orec.id = orl.obra_id
      LEFT JOIN ${table}_one_film_links ofl ON ofl.${fk} = a.id
      LEFT JOIN obras ofilm ON ofilm.id = ofl.obra_id
      WHERE a.id = $1 AND a.published_at IS NOT NULL
    `;

    const rows = await queryDb<Row>(`getArticle:${type}:${articleId}`, text, [
      articleId,
    ]);
    const row = rows[0];

    if (!row) return null;

    return {
      id: row.id as number,
      attributes: {
        description: row.description as string,
        article: row.article as string,
        reference: toArtResponse(row, "reference"),
        oneBook: toArtResponse(row, "one_book"),
        oneBookComment: row.one_book_comment as string,
        oneRecord: toArtResponse(row, "one_record"),
        oneRecordComment: row.one_record_comment as string,
        oneFilm: toArtResponse(row, "one_film"),
        oneFilmComment: row.one_film_comment as string,
        publishedAt: toIso(row.published_at),
        updatedAt: toIso(row.updated_at),
        author: { data: { attributes: { name: row.author_name as string } } },
      },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getArticles = async (
  type: ArticleCategory
): Promise<ArticleListReturn[]> => {
  try {
    const table = TABLE_BY_CATEGORY[type];
    const fk = `${type}_id`;

    const text = `
      SELECT
        a.id, a.description, a.published_at,
        equipe.name AS author_name,
        ${obraSelect("ref", "reference")}
      FROM ${table} a
      LEFT JOIN ${table}_author_links al ON al.${fk} = a.id
      LEFT JOIN equipes equipe ON equipe.id = al.equipe_id
      LEFT JOIN ${table}_reference_links refl ON refl.${fk} = a.id
      LEFT JOIN obras ref ON ref.id = refl.obra_id
      WHERE a.published_at IS NOT NULL
      ORDER BY a.id DESC
    `;

    const rows = await queryDb<Row>(`getArticles:${type}`, text);

    return rows.map((row) => ({
      id: row.id as number,
      attributes: {
        description: row.description as string,
        reference: toArtResponse(row, "reference"),
        publishedAt: toIso(row.published_at),
        author: { data: { attributes: { name: row.author_name as string } } },
      },
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
