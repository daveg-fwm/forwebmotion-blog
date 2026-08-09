import { readFile } from "node:fs/promises";
import { join } from "node:path";

// ImageResponse needs font files as raw binary (ArrayBuffer/Buffer)
async function loadInterFonts() {
  const fontDir = join(process.cwd(), "assets/fonts");

  const [regular, semiBold] = await Promise.all([
    readFile(join(fontDir, "Inter-Regular-Opengraph.ttf")),
    readFile(join(fontDir, "Inter-SemiBold-Opengraph.ttf")),
  ]);

  return { regular, semiBold };
}

// Crops the viewBox from 134×16 to 122×16 to remove empty padding on the right of the logo.
const logoData = (
  await readFile(join(process.cwd(), "public/images/forwebmotion-logo.svg"), "utf-8")
)
  .replace(/#E7E5E4/gi, "#44403c")
  .replace(/viewBox="0 0 134 16"/, `viewBox="0 0 122 16"`);

// Encodes logo data as a data URI because <img src={...}> inside ImageResponse can't reliably resolve /public paths the way a normal page would.
const logoSrc = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(logoData)}`;

const { regular, semiBold } = await loadInterFonts();
const fonts = [
  {
    name: "Inter",
    data: regular,
    weight: 400 as const,
    style: "normal" as const,
  },
  {
    name: "Inter",
    data: semiBold,
    weight: 600 as const,
    style: "normal" as const,
  },
];

const LOGO_WIDTH = 153;
const LOGO_HEIGHT = 20;
const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const OG_IMAGE_TYPE = "image/png";

export { fonts, LOGO_HEIGHT, LOGO_WIDTH, logoSrc, OG_IMAGE_HEIGHT, OG_IMAGE_TYPE, OG_IMAGE_WIDTH };
