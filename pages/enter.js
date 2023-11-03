import styles from '@styles/Enter.module.css';

import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { useContext, useEffect, useState, useCallback } from 'react';
import { UserContext } from '@lib/context';
import debounce from 'lodash.debounce';
import toast from 'react-hot-toast'

export default function Enter(props) {
    const { user, username } = useContext(UserContext);

  // 1. user signed out <SignInButton />
  // 2. user signed in, but missing username <UsernameForm />
  // 3. user signed in, has username <SignOutButton />
  return (
    <main>
        <GradientTop />

      {user ? 
        !username ? <UsernameForm /> : <SignOutButton /> 
        : 
        <SignInButton />
      }
    </main>
  );
}

// Container to put everything in
function LoginContainer() {
    return (
        <div className="login-container">
      <Link href="/">
        <a>
          <Image src="/imgs/relikt_logo_cropped.png" alt="Logo of Relikt" width={100} height={50} />
        </a>
      </Link>

      <div className="login-box">
        <form method="POST" onSubmit={handleSubmit}>
          <h3>Log in or <Link href="/Signup"><a>Sign up</a></Link></h3>
          <div className="form-group w-100">
            <input type="email" className="form-control" id="InputEmail" name="username" placeholder="Email" required />
          </div>
          <div className="form-group w-100">
            <input type="password" className="form-control" id="InputPassword" name="password" placeholder="Password" required />
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input type="checkbox" className="custom-control-input" id="customCheck1" name="rememberMe" />
              <label className="custom-control-label" for="customCheck1">Remember me</label>
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>

          <div className="text"> Forgot Password? <Link href="/forgotPassword"><a><b>Click Here</b></a></Link></div>

          {/* Separator */}
          <div className="divider">
            <hr className="left" />
            <span>OR</span>
            <hr className="right" />
          </div>

          {/* OAuth buttons */}
          <div className="OAuthButtons">
            <Link href="/auth/google"><a className="btn"><i className="fab fa-google"></i></a></Link>
            <Link href="/auth/microsoft"><a className="btn"><i className="fab fa-microsoft"></i></a></Link>
            {/* ... other buttons ... */}
          </div>

          <div className="text-muted" style={{ fontSize: '10px' }}>
            By logging in, you agree to our <Link href="/terms"><a>Terms of Service</a></Link> and <Link href="/privacy"><a>Privacy Policy</a></Link>.
          </div>
        </form>
      </div>
    </div>
    );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    try {
        await auth.signInWithPopup(googleAuthProvider);

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

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
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
        const userDoc = firestore.doc(`users/${user.uid}`);
        const usernameDoc = firestore.doc(`usernames/${formValue}`);

        // Commit both docs together as a batch write.
        const batch = firestore.batch();
        batch.set(userDoc, {
            username: formValue,
            photoURL: user.photoURL,
            displayName: user.displayName,
        });
        batch.set(usernameDoc, { uid: user.uid });

        await batch.commit();
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
            const ref = firestore.doc(`usernames/${username}`);
            const { exists } = await ref.get();
            console.log('Firestore read executed!');
            setIsValid(!exists);
            setLoading(false);

        }
    }, 500), 
    []
    );

    return (
        !username && (
            <section>
                <h3>Choose Username</h3>
                <form onSubmit={onSubmit}>
                    <input name="username" placeholder="myname" value={formValue} onChange={onChange} />

                    <UsernameMessage username={formValue} isValid={isValid} loading={loading} />

                    <button type="submit" className="btn-green" disabled={!isValid}>
                        Choose 
                    </button>

                    <h3>Debug State</h3>
                    <div>
                        Username: {formValue}
                        <br />
                        Loading: {loading.toString()}
                        <br />
                        Username Valid: {isValid.toString()}
                    </div>
                </form>
            </section>

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

function GradientTop() {
    return <div className={styles.gradientTop}></div>;
}