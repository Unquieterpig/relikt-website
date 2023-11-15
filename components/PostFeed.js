import Link from "next/link";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin = false }) {
  return (
    <Card className="mx-10 mt-5">
      <Link legacyBehavior href={`/${post.username}`}>
        <a>
          <strong>By @{post.username}</strong>
        </a>
      </Link>

      <Link legacyBehavior href={`/${post.username}/${post.slug}`}>
        <h2>
          <a>{post.title}</a>
        </h2>
      </Link>

      <footer>
        <span>👍 {post.likeCount} Thumbs</span>
      </footer>

      {/* If admin view, show extra controls for user */}
      {admin && (
        <>
          <Link legacyBehavior href={`/panel/browse/admin/${post.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>

          {post.published ? (
            <p className="text-success">Live</p>
          ) : (
            <p className="text-danger">Unpublished</p>
          )}
        </>
      )}
    </Card>
  );
}
