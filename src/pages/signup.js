import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { IconLogo, IconFacebookInverted } from '../utils/getIcon';
import FirebaseContext from '../context/firebaseContext';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function SignUp() {
  const navigate = useNavigate();
  const { db } = useContext(FirebaseContext);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const isValid =
    username === '' ||
    fullName === '' ||
    password === '' ||
    emailAddress === '';

  const auth = getAuth();

  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  }, []);

  async function checkUserNameTaken(username) {
    const q = query(collection(db, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs.length > 0) {
      setError('Username is taken');
      return true;
    } else {
      setError('');
      return false;
    }
  }

  const handleSignUp = async (event) => {
    event.preventDefault();

    const userNameTaken = await checkUserNameTaken(username);

    if (userNameTaken) {
      setError('Username is taken');
    } else {
      try {
        const user = await createUserWithEmailAndPassword(
          auth,
          emailAddress,
          password,
        );

        // await updateProfile(auth.currentUser, {
        //   displayName: fullName,
        //   photoURL: 'avatars/default_avatar',
        // });

        await addDoc(collection(db, 'users'), {
          userId: user.user.uid,
          username: username.toLocaleLowerCase(),
          fullName: fullName,
          emailAddress: emailAddress,
          following: [],
          followers: [],
          dateCreated: Date.now(),
        });
        navigate(ROUTES.DASHBOARD);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="container flex mx-auto max-w-xs items-center h-screen">
      <div className="flex flex-col">
        <div className="flex flex-col items-center bg-white  border mb-4 p-8">
          <IconLogo />
          <h1 className="text-gray-400 text-center  font-semibold my-3">
            Sign up to see photos and videos from your friends.
          </h1>
          <button
            className={
              'bg-blue-500 flex items-center justify-center gap-2 text-white w-full rounded h-8 font-semibold active:opacity-50'
            }
          >
            <IconFacebookInverted />
            Log in with Facebook
          </button>
          <div className=" w-full  flex  items-center my-4 ">
            <div className="grow border-t border-gray-400"></div>
            <span className="grow-0 mx-5 text-xs font-bold tracking-wide text-gray-400">
              OR
            </span>
            <div className="grow border-t border-gray-400"></div>
          </div>
          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
              type="text"
              placeholder="Username"
              value={username}
              onChange={({ target }) => setUsername(target.value.toLowerCase())}
            />
            <input
              aria-label="Enter your full name"
              className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
            />
            <input
              aria-label="Enter your email address"
              className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
              type="text"
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }) =>
                setEmailAddress(target.value.toLowerCase())
              }
            />

            <input
              aria-label="Enter your password"
              className="text-sm text-gray w-full mr-3 py-5 px-4 h-2 border bg-gray-background rounded mb-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              disabled={isValid}
              type="submit"
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold  ${
                isValid ? 'cursor-not-allowed opacity-50' : 'active:bg-blue-300'
              }`}
            >
              Sign Up
            </button>
          </form>
          {error && (
            <p className="mb-4 text-xs text-red-500 text-center">{error}</p>
          )}
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
          <p className="text-sm">
            Have an account?{` `}
            <Link to={ROUTES.LOGIN} className="text-blue-500">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
