import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faBookOpen,
  faClapperboard,
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
};
