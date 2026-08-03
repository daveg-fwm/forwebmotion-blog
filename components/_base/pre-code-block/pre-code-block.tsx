import { Code } from "bright";
import type { ReactElement } from "react";

import darkTheme from "@/styles/bright-theme/dark.json";
import lightTheme from "@/styles/bright-theme/light.json";

Code.theme = {
  dark: darkTheme,
  light: lightTheme,
  lightSelector: "html:not(.dark)",
};

export function PreCodeBlock(props: Parameters<typeof Code>[0]) {
  const { children, ...rest } = props;

  const codeChild = children as ReactElement<{
    className?: string;
    children?: string;
  }>;

  if (codeChild?.props?.children) {
    const className = codeChild.props.className ?? "";
    const metastring = className.replace(/^(language-|lang-)/, "");
    const lang = metastring.split(".").pop() ?? "text";
    const title = lang !== metastring ? metastring : undefined;

    return (
      <Code lang={lang} title={title} lineNumbers {...rest}>
        {codeChild.props.children}
      </Code>
    );
  }

  return <Code {...props} />;
}
