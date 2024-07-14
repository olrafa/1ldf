import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type MediumPost = {
  title: string;
  guid: string;
  pubDate: string;
  content: string;
};

type MediumResponse = {
  data: {
    items: MediumPost[];
  };
};

const getMediumPosts = async (): Promise<MediumResponse | undefined> => {
  try {
    const mediumRssFeed = "https://medium.com/feed/@1livrodiscofilme";
    const rssToJsonApi = "https://api.rss2json.com/v1/api.json";
    const data = { params: { rss_url: mediumRssFeed } };
    return await axios.get(rssToJsonApi, data);
  } catch (error) {
    console.error(error);
  }
};

const useGetMediumPosts = () =>
  useQuery({
    queryKey: ["mediumPosts"],
    queryFn: getMediumPosts,
    staleTime: 60 * 60 * 1000,
  });

export default useGetMediumPosts;
