import { Film } from "./types";
import memento from "../assets/films/01_amnesia.jpg";
import theRock from "../assets/films/02_a_rocha.jpg";
import matrix from "../assets/films/03_matrix.jpg";

const genericFilm: Film = {
  title: "Filme não encontrado",
  director: "Diretor desconhecido",
  year: 1970,
  poster: "",
};

export const findFilm = (FilmTitle: string): Film =>
  FILMS.find(({ title }) => title === FilmTitle) || genericFilm;

const FILMS: Film[] = [
  {
    title: "Amnésia",
    director: "Christopher Nolan",
    year: 2000,
    poster: memento,
    justWatch: "https://www.justwatch.com/br/filme/amnesia-2000",
  },
  {
    title: "A Rocha",
    director: "Michael Bay",
    year: 1996,
    poster: theRock,
    justWatch: "https://www.justwatch.com/br/filme/a-rocha",
  },
  {
    title: "Matrix",
    director: "Irmãs Wachowski",
    year: 1999,
    poster: matrix,
    justWatch: "https://www.justwatch.com/br/filme/matrix",
  },
];
