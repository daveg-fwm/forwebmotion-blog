import { type Dictionary, t } from "intlayer";

const blogPageContent = {
  key: "blog-page",
  content: {
    heading: t({
      en: "Blog",
    }),
    description: t({
      en: "Personal frontend engineering blog by Dave Green.",
    }),
  },
} satisfies Dictionary;

export default blogPageContent;
