import { type Dictionary, t } from "intlayer";
import type { Metadata } from "next";

const metadataContent = {
  key: "metadata",
  content: {
    title: t({
      en: "My Project Title",
    }),

    description: t({
      en: "Discover our innovative platform designed to streamline your workflow and boost productivity.",
    }),

    keywords: t({
      en: ["innovation", "productivity", "workflow", "SaaS"],
    }),
  },
} as Dictionary<Metadata>;

export default metadataContent;
