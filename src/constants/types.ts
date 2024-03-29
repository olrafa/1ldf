export type Book = {
  title: string;
  author: string;
  year: number;
  cover?: string;
  amazonLink?: string;
};

export type Film = {
  title: string;
  director: string;
  year: number;
  poster?: string;
  justWatch?: string;
};

export type Record = {
  title: string;
  artist: string;
  year: number;
  cover?: string;
  songWhip?: string;
};

export type ArtReference = {
  title: string;
  creator: string;
  year: number;
  coverImg?: string;
  link?: string;
  category: Category;
};

type ArtObject = {
  id: number;
  attributes: ArtReference;
};

export type ArtResponse = {
  data: ArtObject;
};

export type ArtResponseArray = {
  data: ArtObject[];
};

export type Guest = {
  epNumber: number;
  name: string;
  description: string;
  youtubeLink: string;
  imageLink: string;
  book: ArtResponse;
  record: ArtResponse;
  film: ArtResponse;
  references: ArtResponseArray;
};

export type ArticleCategory = "book" | "record" | "film";

type Category =
  | "book"
  | "record"
  | "film"
  | "song"
  | "video"
  | "series"
  | "print"
  | "podcast";

export type TeamMember = {
  name: string;
  description: string;
  imgLink: string;
  socials: string | null;
};
