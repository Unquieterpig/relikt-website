// API request that returns a JSON response of the amount of registered users in the Firebase database
import { auth, firestore } from '../../lib/firebase';

export default async (req, res) => {
    const snapshot = await firestore.collection('users').get();
    const users = [];

    snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json({ users });
}