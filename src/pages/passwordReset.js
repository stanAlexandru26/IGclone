import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import * as ROUTES from '../constants/routes';
import { IconLock } from '../utils/getIcon';

export default function Login() {
  const [emailAddress, setEmailAddress] = useState('');

  const auth = getAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await sendPasswordResetEmail(auth, emailAddress);
    } catch (error) {
      setEmailAddress('');
    }
  };

  useEffect(() => {
    document.title = 'Password Reset - Instagram';
  }, []);

  return (
    <div className="flex h-screen w-screen items-center">
      <div className="mx-auto w-1/4 rounded-sm border ">
        <div className="flex flex-col items-center justify-center gap-3 p-6 ">
          <IconLock />
          <h1 className=" font-semibold "> Trouble Logging In?</h1>
          <p className="text-center text-sm text-gray-500 ">
            Enter your email, phone, or username and we&apos;ll send you a link
            to get back into your account.
          </p>
          <form onSubmit={handleSubmit} method="POST">
            <input
              aria-label="Enter your email address"
              className="mr-3 mb-2 h-2 w-full rounded border py-5 px-4 text-sm"
              type="text"
              value={emailAddress}
              placeholder="Email address"
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <button
              type="submit"
              disabled={!emailAddress}
              className={`h-8 w-full rounded bg-blue-500 font-bold text-white ${
                emailAddress
                  ? 'cursor-not-allowed opacity-50'
                  : 'active:bg-blue-300'
              } `}
            >
              Send Login Link
            </button>
          </form>

          <div className=" my-4  flex  w-full items-center ">
            <div className="grow border-t border-gray-400"></div>
            <span className="mx-5 grow-0 text-xs font-bold tracking-wide text-gray-400">
              OR
            </span>
            <div className="grow border-t border-gray-400"></div>
          </div>

          <p className="font-semibold">
            <Link to={ROUTES.SIGN_UP}>Create New Account</Link>
          </p>
        </div>
        <div className="flex w-full flex-col items-center justify-center border bg-white p-4">
          <p className="">
            <Link to={ROUTES.LOGIN} className="font-semibold">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
