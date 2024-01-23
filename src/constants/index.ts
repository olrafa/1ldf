import pvc from "../assets/guests/pvc-preview.png";
import { findBook } from "./books";
import { findFilm } from "./films";
import { findRecord } from "./records";
import { Guest } from "./types";

export const CURRENT_WEEK = 2;

export const GUESTS_LIST: Guest[] = [
  {
    week: 2,
    name: "PVC",
    description: `O comentarista esportivo Paulo Vinícius Coelho fala sobre as obras que marcaram sua vida: o filme "A Rocha", com Nicolas Cage e Sean Connery, o livro "Chega de Saudade", escrito por Ruy Casto, e o disco "Velô", de Caetano Veloso. Tudo isso sem deixar de lado seu assunto favorito, o futebol.`,
    spotify:
      "https://open.spotify.com/embed/episode/690bBYmtHvj2LjncJX6Mco/video",
    youTube: "https://www.youtube.com/embed/RnxW-TFgyoE?si=9miZEnYV-6iiAIx8",
    img: pvc,
    book: findBook("Chega de Saudade"),
    film: findFilm("A Rocha"),
    record: findRecord("Velô"),
  },
];
