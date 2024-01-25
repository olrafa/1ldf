import {
  faInstagram,
  faSpotify,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";
import { LINKS } from "../../constants/links";

const Header = (): ReactElement => (
  <div className="w-full flex flex-row bg-ldfGreen text-ldfGrey gap-4 items-center p-2 text-lg md:text-xl md:gap-8 justify-between md:justify-start fixed top-0 h-10">
    <a href="/">HOME</a>
    <a href="/episodios">EPISÓDIOS</a>
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
);

export default Header;
