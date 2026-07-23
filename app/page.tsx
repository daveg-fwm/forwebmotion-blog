import { getLatestPosts } from "@/utils/get-latest-posts/get-latest-posts";

export default function Homepage() {
  const latestPosts = getLatestPosts();

  return <div className="typeset">{JSON.stringify(latestPosts)}</div>;
}
