import { useIntlayer } from "next-intlayer/server";

export function HomeHero() {
  const content = useIntlayer("home-hero");

  return (
    <section className="text-hero-foreground mb-18 space-y-7">
      <h1 className="sr-only">{content.heading}</h1>
      <p className="light:font-bold text-5xl font-semibold">{content.name}</p>
      <p className="light:font-medium text-xl leading-normal text-balance">{content.description}</p>
    </section>
  );
}
