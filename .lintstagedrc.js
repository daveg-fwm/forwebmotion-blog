import { relative } from "path";

const buildEslintCommand = (filenames) =>
  `eslint --fix ${filenames.map((f) => `"${relative(process.cwd(), f)}"`).join(" ")}`;

const config = {
  "*.{js,jsx,ts,tsx,mdx}": [buildEslintCommand, "prettier --write"],
  "*.{json,css,md}": ["prettier --write"],
};

export default config;
