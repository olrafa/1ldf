import pvc from "../assets/guests/pvc-preview.png"

export const CURRENT_WEEK = 2;

type Guest = {
  week: number;
  name: string;
  description: string;
  spotify: string;
  youTube: string;
  img: string;
};

export const GUESTS_LIST: Guest[] = [
  {
    week: 2,
    name: "PVC",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    spotify:
      "https://open.spotify.com/embed/episode/690bBYmtHvj2LjncJX6Mco/video",
    youTube: "https://www.youtube.com/embed/RnxW-TFgyoE?si=9miZEnYV-6iiAIx8",
    img: pvc
  },
];
