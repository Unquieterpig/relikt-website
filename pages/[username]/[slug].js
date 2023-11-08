import styles from '@styles/Post.module.css';
import PostContent from '@components/PostContent';
import Metatags from '@components/Metatags';
import LikeButton from '@components/LikeButton';
import AuthCheck from '@components/AuthCheck';

import Link from 'next/link';
import { firestore, getUserWithUsername, postToJSON } from '@lib/firebase';
import { collection, collectionGroup, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { useDocumentData } from 'react-firebase-hooks/firestore';

export async function getStaticProps({ params }){
    const { username, slug } = params;
    const userDoc = await getUserWithUsername(username);

    let post;
    let path;

    if (userDoc) {
        const postRef = doc(collection(userDoc.ref, 'posts'), slug);
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

    return (
        <main className={styles.container}>
            <Metatags title={props.username} description={props.slugs} />

            <section>
                <PostContent post={post} />
            </section>

            <aside className="card">
                <p>
                    <strong>{post.likeCount || 0} 👍</strong>
                </p>

                <AuthCheck>
                    <LikeButton postRef={postRef} />
                </AuthCheck>
            </aside>

        </main>
    )
}