import { ReactElement } from "react";
import { REFERENCES } from "../../constants/references";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CATEGORY_ICONS } from "../../constants/util";

type ReferencesProps = {
  guestNumber: number;
};

const References = ({ guestNumber }: ReferencesProps): ReactElement => {
  const guestRefs = REFERENCES.filter(
    ({ guestWeek }) => guestWeek === guestNumber
  );

  return (
    <div className="md:w-2/4">
      <div className="font-titles text-5xl mt-4">Outras referências</div>
      <div className="mt-4 divide-y">
        {guestRefs.map((guestRef) => (
          <a
            key={guestRef.id}
            href={guestRef.link}
            target="_blank"
            rel="noreferrer noopener"
            className="text-slate-50 items-center flex flex-row justify-between p-2 hover:bg-slate-700 text-base hover:text-slate-100"
          >
            <div className="font-bold text-left">
              {guestRef.title}
              {", "}
              <span className="font-normal">{guestRef.author}</span>
            </div>
            <FontAwesomeIcon icon={CATEGORY_ICONS[guestRef.category]} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default References;
