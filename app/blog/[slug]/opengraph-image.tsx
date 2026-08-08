import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { notFound } from "next/navigation";
import { ImageResponse } from "next/og";

import { getPostBySlug } from "@/content/utils/get-posts/get-posts";

interface OpenGraphImageProps {
  params: Promise<{ slug: string }>;
}

const INTER_REGULAR_URL =
  "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZg.ttf";
const INTER_SEMIBOLD_URL =
  "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZg.ttf";
const AUTHOR_NAME = "Dave Green";
const LOGO_WIDTH = 167;
const LOGO_HEIGHT = 20;

async function loadInterFonts() {
  const [regular, semiBold] = await Promise.all([
    fetch(INTER_REGULAR_URL).then((response) => response.arrayBuffer()),
    fetch(INTER_SEMIBOLD_URL).then((response) => response.arrayBuffer()),
  ]);

  return { regular, semiBold };
}

export const dynamic = "force-static";

export default async function OpenGraphImage({ params }: OpenGraphImageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const logoData = (
    await readFile(join(process.cwd(), "public/images/forwebmotion-logo.svg"), "utf-8")
  ).replace(/#E7E5E4/gi, "#44403c");
  const logoSrc = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(logoData)}`;
  const { regular, semiBold } = await loadInterFonts();

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
          {post.title}
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
              fontSize: 18,
              fontWeight: 600,
              color: "#78716c",
            }}
          >
            <img src={logoSrc} height={LOGO_HEIGHT} width={LOGO_WIDTH} alt="" />
            <span style={{ lineHeight: 1.5 }}>By {AUTHOR_NAME}</span>
          </div>
        </div>
      </div>
    </div>,
    {
      fonts: [
        {
          name: "Inter",
          data: regular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: semiBold,
          weight: 600,
          style: "normal",
        },
      ],
    },
  );
}
