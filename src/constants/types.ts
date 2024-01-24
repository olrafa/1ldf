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

export type Guest = {
  week: number;
  name: string;
  description: string;
  youTube: string;
  img: string;
  book: Book;
  record: Record;
  film: Film;
  otherReferences?: Array<Book | Record | Film>;
};

type Category =
  | "Book"
  | "Record"
  | "Film"
  | "Song"
  | "Video"
  | "Series"
  | "Print";

export type Reference = {
  title: string;
  author: string;
  category: Category;
  link?: string;
};