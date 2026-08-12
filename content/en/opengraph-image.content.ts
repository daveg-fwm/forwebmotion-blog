import { type Dictionary, t } from "intlayer";

const opengraphImageContent = {
  key: "opengraph-image",
  content: {
    author: {
      by: t({
        en: "by",
      }),
      name: t({
        en: "Dave Green",
      }),
    },
    blog: t({
      en: "Personal frontend engineering blog",
    }),
    about: t({
      en: "About",
    }),
  },
} satisfies Dictionary;

export default opengraphImageContent;
