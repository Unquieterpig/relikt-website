// API request that returns a JSON response with the amount of posts in the Firebase database
import { firestore } from "@lib/firebase";
import { collectionGroup, getDocs } from "firebase/firestore";

export default async (req, res) => {
  // Get data from Firestore
  const postRef = collectionGroup(firestore, "posts");
  const snapshot = await getDocs(postRef);

  const numberOfPosts = snapshot.size;

  // Return the count as JSON
  res.status(200).json({ numberOfPosts });
};
