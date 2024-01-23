export type Book = {
  title: string;
  author: string;
  year: number,
  cover?: string;
  amazonLink?: string;
};

export type Film = {
  title: string;
  director: string;
  year: number;
  poster?: string; 
};

export type Record = {
  title: string;
  artist: string;
  year: number;
  cover?: string;
};

export type Guest = {
  week: number;
  name: string;
  description: string;
  spotify: string;
  youTube: string;
  img: string;
  book: Book;
  record: Record;
  film: Film;
  otherReferences?: Array<Book | Record | Film>;
};
