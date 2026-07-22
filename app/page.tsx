import { getLocale, IntlayerServerProvider, useIntlayer, useLocale } from "next-intlayer/server";

function PageContent() {
  const { locale } = useLocale();
  const { markdown } = useIntlayer("homepage");

  return <div>{markdown[locale]}</div>;
}

export default async function Homepage() {
  const locale = await getLocale();

  return (
    <IntlayerServerProvider locale={locale}>
      <PageContent />
    </IntlayerServerProvider>
  );
}
