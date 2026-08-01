import { type Dictionary, t } from "intlayer";

const homepageContent = {
  key: "homepage",
  content: {
    heading: t({
      en: "Personal frontend engineering blog by Dave Green.",
    }),
    name: t({
      en: "Dave Green",
    }),
    description: t({
      en: "Frontend engineer embracing continuous learning in pursuit of self-growth and community.",
    }),
    postsBadge: t({
      en: "POSTS",
    }),
    blogLink: t({
      en: "Read the blog",
    }),
  },
} satisfies Dictionary;

export default homepageContent;
