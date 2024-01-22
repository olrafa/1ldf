import { ReactElement } from "react";
import { CURRENT_WEEK, GUESTS_LIST } from "../../constants";

const Latest = (): ReactElement => {
  const guest = GUESTS_LIST.find(({ week }) => week === CURRENT_WEEK);

  if (!guest) {
    return <></>;
  }

  const { description, img } = guest;

  return (
    <div className="text-ldfGrey mt-5 p-5 border-4 border-ldfRed">
      <div className="flex flex-row text-xl justify-between">
        <p>Episódio mais recente</p>
      </div>
      <div className="flex flex-col gap-5 md:flex-row text-left items-center justify-between">
        <p className="md:w-1/3 mt-4 md:text-2xl">{description}</p>
        <img src={img} className="md:w-2/3" />
      </div>
    </div>
  );
};

export default Latest;
