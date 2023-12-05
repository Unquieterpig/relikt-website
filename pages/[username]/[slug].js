import PostContent from "@components/PostContent";
import Metatags from "@components/Metatags";
import LikeButton from "@components/LikeButton";
import AuthCheck from "@components/AuthCheck";
import { UserContext } from "@lib/context";
import { firestore, getUserWithUsername, postToJSON } from "@lib/firebase";
import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";

import Link from "next/link";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useContext } from "react";
import { Button, Card, CardBody } from "@nextui-org/react";
import GradientTop from "@components/GamesenseGradient";

export async function getStaticProps({ params }) {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let post;
  let path;

  if (userDoc) {
    const postRef = doc(collection(userDoc.ref, "posts"), slug);
    post = postToJSON(await getDoc(postRef));

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 5000,
  };
}

export async function getStaticPaths() {
  const postsQuery = query(collectionGroup(firestore, "posts"));
  const snapshot = await getDocs(postsQuery);

  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
}

export default function Post(props) {
  const postRef = doc(firestore, props.path);
  const [realtimePost] = useDocumentData(postRef);

  const post = realtimePost || props.post;

  const { user: currentUser } = useContext(UserContext);

  return (
    <main className="flex min-w-screen justify-center gap-4">
      <GradientTop />
      <Metatags title={post.title} description={post.title} />

      <Card className="flex top-[15px] w-[60vw] ml-2">
        <CardBody>
          <PostContent post={post} />
        </CardBody>
      </Card>

      <aside>
        <Card className="sticky flex flex-col justify-center items-center text-center w-[20%] min-w-[250px] top-[80px] h-0 min-h-[100px] mr-2 gap-1">
          <p className="font-bold">{post.likeCount || 0} 👍</p>

          <AuthCheck
            fallback={
              <Link href="/enter">
                <Button color="primary">Sign Up</Button>
              </Link>
            }
          >
            <LikeButton postRef={postRef} />
          </AuthCheck>

          {currentUser?.uid === post.uid && (
            <Link legacyBehavior href={`/panel/browse/admin/${post.slug}`}>
              <Button color="primary" className="mb-1">
                Edit
              </Button>
            </Link>
          )}
        </Card>
      </aside>
    </main>
  );
}
