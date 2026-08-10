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
    github: t({
      en: "Dave's GitHub profile (opens in a new tab)",
    }),
    linkedin: t({
      en: "Dave's LinkedIn profile (opens in a new tab)",
    }),
  },
} satisfies Dictionary;

export default footerContent;
