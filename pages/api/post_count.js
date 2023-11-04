// API request that returns a JSON response with the amount of posts in the Firebase database
import { firestore } from '../../lib/firebase';

export default async (req, res) => {
    const snapshot = await firestore.collectionGroup('posts').get();

    // Use the size property of the snapshot to get the number of posts
    const numberOfPosts = snapshot.size;

    // Return the count as JSON
    res.status(200).json({ numberOfPosts });
}
