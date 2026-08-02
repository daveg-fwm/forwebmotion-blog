import { type Dictionary, t } from "intlayer";

const postPageContent = {
  key: "post-page",
  content: {
    published: t({
      en: "Published on",
    }),
    updated: t({
      en: "Last updated on",
    }),
  },
} satisfies Dictionary;

export default postPageContent;
