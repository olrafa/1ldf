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
    <div className="flex flex-col items-center p-3">
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
            className="flex flex-col items-center  justify-between gap-5 bg-white min-h-80 2xl:h-96 text-ldfGrey content-box-small w-full lg:w-1/3 p-4"
          >
            <div>
              <img src={parseImageSrc(item.content)} className="w-full mb-4" loading="lazy"/>
              <p className="font-titles text-xl">{item.title}</p>
            </div>
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

export default MediumComponent;
