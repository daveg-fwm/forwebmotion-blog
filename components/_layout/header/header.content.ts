import { type Dictionary, t } from "intlayer";

const headerContent = {
  key: "header",
  content: {
    skipLink: t({
      en: "Skip to main content",
    }),
    navLinks: [
      t({
        en: "Blog",
      }),
      t({
        en: "About",
      }),
    ],
    menuButton: t({
      en: "Toggle main menu",
    }),
  },
} satisfies Dictionary;

export default headerContent;
