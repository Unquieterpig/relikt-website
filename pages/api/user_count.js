// API request that returns a JSON response with the amount of registered users in the Firebase database
import { firestore } from "@lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default async (req, res) => {
  // Get data from Firestore
  const userRef = collection(firestore, "users");
  const snapshot = await getDocs(userRef);

  const numberOfUsers = snapshot.size;

  // Return the count as JSON
  res.status(200).json({ numberOfUsers });
};
