import Link from "next/link";

import { Card, CardHeader, CardFooter, Divider } from "@nextui-org/react";

export default function PostFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}

function PostItem({ post, admin = false }) {
  return (
    <Card className="w-[clamp(250px, 350px, 450px)] mt-5">
      <CardHeader className="flex flex-col items-start">
        <Link legacyBehavior href={`/${post.username}/${post.slug}`}>
          <a className="text-lg">{post.title}</a>
        </Link>
        <Link legacyBehavior href={`/${post.username}`}>
          <a>
            <strong>By @{post.username}</strong>
          </a>
        </Link>
      </CardHeader>

      <Divider />

      <CardFooter className="flex justify-between text-end">
        <span>👍 {post.likeCount} Thumbs</span>

        {/* If post is owned by user, show extra controls for user */}
        {admin && (
          <div>
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
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
