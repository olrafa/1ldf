import type { ArticleCategory } from "../lib/types";
import { CATEGORY_TRANSLATIONS, toTitleCase } from "../lib/util";
import { buildMeta } from "../lib/meta";

export const articleListMeta = (type: ArticleCategory) => () =>
  buildMeta({ title: `+1 ${toTitleCase(CATEGORY_TRANSLATIONS[type])}` });
