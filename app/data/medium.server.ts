export type MediumItem = {
  title: string;
  guid: string;
  pubDate: string;
  imageSrc: string;
};

type RawMediumItem = {
  title: string;
  guid: string;
  pubDate: string;
  content: string;
};

const extractImageSrc = (content: string) =>
  content.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? "";

export const getMediumPosts = async (): Promise<MediumItem[]> => {
  try {
    const mediumRssFeed = "https://medium.com/feed/@1livrodiscofilme";
    const rssToJsonApi = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
      mediumRssFeed
    )}`;

    const res = await fetch(rssToJsonApi);
    const { items } = (await res.json()) as { items: RawMediumItem[] };

    return items.slice(0, 3).map((item) => ({
      title: item.title,
      guid: item.guid,
      pubDate: item.pubDate,
      imageSrc: extractImageSrc(item.content),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
};
