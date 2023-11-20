import PostFeed from "@components/PostFeed";
import Loader from "@components/Loader";
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

// Max post to query per page
const LIMIT = 10;

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
      <Card className="mx-10 mt-5">
        <CardBody className="flex flex-row justify-between">
          <Breadcrumbs
            size="lg"
            className="flex text-center justify-center font"
          >
            <BreadcrumbItem href="/panel">Panel</BreadcrumbItem>
            <BreadcrumbItem href="/panel/browse">Browse</BreadcrumbItem>
          </Breadcrumbs>
          <Button
            as={Link}
            className="w-40"
            variant="shadow"
            color="primary"
            href="/panel/browse/admin"
          >
            + Create New Post
          </Button>
        </CardBody>
      </Card>

      <div className="mx-12 grid grid-cols-4 gap-4">
        <PostFeed posts={posts} />
      </div>
      {posts.length === 0
        ? "No posts to load"
        : !loading &&
          !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && "You have reached the end!"}
    </>
  );
}
