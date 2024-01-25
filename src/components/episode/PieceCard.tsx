import { faAmazon } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";

type PieceCardProps = {
  type: "Livro" | "Disco" | "Filme";
  title: string;
  author: string;
  year: number;
  imgSrc?: string;
  amazonLink?: string;
  songWhip?: string;
  justWatch?: string;
};

const PieceCard = ({
  type,
  title,
  author,
  year,
  imgSrc,
  amazonLink,
  songWhip,
  justWatch,
}: PieceCardProps): ReactElement => (
  <div className="mb-2 w-full">
    <div className="font-titles text-4xl pt-4">{type}</div>
    <div className="flex flex-col items-center gap-5 justify-around py-4">
      {imgSrc && <img className="max-h-80" src={imgSrc} />}
      <div>
        <div className="font-titles text-3xl">{title}</div>
        <div className="font-titles text-3xl">{author}</div>
        <div className="font-titles text-2xl">{year}</div>
      </div>
      {amazonLink && (
        <a
          href={amazonLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm p-2 items-center flex flex-row gap-2 bg-slate-50 content-box-small"
        >
          <FontAwesomeIcon icon={faAmazon} />
          Ver na Amazon
        </a>
      )}
      {songWhip && (
        <a
          href={songWhip}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm p-2 bg-slate-50 content-box-small"
        >
          Onde escutar
        </a>
      )}
      {justWatch && (
        <a
          href={justWatch}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm p-2 bg-slate-50 content-box-small"
        >
          Onde assistir
        </a>
      )}
    </div>
  </div>
);

export default PieceCard;
