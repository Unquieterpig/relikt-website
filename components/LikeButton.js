import { firestore, auth } from "@lib/firebase";
import { collection, doc, increment, writeBatch } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";
import { Button } from "@nextui-org/react";

// Allows user to like a post
export default function LikeButton({ postRef }) {
  // Listen to like document for currently logged in user
  // todo; Fix later when user signs out
  const likeRef = doc(collection(postRef, "likes"), auth.currentUser.uid);
  const [likeDoc] = useDocument(likeRef);

  // Create a user-to-post relationship
  const addLike = async () => {
    const uid = auth.currentUser.uid;
    const batch = writeBatch(firestore);

    batch.update(postRef, { likeCount: increment(1) });
    batch.set(likeRef, { uid });

    await batch.commit();
  };

  // Remove a user-to-post relationship
  const removeLike = async () => {
    const batch = writeBatch(firestore);

    batch.update(postRef, { likeCount: increment(-1) });
    batch.delete(likeRef);

    await batch.commit();
  };

  return likeDoc?.exists() ? (
    <Button isIconOnly variant="ghost" onClick={removeLike} color="danger">
      👎
    </Button>
  ) : (
    <Button isIconOnly variant="ghost" onClick={addLike} color="success">
      👍
    </Button>
  );
}
