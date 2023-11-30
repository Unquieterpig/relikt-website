import { getUserWithUsername, postToJSON } from "@lib/firebase";
import UserProfile from "@components/UserProfile";
import PostFeed from "@components/PostFeed";
import Metatags from "@components/Metatags";

import {
  limit,
  orderBy,
  where,
  query as firebaseQuery,
  getDocs,
  collection,
} from "firebase/firestore";
import { Divider, Spacer } from "@nextui-org/react";

export async function getServerSideProps({ query }) {
  const { username } = query;

  const userDoc = await getUserWithUsername(username);

  // If no user, short circuit to 404 page
  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  // JSON serializable data
  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = firebaseQuery(
      collection(userDoc.ref, "posts"),
      where("published", "==", true),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    posts = (await getDocs(postsQuery)).docs.map(postToJSON);
  }

  return {
    props: { user, posts }, // will be passed to the page component as props
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main>
      <Metatags title={user.username} description={user.username} />
      <UserProfile user={user} />
      <Spacer y={2} />
      <Divider />
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mx-2">
        <PostFeed posts={posts} />
      </div>
    </main>
  );
}
