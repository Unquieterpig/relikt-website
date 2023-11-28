import { Divider, Spacer } from "@nextui-org/react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

// UI component for main post content
export default function PostContent({ post }) {
  const createdAt =
    typeof post?.createdAt === "number"
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Posted by{" "}
        <Link legacyBehavior href={`/${post.username}/`}>
          <a className="text-info">@{post.username}</a>
        </Link>{" "}
        on {createdAt.toISOString()}
      </span>

      <Spacer y={1} />
      <Divider />
      <Spacer y={1} />

      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
}
