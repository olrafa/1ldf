import useGetMediumPosts from "../../hooks/useGetMediumPosts";

const parseImageSrc = (content: string) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const img = doc.querySelector("img");
  return img?.getAttribute("src") ?? "";
};

const MediumComponent = () => {
  const { data, isLoading } = useGetMediumPosts();
  if (isLoading || !data) {
    return null;
  }

  const {
    data: { items },
  } = data;

  const latestItems = items.slice(0, 3);

  return (
    <div className="flex flex-col items-center">
      <div className="font-titles text-3xl mx-4 justify-center flex mt-12 mb-10 bg-white text-ldfGrey content-box-small w-fit p-4">
        Blog
      </div>
      <div className="flex flex-col lg:flex-row items-center w-full gap-5 text-center justify-center text-xl mb-8">
        {latestItems.map((item) => (
          <a
            key={item.guid}
            href={item.guid}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-5 bg-white text-ldfGrey content-box-small w-fit p-4"
          >
            <img src={parseImageSrc(item.content)} className="w-72" />
            <p className="font-titles text-2xl">{item.title}</p>
            <p className="text-lg">
              {new Date(item.pubDate).toLocaleDateString("pt-BR", {
                month: "long",
                day: "numeric",
                // year: "numeric",
              })}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default MediumComponent;
