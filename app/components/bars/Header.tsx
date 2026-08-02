import {
  faInstagram,
  faSpotify,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement, useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { LINKS } from "../../lib/links";
import { faBars, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import profile from "../../assets/profile.jpg";

const navLinkClass =
  "transition-colors duration-150 hover:text-white";

const ButtonsList = () => (
  <>
    <Link className={navLinkClass} to="/">
      HOME
    </Link>
    <Link className={navLinkClass} to="/episodios">
      PODCAST
    </Link>
    <a
      className={navLinkClass}
      href={LINKS.medium}
      target="_blank"
      rel="noopener noreferrer"
    >
      BLOG
    </a>
    <Link className={navLinkClass} to="/experiencia">
      A EXPERIÊNCIA
    </Link>
    <Link className={navLinkClass} to="/maisumlivro">
      +1 LIVRO
    </Link>
    <Link className={navLinkClass} to="/maisumdisco">
      +1 DISCO
    </Link>
    <Link className={navLinkClass} to="/maisumfilme">
      +1 FILME
    </Link>
    <Link className={navLinkClass} to="/equipe">
      EQUIPE
    </Link>
  </>
);

const Header = (): ReactElement => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="w-full flex flex-row bg-ldfGreen text-ldfGrey gap-4 items-center p-2 text-base lg:gap-8 lg:pr-12 justify-between sticky top-0 h-20">
        <div
          className={`gap-8 lg:flex hidden flex-column items-center lg:flex-row`}
        >
          <img src={profile} height="48px" width="48px" loading="lazy"/>
          <ButtonsList />
        </div>
        <div className="lg:hidden flex flex-row items-center gap-4">
          <img src={profile} height="48px" width="48px" loading="lazy" />
          <FontAwesomeIcon
            className="cursor-pointer transition-transform duration-150 hover:scale-110"
            icon={faBars}
            onClick={() => setIsMenuOpen((_open) => !_open)}
          />
        </div>
        <div className="lg:gap-12 gap-4 flex text-lg">
          <a
            className={navLinkClass}
            href={LINKS.youTube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faYoutube} />
          </a>
          <a
            className={navLinkClass}
            href={LINKS.spotify}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faSpotify} />
          </a>
          <a
            className={navLinkClass}
            href={LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            className={navLinkClass}
            href={LINKS.tikTok}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTiktok} />
          </a>

          <a
            className={navLinkClass}
            href={LINKS.email}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </div>
      </div>
      <div
        className={`w-full lg:hidden bg-ldfGreen grid sticky top-20 z-40 transition-[grid-template-rows] duration-300 ease-in-out ${
          isMenuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-2 p-2">
            <ButtonsList />
          </div>
        </div>
      </div>
      <div className="lg:mt-4"></div>
    </>
  );
};

export default Header;
