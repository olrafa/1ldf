import { ReactElement } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CATEGORY_ICONS } from "../../constants/util";
import { ArtResponseArray } from "../../constants/types";

type ReferencesProps = {
  guestRefs: ArtResponseArray;
};

const References = ({ guestRefs }: ReferencesProps): ReactElement => {
  console.log(guestRefs);

  const { data: refList } = guestRefs;

  return (
    <div className="md:w-2/4">
      <div className="font-titles text-5xl mt-4">Outras referências</div>
      <div className="mt-4 divide-y divide-gray-600">
        {refList.map(({id, attributes}) => (
          <a
            key={id}
            href={attributes.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-50 items-center flex flex-row justify-between p-2 hover:bg-slate-700 text-base hover:text-slate-100"
          >
            <div className="font-bold text-left">
              {attributes.title}
              {attributes.creator && (
                <>
                  {", "}
                  <span className="font-normal">{attributes.creator}</span>
                </>
              )}
            </div>
            <div className="md:w-[3%]">
              <FontAwesomeIcon icon={CATEGORY_ICONS[attributes.category]} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default References;
