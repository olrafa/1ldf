import { ReactElement } from "react";

type PieceCardProps = {
  type: "Livro" | "Disco" | "Filme";
  title: string;
  author: string;
  year: number;
  imgSrc?: string;
};

const PieceCard = ({
  type,
  title,
  author,
  year,
  imgSrc,
}: PieceCardProps): ReactElement => (
  <div className="mb-2 border-4 md:w-2/4 w-full">
    <div className="font-titles text-4xl pt-8">{type}</div>
    <div className="flex flex-row items-center gap-5 justify-around py-12">
      <div>
        <div className="font-titles text-3xl">{title}</div>
        <div className="font-titles text-3xl">{author}</div>
        <div className="font-titles text-2xl">{year}</div>
      </div>
      {imgSrc && <img className="max-h-80" src={imgSrc} />}
    </div>
  </div>
);

export default PieceCard;
