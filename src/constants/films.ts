import { Film } from "./types";
import theRock from "../assets/films/02_a_rocha.jpg";

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
    title: "A Rocha",
    director: "Michael Bay",
    year: 1996,
    poster: theRock,
  },
];
