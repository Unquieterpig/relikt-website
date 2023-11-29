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
    <div>
      <h1 className="text-3xl font-bold">{post?.title}</h1>
      <span className="text-sm">
        Posted by{" "}
        <Link legacyBehavior href={`/${post.username}/`}>
          <a className="text-blue-600">@{post.username}</a>
        </Link>{" "}
        on {createdAt.toISOString()}
      </span>

      <Spacer y={1} />
      <Divider />
      <Spacer y={1} />

      <ReactMarkdown className="prose dark:prose-invert">
        {post?.content}
      </ReactMarkdown>
    </div>
  );
}
