import { getIntlayer } from "intlayer";
import type { Metadata } from "next";
import Image from "next/image";

import { AspectRatio } from "@/components/_base/aspect-ratio/aspect-ratio";
import { JsonLd } from "@/components/json-ld/json-ld";
import { OG_IMAGE_HEIGHT, OG_IMAGE_TYPE, OG_IMAGE_WIDTH, SITE_NAME } from "@/constants/constants";
import ProfilePhoto from "@/public/images/Dave-Green-profile-photo.jpg";
import { getAboutJsonLd } from "@/utils/json-ld/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const content = getIntlayer("about-page");

  return {
    title: content.srOnlyHeading,
    description: content.description,
    openGraph: {
      siteName: SITE_NAME,
      url: "/about",
      title: content.srOnlyHeading,
      description: content.description,
      type: "website",
      images: [
        {
          url: "/about/opengraph-image",
          width: OG_IMAGE_WIDTH,
          height: OG_IMAGE_HEIGHT,
          type: OG_IMAGE_TYPE,
          alt: content.description,
        },
      ],
    },
  };
}

export default async function AboutPage() {
  const content = getIntlayer("about-page");

  return (
    <>
      <JsonLd
        data={getAboutJsonLd({
          name: content.srOnlyHeading,
          description: content.description,
        })}
      />

      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-7">
          <h1 className="sr-only">{content.srOnlyHeading}</h1>

          <p className="text-hero-foreground light:font-bold relative text-5xl font-semibold">
            {content.heading}
          </p>
          <p className="text-hero-foreground light:font-medium text-xl leading-normal lg:pl-6">
            {content.description}
          </p>
        </div>

        <AspectRatio
          ratio={1}
          className="w-full max-w-72 overflow-hidden rounded-2xl lg:relative lg:-top-10 lg:w-72 lg:shrink-0"
        >
          <Image
            src={ProfilePhoto}
            alt={content.imageAlt}
            fill
            sizes="288px"
            className="object-cover"
            placeholder="blur"
            priority
          />
        </AspectRatio>
      </div>
    </>
  );
}
