import { Record } from "./types";
import californication from "../assets/records/01_californication.jpg";
import velo from "../assets/records/02_velo.jpg";

const genericRecord: Record = {
  title: "Disco não encontrado",
  artist: "Artista desconhecido",
  year: 1970,
  cover: "",
};

export const findRecord = (RecordTitle: string): Record =>
  RECORDS.find(({ title }) => title === RecordTitle) || genericRecord;

const RECORDS: Record[] = [
  {
    title: "Californication",
    artist: "Red Hot Chili Peppers",
    year: 1999,
    cover: californication,
    songWhip: "https://songwhip.com/red-hot-chili-peppers/californication1999",
  },
  {
    title: "Velô",
    artist: "Caetano Veloso",
    year: 1984,
    cover: velo,
    songWhip: "https://songwhip.com/caetano-veloso/velo",
  },
];
