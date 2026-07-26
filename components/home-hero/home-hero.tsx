import { useIntlayer } from "next-intlayer/server";

export function HomeHero() {
  const content = useIntlayer("home-hero");

  return (
    <section className="mb-18 space-y-7 text-stone-400">
      <h1 className="sr-only">{content.heading}</h1>
      <p className="text-5xl font-semibold">{content.name}</p>
      <p className="text-xl leading-normal text-balance">{content.description}</p>
    </section>
  );
}
