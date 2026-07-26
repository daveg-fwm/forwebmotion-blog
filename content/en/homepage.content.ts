import { type Dictionary, t } from "intlayer";

const homepageContent = {
  key: "homepage",
  content: {
    postsBadge: t({
      en: "POSTS",
    }),
    postsLink: t({
      en: "Read the blog",
    }),
  },
} satisfies Dictionary;

export default homepageContent;
