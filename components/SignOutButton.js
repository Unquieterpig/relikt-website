import { auth } from '@lib/firebase';

// Sign out button
export default function SignOutButton() {
    return <button onClick={() => auth.signOut()}>Sign Out</button>;
  }