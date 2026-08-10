import type { Graph, Thing, WithContext } from "schema-dts";
import serialize from "serialize-javascript";

interface JsonLdProps {
  data: WithContext<Thing> | Graph;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{
        __html: serialize(data, { isJSON: true }),
      }}
    />
  );
}
