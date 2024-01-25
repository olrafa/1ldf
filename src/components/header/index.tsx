import {
  faInstagram,
  faSpotify,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement } from "react";

const Header = (): ReactElement => (
  <div className="w-full flex flex-row bg-ldfGreen text-ldfGrey gap-4 items-center p-2 text-lg md:text-xl md:gap-8 justify-between md:justify-start fixed top-0 h-10">
    <a href="/">HOME</a>
    <a href="/episodios">EPISÓDIOS</a>
    <a
      href="https://www.youtube.com/@1livrodiscofilme"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faYoutube} />
    </a>
    <a
      href="https://open.spotify.com/show/26pR0jVQfcPD0V0aB7WK5r?si=a70b0e2c90a44dfc&nd=1&dlsi=c9df9643c94248d0"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faSpotify} />
    </a>
    <a
      href="https://www.instagram.com/1livrodiscofilme/"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faInstagram} />
    </a>
    <a
      href="https://www.tiktok.com/@1livrodiscofilme"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FontAwesomeIcon icon={faTiktok} />
    </a>
  </div>
);

export default Header;
