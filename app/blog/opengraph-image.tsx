import { getIntlayer } from "intlayer";
import { ImageResponse } from "next/og";

import { fonts, LOGO_HEIGHT, LOGO_WIDTH, logoSrc } from "@/utils/opengraph-image/opengraph-image";

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
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          gap: 30,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 600,
            color: "#78716c",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
          }}
        >
          {content.blog}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 100,
          }}
        >
          <div
            style={{
              display: "flex",
              height: 2,
              backgroundColor: "#a8a29e",
              opacity: 0.5,
            }}
          />
          <div
            style={{
              display: "flex",
              gap: 10,
              fontSize: 18,
              fontWeight: 600,
              color: "#78716c",
            }}
          >
            <img src={logoSrc} height={LOGO_HEIGHT} width={LOGO_WIDTH} alt="" />
            <span style={{ lineHeight: 1.5 }}>
              {content.author.by} {content.author.name}
            </span>
          </div>
        </div>
      </div>
    </div>,
    {
      fonts,
    },
  );
}
