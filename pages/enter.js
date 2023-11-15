import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import GradientTop from "@components/GamesenseGradient";
import Metatags from "@components/Metatags";

import { auth, firestore, googleAuthProvider } from "@lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "@lib/context";
import debounce from "lodash.debounce";
import toast from "react-hot-toast";

export default function Enter(props) {
  return (
    <>
      <Metatags title="Login" description="Login to your account" />
      <GradientTop />

      <LoginContainer />
    </>
  );
}

// Container to put everything in
function LoginContainer() {
  const { user, username } = useContext(UserContext);
  const router = useRouter();

  // If the user and username both exist, redirect to generate page
  if (user && username) {
    router.push("/panel");
  }

  return (
    <div className="flex justify-center items-center text-center h-100% flex-col w-1/3 mx-auto">
      <div className="flex justify-center items-center flex-col gap-3 rounded-2xl bg-gray-50 dark:bg-neutral-950 my-3 p-5 text-center ring-1 ring-inset ring-gray-900/5 dark:ring-gray-300/5">
        {/* 1. user signed out <SignInButton />
            2. user signed in, but missing username <UsernameForm />
            3. user signed in, has username route to generate page */}
        {user ? !username ? <UsernameForm /> : <div></div> : <SignInPanel />}
        <div className="text-muted" style={{ fontSize: "10px" }}>
          By logging in, you agree to our{" "}
          <Link legacyBehavior href="/terms">
            <a>Terms of Service</a>
          </Link>{" "}
          and{" "}
          <Link legacyBehavior href="/privacy">
            <a>Privacy Policy</a>
          </Link>
          .
        </div>
      </div>
    </div>
  );
}

function SignInPanel() {
  return (
    <>
      <SignInButtonGoogle />
      <SignInButtonGithub />
      <SignInButtonTwitter />
      <SignInButtonMicrosoft />
      <SignInButtonFacebook />
    </>
  );
}

// Sign in with Google button
function SignInButtonGoogle() {
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);

      toast.success("Signed in!");
    } catch (error) {
      toast.error("Error signing in!");
    }
  };

  return (
    <button
      className="bg-white px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-black  hover:border-slate-400 dark:hover:border-slate-500 hover:brightness-90 hover:shadow transition duration-150"
      onClick={signInWithGoogle}
    >
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="Google Logo"
      />
      Sign in with Google
    </button>
  );
}

function SignInButtonGithub() {
  return (
    <button className="bg-neutral-700 px-4 py-2 border flex gap-2 border-slate-200 dark:border-neutral-700 rounded-lg text-neutral-200  hover:border-slate-400 dark:hover:border-slate-500 hover:brightness-90 hover:shadow transition duration-150">
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/512317/github-142.svg"
        loading="lazy"
        alt="Github Logo"
      />
      Sign in with Github
    </button>
  );
}

function SignInButtonTwitter() {
  return (
    <button className="bg-blue-500 px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-white  hover:border-slate-400 dark:hover:border-slate-500 hover:brightness-90 hover:shadow transition duration-150">
      <img
        className="w-6 h-6"
        src="https://authjs.dev/img/providers/twitter.svg"
        loading="lazy"
        alt="Twitter Logo"
      />
      Sign in with Twitter
    </button>
  );
}

function SignInButtonMicrosoft() {
  return (
    <button className="bg-white px-2 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-black  hover:border-slate-400 dark:hover:border-slate-500 hover:brightness-90 hover:shadow transition duration-150">
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/452062/microsoft.svg"
        loading="lazy"
        alt="Microsoft Logo"
      />
      Sign in with Microsoft
    </button>
  );
}

function SignInButtonFacebook() {
  return (
    <button className="bg-blue-500 px-2 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-white  hover:border-slate-400 dark:hover:border-slate-500 hover:brightness-90 hover:shadow transition duration-150">
      <img
        className="w-6 h-6"
        src="https://www.svgrepo.com/show/475647/facebook-color.svg"
        loading="lazy"
        alt="Facebook Logo"
      />
      Sign in with Facebook
    </button>
  );
}

function UsernameForm() {
  const [formValue, setFormValue] = useState("");
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
    toast.success("Username created!");
  };

  //

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
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
      <div className="flex justify-center items-center flex-col">
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="Username"
            value={formValue}
            onChange={onChange}
          />

          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />

          <div className="box-center">
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
