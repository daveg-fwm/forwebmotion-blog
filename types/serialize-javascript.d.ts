declare module "serialize-javascript" {
  interface SerializeOptions {
    space?: number | string;
    isJSON?: boolean;
    unsafe?: boolean;
    ignoreFunction?: boolean;
  }

  function serialize(value: unknown, options?: SerializeOptions): string;

  export default serialize;
}
