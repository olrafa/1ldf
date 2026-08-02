import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faBookOpen,
  faClapperboard,
  faMicrophone,
  faMusic,
  faNewspaper,
  faRecordVinyl,
  faTv,
} from "@fortawesome/free-solid-svg-icons";

export const CATEGORY_ICONS: { [key: string]: IconProp } = {
  book: faBookOpen,
  record: faRecordVinyl,
  film: faClapperboard,
  song: faMusic,
  video: faYoutube,
  series: faTv,
  print: faNewspaper,
  podcast: faMicrophone,
};

export const CATEGORY_TRANSLATIONS: { [key: string]: string } = {
  book: "livro",
  record: "disco",
  film: "filme",
};

export const toTitleCase = (str: string) =>
  str.toLowerCase().replace(/(?:^|\s)\w/g, (match) => match.toUpperCase());

export const formatDate = (date: string | Date) =>
  new Date(date).toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export const coverAlt = (title?: string, creator?: string) => {
  if (title && creator) return `Capa de ${title}, de ${creator}`;
  if (title) return `Capa de ${title}`;
  return "Capa da obra";
};

export const personAlt = (name: string) => `Foto de ${name}`;
