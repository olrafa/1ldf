import { ExtraListItem } from "../../constants/types";

type ExtrasProps = {
  extras: ExtraListItem[];
};

const Extras = ({ extras }: ExtrasProps) => (
  <div className="mt-4 mb-8 md:w-2/5">
    <p className="font-titles text-4xl m-4">Conteúdo extra</p>
    {extras.map((extra) => (
      <div key={extra.id}>
        <div className="m-4">{extra.attributes.description}</div>
        <div className="aspect-video w-full">
          <iframe
            className="w-full h-full content-box-small"
            src={extra.attributes.url.replace("watch?v=", "embed/")}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share: fullscreen"
            loading="lazy"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    ))}
  </div>
);

export default Extras;
