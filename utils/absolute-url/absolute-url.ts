import { SITE_URL } from "@/constants/constants";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).href;
}
