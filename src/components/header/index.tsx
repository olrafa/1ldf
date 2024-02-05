import {
  faInstagram,
  faSpotify,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement, useState } from "react";
import { LINKS } from "../../constants/links";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const ButtonsList = () => (
  <>
    <a href="/">HOME</a>
    <a href="/episodios">PODCAST</a>
    <a href="/experiencia">A EXPERIÊNCIA</a>
    <a href="/maisumlivro">+1 LIVRO</a>
    <a href="/maisumdisco">+1 DISCO</a>
    <a href="/maisumfilme">+1 FILME</a>
    <a href="/equipe">EQUIPE</a>
    <a href="/contato">CONTATO</a>
  </>
);

const Header = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="w-full flex flex-row bg-ldfGreen text-ldfGrey gap-4 items-center p-2 text-lg md:gap-8 justify-between top-0 h-10">
        <div className={`gap-8 md:flex hidden flex-column md:flex-row`}>
          <ButtonsList />
        </div>
        <FontAwesomeIcon
          icon={faBars}
          className="md:hidden"
          onClick={() => setIsMenuOpen((_open) => !_open)}
        />
        <div className="gap-12 flex">
          <a href={LINKS.youTube} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a href={LINKS.spotify} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faSpotify} />
          </a>
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a href={LINKS.tikTok} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTiktok} />
          </a>
        </div>
      </div>
      {isMenuOpen && (
        <div className="w-full md:hidden bg-ldfGreen flex flex-col top-full gap-2 p-1">
          <ButtonsList />
        </div>
      )}
      <div className="md:mt-4"></div>
    </>
  );
};

export default Header;
