import { type Dictionary, t } from "intlayer";

const homeHeroContent = {
  key: "home-hero",
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
  },
} satisfies Dictionary;

export default homeHeroContent;
