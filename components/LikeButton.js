import { firestore, auth, increment } from '@lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';

// todo; fix this.  it's not working

// Allows user to like a post 
export default function Like({ postRef }) {
  // Listen to like document for currently logged in user
  const likeRef = postRef.collection('likes').doc(auth.currentUser.uid);
  const [likeDoc] = useDocument(likeRef);

  // Create a user-to-post relationship
  const addLike = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    batch.update(postRef, { likeCount: increment(1) });
    batch.set(likeRef, { uid });

    await batch.commit();
  };

  // Remove a user-to-post relationship
  const removeLike = async () => {
    const batch = firestore.batch();

    batch.update(postRef, { likeCount: increment(-1) });
    batch.delete(likeRef);

    await batch.commit();
  };

  return likeDoc?.exists() ? (
    <button onClick={removeLike}>👎 UnThumbs</button>
  ) : (
    <button onClick={addLike}>👍 Thumbs</button>
  );
}