import { auth } from '@lib/firebase';
import { useRouter } from 'next/router';

// Sign out button
export default function SignOutButton() {
    const router = useRouter();
    
    // Sign out user then redirect to homepage
    const handleSignOut = async () => {
        await auth.signOut();
        router.push('/');
    };

    return <button onClick={handleSignOut}>Sign Out</button>;
}
