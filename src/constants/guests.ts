import karolQueiroz from "../assets/guests/01_karol.png";
import pvc from "../assets/guests/02_pvc.png";
import { findBook } from "./books";
import { findFilm } from "./films";
import { findRecord } from "./records";
import { Guest } from "./types";

export const CURRENT_WEEK = 2;

export const GUESTS_LIST: Guest[] = [
  {
    week: 1,
    name: "Karol Queiroz",
    description: `No nosso episódio de estreia, recebemos a criadora de conteúdo e futura psicóloga Karol Queiroz. Ela fala sobre o livro 'Sapiens - Uma Breve História da Humanidade', o disco 'Californication', o filme 'Amnésia', e como essas obras se relacionam com sua vida.`,
    youTube: "https://www.youtube.com/embed/a5wr0fQddTQ?si=YQooLm0eE4IzmWfC",
    img: karolQueiroz,
    book: findBook("Sapiens - Uma Breve História da Humanidade"),
    film: findFilm("Amnésia"),
    record: findRecord("Californication"),
  },
  {
    week: 2,
    name: "PVC",
    description: `O comentarista esportivo Paulo Vinícius Coelho fala sobre as obras que marcaram sua vida: o filme "A Rocha", com Nicolas Cage e Sean Connery, o livro "Chega de Saudade", escrito por Ruy Casto, e o disco "Velô", de Caetano Veloso. Tudo isso sem deixar de lado seu assunto favorito, o futebol.`,
    youTube: "https://www.youtube.com/embed/RnxW-TFgyoE?si=9miZEnYV-6iiAIx8",
    img: pvc,
    book: findBook("Chega de Saudade"),
    film: findFilm("A Rocha"),
    record: findRecord("Velô"),
  },
];
