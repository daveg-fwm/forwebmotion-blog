import { type Dictionary, t } from "intlayer";

const footerContent = {
  key: "footer",
  content: {
    brand: t({
      en: "FORWEBMOTION",
    }),
    slogan: t({
      en: "exploring the art of frontend",
    }),
  },
} satisfies Dictionary;

export default footerContent;
