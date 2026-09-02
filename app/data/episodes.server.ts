import { queryDb, toIso } from "../lib/db.server";
import { ArtReference, ArtResponse, Guest } from "../lib/types";

export type GuestReturn = {
  id: number;
  attributes: Guest;
};

type Row = Record<string, unknown>;
type ReferenceArray = NonNullable<Guest["references"]>["data"];
type ExtraArray = NonNullable<Guest["extras"]>["data"];

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

export const getEpisode = async (
  epNumber: number
): Promise<GuestReturn | null> => {
  try {
    const text = `
      SELECT
        c.id, c.name, c.description, c.youtube_link, c.image_link, c.date, c.ep_number,
        ${obraSelect("book", "book")},
        ${obraSelect("film", "film")},
        ${obraSelect("record_obra", "record")},
        refs.data AS references_data,
        extras.data AS extras_data
      FROM convidados c
      LEFT JOIN convidados_book_links cbl ON cbl.convidado_id = c.id
      LEFT JOIN obras book ON book.id = cbl.obra_id
      LEFT JOIN convidados_film_links cfl ON cfl.convidado_id = c.id
      LEFT JOIN obras film ON film.id = cfl.obra_id
      LEFT JOIN convidados_record_links crl ON crl.convidado_id = c.id
      LEFT JOIN obras record_obra ON record_obra.id = crl.obra_id
      LEFT JOIN LATERAL (
        SELECT json_agg(
          json_build_object(
            'id', o.id,
            'attributes', json_build_object(
              'title', o.title, 'creator', o.creator, 'year', o.year,
              'coverImg', o.cover_img, 'link', o.link, 'category', o.category
            )
          ) ORDER BY crefl.obra_order
        ) AS data
        FROM convidados_references_links crefl
        JOIN obras o ON o.id = crefl.obra_id
        WHERE crefl.convidado_id = c.id
      ) refs ON true
      LEFT JOIN LATERAL (
        SELECT json_agg(
          json_build_object(
            'id', e.id,
            'attributes', json_build_object('description', e.description, 'url', e.url)
          ) ORDER BY cel.extra_order
        ) AS data
        FROM convidados_extras_links cel
        JOIN extras e ON e.id = cel.extra_id
        WHERE cel.convidado_id = c.id
      ) extras ON true
      WHERE c.id = $1 AND c.published_at IS NOT NULL
    `;

    // Matches the current behavior of querying Strapi's find-by-id endpoint
    // with epNumber as the path param, i.e. it relies on id === epNumber.
    const rows = await queryDb<Row>(`getEpisode:${epNumber}`, text, [
      epNumber,
    ]);
    const row = rows[0];

    if (!row) return null;

    return {
      id: row.id as number,
      attributes: {
        epNumber: row.ep_number as number,
        name: row.name as string,
        description: row.description as string,
        youtubeLink: row.youtube_link as string,
        imageLink: row.image_link as string,
        date: toIso(row.date),
        book: toArtResponse(row, "book"),
        film: toArtResponse(row, "film"),
        record: toArtResponse(row, "record"),
        references: { data: (row.references_data as ReferenceArray | null) ?? [] },
        extras: { data: (row.extras_data as ExtraArray | null) ?? [] },
      },
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getGuests = async (): Promise<GuestReturn[]> => {
  try {
    const text = `
      SELECT id, name, description, youtube_link, image_link, date, ep_number
      FROM convidados
      WHERE published_at IS NOT NULL
      ORDER BY ep_number DESC
    `;

    const rows = await queryDb<Row>("getGuests", text);

    return rows.map((row) => ({
      id: row.id as number,
      attributes: {
        epNumber: row.ep_number as number,
        name: row.name as string,
        description: row.description as string,
        youtubeLink: row.youtube_link as string,
        imageLink: row.image_link as string,
        date: toIso(row.date),
      },
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
