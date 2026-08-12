import { type Dictionary, t } from "intlayer";

const aboutPageContent = {
  key: "about-page",
  content: {
    heading: t({
      en: "🤘owzit! I'm Dave.",
    }),
    srOnlyHeading: t({
      en: "About Dave Green",
    }),
    description: t({
      en: "Frontend engineer embracing continuous learning in pursuit of self-growth and community.",
    }),
    imageAlt: t({
      en: "Profile photo of Dave Green",
    }),
  },
} satisfies Dictionary;

export default aboutPageContent;
