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
