import { type Dictionary, md } from "intlayer";

const pageContent = {
  key: "homepage",
  content: {
    markdown: md({
      en: `# Server-Side Welcome \n\n Rendered with **AST** directly from the server.`,
    }),
  },
} satisfies Dictionary;

export default pageContent;
