// API request that returns a JSON response with the amount of registered users in the Firebase database
import { firestore } from '../../lib/firebase';

export default async (req, res) => {
    const snapshot = await firestore.collection('users').get();

    // Use the size property of the snapshot to get the number of users
    const numberOfUsers = snapshot.size;

    // Return the count as JSON
    res.status(200).json({ numberOfUsers });
}
