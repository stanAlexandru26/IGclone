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
    <div className="w-screen h-screen flex items-center">
      <div className="mx-auto border w-1/4 rounded-sm ">
        <div className="p-6 gap-3 flex flex-col items-center justify-center ">
          <IconLock />
          <h1 className=" font-semibold "> Trouble Logging In?</h1>
          <p className="text-gray-500 text-center text-sm ">
            Enter your email, phone, or username and we&apos;ll send you a link
            to get back into your account.
          </p>
          <form onSubmit={handleSubmit} method="POST">
            <input
              aria-label="Enter your email address"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="text"
              value={emailAddress}
              placeholder="Email address"
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <button
              type="submit"
              className={`bg-blue-500 font-semibol text-white w-full rounded h-8 font-bold
              }`}
            >
              Send Login Link
            </button>
          </form>

          <div className=" w-full  flex  items-center ">
            <div className="grow border-t border-gray-400"></div>
            <span className="grow-0 mx-5 text-gray-400">OR</span>
            <div className="grow border-t border-gray-400"></div>
          </div>

          <p className="font-semibold">
            <Link to={ROUTES.SIGN_UP}>Create New Account</Link>
          </p>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
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
