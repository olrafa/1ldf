import {
  faInstagram,
  faSpotify,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement, useState } from "react";
import { LINKS } from "../../constants/links";
import { faBars, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import profile from "../../assets/profile.jpg";

const ButtonsList = () => (
  <>
    <a href="/">HOME</a>
    <a href="/episodios">PODCAST</a>
    <a href={LINKS.medium} target="_blank" rel="noopener noreferrer">
      BLOG
    </a>
    <a href="/experiencia">A EXPERIÊNCIA</a>
    <a href="/maisumlivro">+1 LIVRO</a>
    <a href="/maisumdisco">+1 DISCO</a>
    <a href="/maisumfilme">+1 FILME</a>
    <a href="/equipe">EQUIPE</a>
  </>
);

const Header = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <div className="w-full flex flex-row bg-ldfGreen text-ldfGrey gap-4 items-center p-2 text-base lg:gap-8 lg:pr-12 justify-between sticky top-0 h-20">
        <div
          className={`gap-8 lg:flex hidden flex-column items-center lg:flex-row`}
        >
          <img src={profile} height="48px" width="48px" />
          <ButtonsList />
        </div>
        <div className="lg:hidden flex flex-row items-center gap-4">
          <img src={profile} height="48px" width="48px" />
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setIsMenuOpen((_open) => !_open)}
          />
        </div>
        <div className="lg:gap-12 gap-4 flex text-lg">
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

          <a href={LINKS.email} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </div>
      {isMenuOpen && (
        <div className="w-full lg:hidden bg-ldfGreen flex flex-col sticky top-20 gap-2 p-2">
          <ButtonsList />
        </div>
      )}
      <div className="lg:mt-4"></div>
    </>
  );
};

export default Header;
