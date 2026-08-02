import { ArticleCategory } from "../../lib/types";

export const getLinkString = (type: ArticleCategory) => {
  if (type === "book") {
    return "Ver na Amazon";
  }

  if (type === "record") {
    return "Onde escutar";
  }

  return "Onde assistir";
};
