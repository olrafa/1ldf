import { ReactElement } from "react";
import { TeamMember } from "../../constants/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

type TeamMemberProps = {
  teamMember: TeamMember;
};

const TeamMemberCard = ({ teamMember }: TeamMemberProps): ReactElement => {
  const { name, description, imgLink, socials = "" } = teamMember;

  const socialUrl = socials?.split("@")[1];

  return (
    <div
      className="my-2 md:mx-2 p-5 text-left text-xl md:text-2xl bg-white text-ldfGrey content-box-small 
         md:w-3/5"
    >
      <div className="flex flex-col gap-5 md:flex-row text-left items-center justify-around">
        <div className="mt-4 flex flex-col gap-5">
          <p className="font-titles text-4xl">{name}</p>
          <p className="text-lg whitespace-pre-line">{description}</p>
          {socialUrl && (
            <a
              className="text-base items-center flex gap-1 w-fit cursor-pointer"
              href={`https://instagram.com/${socialUrl}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} />
              {socials}
            </a>
          )}
        </div>
        <img src={imgLink} className="w-72 rounded" loading="lazy"/>
      </div>
    </div>
  );
};

export default TeamMemberCard;
