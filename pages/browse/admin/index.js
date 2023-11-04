import AuthCheck from "@components/AuthCheck";
import PostFeed from "@components/PostFeed";
import NavBarPanel from "@components/NavBarPanel";

import { firestore, auth, serverTimestamp } from "@lib/firebase";
import { UserContext } from "@lib/context";

import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';

export default function AdminPostsPage(props) {
    return (
        <>
        <NavBarPanel />
        <main>
            <AuthCheck>
                <PostList />
                <CreateNewPost />
            </AuthCheck>
        </main>
        </>
    );
}

function PostList() {
    const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
    const query = ref.orderBy('createdAt');
    const [querySnapshot] = useCollection(query);

    const posts = querySnapshot?.docs.map((doc) => doc.data());

    return (
        <>
            <h1>Your Posts</h1>
            <PostFeed posts={posts} admin />
        </>
    );
}

function CreateNewPost() {
    const router = useRouter();
    const { username } = useContext(UserContext);
    const [title, setTitle] = useState('');

    // Ensure slug is URL safe
    const slug = encodeURI(kebabCase(title));

    // Validate length
    const isValid = title.length > 3 && title.length < 100;

    // Create a new post in firestore
    const createPost = async (e) => {
        e.preventDefault();
        const uid = auth.currentUser.uid;
        const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);

        // Tip: give all fields a default value here
        const data = {
            title,
            slug,
            uid,
            username,
            published: false,
            content: '# hello world!',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
            likeCount: 0,
        };

        await ref.set(data);

        toast.success('Post created!');

        // Imperative navigation after doc is set
        router.push(`/browse/admin/${slug}`);
    };

    return (
        <form onSubmit={createPost}>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="My Awesome Voice!"
                className="input"
            />
            <p>
                <strong>URL:</strong> {slug}
            </p>
            <button type="submit" disabled={!isValid} className="btn-green">
                Create New Post
            </button>
        </form>
    );
}