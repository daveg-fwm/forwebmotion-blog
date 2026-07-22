import { type IntlayerConfig, Locales } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH],
    defaultLocale: Locales.ENGLISH,
  },
  routing: {
    mode: "no-prefix",
  },
};

export default config;
