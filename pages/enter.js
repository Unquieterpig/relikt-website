import styles from '@styles/Enter.module.css';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import GradientTop from '@components/GradientTop';

import { auth, firestore, googleAuthProvider } from '@lib/firebase';
import { signInWithPopup } from 'firebase/auth';
import { doc, getDoc, writeBatch } from 'firebase/firestore';
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '@lib/context';
import debounce from 'lodash.debounce';
import toast from 'react-hot-toast'

export default function Enter(props) {
  return (
    <>
        <GradientTop />

        <LoginContainer />
    </>
  );
}

// Container to put everything in
function LoginContainer() {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    // If the user and username both exist, redirect to generate page
    if (user && username) {
      router.push('/generate');
    }
  }, [user, username]);

    return (
      <div className={styles.loginContainer}>
        <Link href="/">
          <a>
            <Image src="/relikt_logo_cropped.png" alt="Logo of Relikt" width={900} height={300} className={styles.heroImage} />
          </a>
        </Link>

        <div className={styles.loginBox}>
          
        {/* 1. user signed out <SignInButton />
            2. user signed in, but missing username <UsernameForm />
            3. user signed in, has username route to generate page */}
        { user ? 
          !username ? <UsernameForm /> : null
          : 
          <SignInButton />
        }
            <div className="text-muted" style={{ fontSize: '10px' }}>
              By logging in, you agree to our <Link href="/terms"><a>Terms of Service</a></Link> and <Link href="/privacy"><a>Privacy Policy</a></Link>.
            </div>
        </div>
      </div>
    );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    try {
        await signInWithPopup(auth, googleAuthProvider);

        toast.success('Signed in!');
    } catch (error) {
        toast.error('Error signing in!');
    }
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={'/google.png'} /> Sign in with Google
    </button>
  );
}

function UsernameForm() {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const { user, username } = useContext(UserContext);

    const onChange = (e) => {
        // Force form value typed in form to match correct format
        const val = e.target.value.toLowerCase();
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

        // Only set form value if length is < 3 OR it passes regex
        if (val.length < 3) {
            setFormValue(val);
            setLoading(false);
            setIsValid(false);
        }

        if (re.test(val)) {
            setFormValue(val);
            setLoading(true);
            setIsValid(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        // Create refs for both documents
        const userDoc = doc(firestore, `users/${user.uid}`);
        const usernameDoc = doc(firestore, `usernames/${formValue}`);

        // Commit both docs together as a batch write.
        const batch = writeBatch(firestore);
        batch.set(userDoc, {
            username: formValue,
            photoURL: user.photoURL,
            displayName: user.displayName,
        });
        batch.set(usernameDoc, { uid: user.uid });

        await batch.commit();
        toast.success('Username created!');

    }

    //

    useEffect(() => {
        checkUsername(formValue);
    }, [formValue]);

    // Hit the database for username match after each debounced change
    // useCallback is required for debounce to work
    const checkUsername = useCallback(
        debounce(async (username) => {
        if (username.length >= 3){
          const docRef = doc(firestore, `usernames/${username}`);
          const ref = await getDoc(docRef);
          setIsValid(!ref.exists());
          setLoading(false);

        }
    }, 500), 
    []
    );

    return (
        !username && (
            <div className={styles.userNameBox}>
                <h3>Choose Username</h3>
                <form onSubmit={onSubmit}>
                    <input name="username" placeholder="Username" value={formValue} onChange={onChange} />

                    <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
                    <div className='box-center'>
                    <button type="submit" className="btn-green" disabled={!isValid}>
                        Choose 
                    </button>
                    </div>
                </form>
            </div>

        )
    );
}

function UsernameMessage({ username, isValid, loading }) {
    if (loading) {
        return <p>Checking...</p>;
    } else if (isValid) {
        return <p className="text-success">{username} is available!</p>;
    } else if (username && !isValid) {
        return <p className="text-danger">That username is taken!</p>;
    } else {
        return <p></p>;
    }
}