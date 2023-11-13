import styles from '@styles/Post.module.css';
import PostContent from '@components/PostContent';
import Metatags from '@components/Metatags';
import LikeButton from '@components/LikeButton';
import AuthCheck from '@components/AuthCheck';
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

import Link from 'next/link';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import { useContext } from 'react';

export async function getStaticProps({ params }){
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

export async function getStaticPaths(){
    const postsQuery = query(collectionGroup(firestore, 'posts'));
    const snapshot = await getDocs(postsQuery);

    const paths = snapshot.docs.map((doc) => {
        const { slug, username } = doc.data();
        return {
            params: { username, slug },
        };
    });

    return {
        paths,
        fallback: 'blocking',
    };
}

export default function Post(props){
    const postRef = doc(firestore, props.path);
    const [realtimePost] = useDocumentData(postRef);

    const post = realtimePost || props.post;

    const { user: currentUser } = useContext(UserContext);

    return (
        <main className={styles.container}>
            <Metatags title={post.title} description={post.title} />

            <section>
                <PostContent post={post} />
            </section>

            <aside className="card">
                <p>
                    <strong>{post.likeCount || 0} 👍</strong>
                </p>

                <AuthCheck fallback={
                        <Link href="/enter">
                            <button>Sign Up</button>
                        </Link>
                    }
                >
                    <LikeButton postRef={postRef} />
                </AuthCheck>

                {currentUser?.uid === post.uid && (
                    <Link legacyBehavior href={`/panel/browse/admin/${post.slug}`}>
                        <button className="btn-blue">Edit</button>
                    </Link>
                )}
            </aside>
        </main>
    )
}