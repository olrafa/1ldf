import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faBookOpen,
  faFilm,
  faMusic,
  faNewspaper,
  faPlay,
  faRecordVinyl,
  faTv,
} from "@fortawesome/free-solid-svg-icons";

export const CATEGORY_ICONS: { [key: string]: IconProp } = {
  book: faBookOpen,
  record: faRecordVinyl,
  film: faFilm,
  song: faMusic,
  video: faPlay,
  series: faTv,
  print: faNewspaper,
};
