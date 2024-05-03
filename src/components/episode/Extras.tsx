import { ExtraListItem } from "../../constants/types";

const getEmbedSrc = (url: string) => {
  if (url.includes("spotify")) {
    return url.replace("/playlist", "/embed/playlist");
  }
  if (url.includes("vimeo")) {
    return url.replace("vimeo.com", "player.vimeo.com/video");
  }
  return url.replace("watch?v=", "embed/");
};

type ExtrasProps = {
  extras: ExtraListItem[];
};

const Extras = ({ extras }: ExtrasProps) => (
  <div className="mt-4 mb-8 md:w-2/5">
    <p className="font-titles text-4xl m-4">Conteúdo extra</p>
    {extras.map((extra) => (
      <div key={extra.id}>
        <div className="m-4">{extra.attributes.description}</div>
        <div className="aspect-video w-full flex justify-center">
          <iframe
            title={extra.attributes.description}
            className="w-10/12 h-full content-box-small rounded-xl"
            src={getEmbedSrc(extra.attributes.url)}
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
