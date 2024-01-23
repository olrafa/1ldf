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
    <div>EPISÓDIOS</div>
    <FontAwesomeIcon icon={faYoutube} />
    <FontAwesomeIcon icon={faSpotify} />
    <FontAwesomeIcon icon={faInstagram} />
    <FontAwesomeIcon icon={faTiktok} />
  </div>
);

export default Header;
