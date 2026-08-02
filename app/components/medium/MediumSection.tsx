import { ReactElement } from "react";
import type { MediumItem } from "../../data/medium.server";
import { formatDate } from "../../lib/util";

type MediumSectionProps = {
  items: MediumItem[];
};

const MediumSection = ({ items }: MediumSectionProps): ReactElement | null => {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col items-center p-3">
      <div className="font-titles text-3xl mx-4 justify-center flex mt-12 mb-10 bg-white text-ldfGrey content-box-small w-fit p-4">
        Blog
      </div>
      <div className="flex flex-col lg:flex-row items-center w-full gap-5 text-center justify-center text-xl mb-8">
        {items.map((item) => (
          <a
            key={item.guid}
            href={item.guid}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center  justify-between gap-5 bg-white min-h-80 2xl:h-96 text-ldfGrey content-box-small w-full lg:w-1/3 p-4"
          >
            <div>
              <img src={item.imageSrc} className="w-full mb-4" loading="lazy" />
              <p className="font-titles text-xl">{item.title}</p>
            </div>
            <p className="text-lg">{formatDate(item.pubDate)}</p>
          </a>
        ))}
      </div>
      <a
        href="https://medium.com/@1livrodiscofilme"
        target="_blank"
        rel="noopener noreferrer"
        className="font-titles justify-center text-ldfGreen text-3xl flex mx-4"
      >
        Veja mais no Medium
      </a>
    </div>
  );
};

export default MediumSection;
