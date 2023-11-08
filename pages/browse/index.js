import PostFeed from '@components/PostFeed';
import Loader from '@components/Loader';
import NavBarPanel from '@components/NavBarPanel';

import Link from 'next/link';

import { firestore, fromMillis, postToJSON } from '@lib/firebase';

import { useState } from 'react';

// Max post to query per page
const LIMIT = 2;

export async function getServerSideProps(context) {
    const postsQuery = firestore
        .collectionGroup('posts')
        .where('published', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(LIMIT);

    const posts = (await postsQuery.get()).docs.map(postToJSON);

    return {
        props: { posts }, // will be passed to the page component as props
    
    };
}


export default function Browse( props ){
    const [posts, setPosts] = useState(props.posts);
    const [loading, setLoading] = useState(false);

    const [postsEnd, setPostsEnd] = useState(false);

    const getMorePosts = async () => {
        setLoading(true);
        const last = posts[posts.length - 1];

        const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

        const query = firestore
            .collectionGroup('posts')
            .where('published', '==', true)
            .orderBy('createdAt', 'desc')
            .startAfter(cursor)
            .limit(LIMIT);

        const newPosts = (await query.get()).docs.map((doc) => doc.data());

        setPosts(posts.concat(newPosts));
        setLoading(false);

        if (newPosts.length < LIMIT) {
            setPostsEnd(true);
        }
    };

    return (
        <>
            <NavBarPanel />
            <main>
            <div className='card'> 
            <Link href="/browse/admin">
                <button className='btn-blue'>Create New Post</button> 
            </Link>
            </div>
            <PostFeed posts={posts} />

            {posts.length === 0 ? ('No posts to load') : (!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>)}

            <Loader show={loading} />

            {postsEnd && 'You have reached the end!'}
        </main>
        </>
    )
}