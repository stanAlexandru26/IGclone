import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import { IconLogo, IconFacebookInverted } from '../utils/getIcon';
import FirebaseContext from '../context/firebaseContext';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';

export default function SignUp() {
  const navigate = useNavigate();
  const { db } = useContext(FirebaseContext);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();


  useEffect(() => {
    document.title = 'Sign Up - Instagram';
  }, []);

  
  const isValid =
    username === '' ||
    fullName === '' ||
    password === '' ||
    emailAddress === '';


  

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

        await updateProfile(auth.currentUser, {
          displayName: username,
          photoURL: 'default_avatar.jpg',
        });

        await addDoc(collection(db, 'users'), {
          userId: user.user.uid,
          username: username,
          fullName: fullName,
          emailAddress: emailAddress,
          following: [],
          followers: [],
          dateCreated: Date.now(),
          imageSrc: 'default_avatar.jpg',
        });
        navigate(ROUTES.DASHBOARD);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="container mx-auto flex h-screen max-w-xs items-center">
      {/* SignUp component */}
      <div className="flex flex-col">
        {/* Header */}
        <div className="mb-4 flex flex-col items-center  border bg-white p-8">
          <IconLogo />
          <h1 className="my-3 text-center  font-semibold text-gray-400">
            Sign up to see photos and videos from your friends.
          </h1>
          {/* Log with Facebook button */}
          <button
            className={
              'flex h-8 w-full items-center justify-center gap-2 rounded bg-blue-500 font-semibold text-white active:opacity-50'
            }
          >
            <IconFacebookInverted />
            Log in with Facebook
          </button>
          <div className=" my-4  flex  w-full items-center ">
            <div className="grow border-t border-gray-400"></div>
            <span className="mx-5 grow-0 text-xs font-bold tracking-wide text-gray-400">
              OR
            </span>
            <div className="grow border-t border-gray-400"></div>
          </div>
          {/* SignUp form */}
          <form onSubmit={handleSignUp} method="POST">
            {/* UserName */}
            <input
              aria-label="Enter your username"
              className="text-gray bg-gray-background mr-3 mb-2 h-2 w-full rounded border py-5 px-4 text-sm"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            {/* FullName */}
            <input
              aria-label="Enter your full name"
              className="text-gray bg-gray-background mr-3 mb-2 h-2 w-full rounded border py-5 px-4 text-sm"
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
            {/* EmailAddress */}
            <input
              aria-label="Enter your email address"
              className="text-gray bg-gray-background mr-3 mb-2 h-2 w-full rounded border py-5 px-4 text-sm"
              type="text"
              placeholder="Email address"
              value={emailAddress}
              onChange={(event) =>
                setEmailAddress(event.target.value.toLocaleLowerCase())
              }
            />
            {/* Password */}
            <input
              aria-label="Enter your password"
              className="text-gray bg-gray-background mr-3 mb-2 h-2 w-full rounded border py-5 px-4 text-sm"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {/* SignUp button */}
            <button
              disabled={isValid}
              type="submit"
              className={`h-8 w-full rounded bg-blue-500 font-bold text-white  ${
                isValid ? 'cursor-not-allowed opacity-50' : 'active:bg-blue-300'
              }`}
            >
              Sign Up
            </button>
          </form>
          {/* Error */}
          {error && (
            <p className="mb-4 text-center text-xs text-red-500">{error}</p>
          )}
        </div>
        {/* LogIn */}
        <div className="flex w-full flex-col items-center justify-center border bg-white p-4">
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
