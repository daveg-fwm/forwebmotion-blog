import { getIntlayer } from "intlayer";
import { ImageResponse } from "next/og";

import { fonts, logoSrc } from "@/utils/opengraph-image/opengraph-image";

export const dynamic = "force-static";

export default async function OpenGraphImage() {
  const content = getIntlayer("opengraph-image");

  return new ImageResponse(
    <div
      style={{
        backgroundColor: "#f5f5f4",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "64px 72px",
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          fontSize: 48,
          fontWeight: 600,
          color: "#78716c",
        }}
      >
        <img src={logoSrc} height={80} width={610} alt="" />
        <span style={{ lineHeight: 1.5 }}>
          {content.author.by} {content.author.name}
        </span>
      </div>
    </div>,
    {
      fonts,
    },
  );
}
