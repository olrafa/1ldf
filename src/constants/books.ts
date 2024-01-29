import { Book } from "./types";
import profile from "../assets/profile.jpg";
import sapiens from "../assets/books/01_sapiens.jpg";
import chegaDeSaudade from "../assets/books/02_chega_de_saudade.jpg";
import estacaoCarandiru from "../assets/books/03_estacao_carandiru.jpg";

const genericBook: Book = {
  title: "Livro não encontrado",
  author: "Autor desconhecido",
  year: 1970,
  cover: profile,
};

export const findBook = (bookTitle: string): Book =>
  BOOKS.find(({ title }) => title === bookTitle) || genericBook;

const BOOKS: Book[] = [
  {
    title: "Sapiens - Uma Breve História da Humanidade",
    author: "Yuval Noah Harari",
    year: 2014,
    cover: sapiens,
    amazonLink:
      "https://www.amazon.com.br/Sapiens-Nova-edição-história-humanidade/dp/8535933921",
  },
  {
    title: "Chega de Saudade",
    author: "Ruy Castro",
    year: 1990,
    cover: chegaDeSaudade,
    amazonLink:
      "https://www.amazon.com.br/Chega-saudade-Ruy-Castro/dp/8535927522",
  },
  {
    title: "Estação Carandiru",
    author: "Dráuzio Varela",
    year: 1999,
    cover: estacaoCarandiru,
    amazonLink:
      "https://www.amazon.com.br/Esta%C3%A7%C3%A3o-Carandiru-Drauzio-Varella/dp/8571648972",
  },
];
