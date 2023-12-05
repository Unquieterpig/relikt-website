import PostFeed from "@components/PostFeed";
import AuthCheck from "@components/AuthCheck";
import Metatags from "@components/Metatags";

import Link from "next/link";

import {
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/react";

import { firestore, postToJSON } from "@lib/firebase";
import {
  Timestamp,
  collectionGroup,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";

import { useState } from "react";

import GradientTop from "@components/GamesenseGradient";

// Max post to query per page
const LIMIT = 8;

export async function getServerSideProps(context) {
  const postsQuery = query(
    collectionGroup(firestore, "posts"),
    where("published", "==", true),
    orderBy("createdAt", "desc"),
    limit(LIMIT)
  );

  const posts = (await getDocs(postsQuery)).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Browse(props) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === "number"
        ? Timestamp.fromMillis(last.createdAt)
        : last.createdAt;

    const postsQuery = query(
      collectionGroup(firestore, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      startAfter(cursor),
      limit(LIMIT)
    );

    const newPosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <>
      <Metatags
        title="Relikt - Browse"
        description="Find the perfect voice in our community."
      />
      <GradientTop />
      <Card className="mx-10 mt-5">
        <CardBody className="flex flex-row justify-between">
          <Breadcrumbs
            size="lg"
            className="flex text-center justify-center font"
          >
            <BreadcrumbItem href="/panel">Panel</BreadcrumbItem>
            <BreadcrumbItem href="/panel/browse">Browse</BreadcrumbItem>
          </Breadcrumbs>
          <AuthCheck
            fallback={
              <Link href="/enter">
                <Button color="primary">Sign Up to Post</Button>
              </Link>
            }
          >
            <Button
              as={Link}
              className="w-40"
              variant="shadow"
              color="primary"
              href="/panel/browse/admin"
            >
              + Create New Post
            </Button>
          </AuthCheck>
        </CardBody>
      </Card>

      <div className="mx-12 grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4">
        <PostFeed posts={posts} />
      </div>

      <div className="flex justify-center align-center mt-2">
        {posts.length === 0
          ? "No posts to load"
          : !postsEnd && (
              <Button isLoading={loading} onClick={getMorePosts}>
                Load more
              </Button>
            )}

        {postsEnd && "You have reached the end!"}
      </div>
    </>
  );
}
