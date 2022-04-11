import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as ROUTES from '../constants/routes';
import LogInTemplate from '../assets/images/login/iphone-cutout-template.png';
import LogInLogo from '../assets/images/logo.png';
import CutOut0 from '../assets/images/login/cutout-0.png';
import CutOut1 from '../assets/images/login/cutout-1.png';
import CutOut2 from '../assets/images/login/cutout-2.png';
import CutOut3 from '../assets/images/login/cutout-3.png';
import { IconFacebook } from '../utils/getIcon';

export default function Login() {
  let navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [currentCutOut, setCurrentCutOut] = useState(0);
  const [error, setError] = useState('');

  const cutOutArray = [CutOut0, CutOut1, CutOut2, CutOut3];
  const auth = getAuth();
  const isValid = password === '' || emailAddress === '';

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, emailAddress, password);
      navigate(ROUTES.DASHBOARD);
    } catch (error) {
      setEmailAddress('');
      setPassword('');
      setError(error.message);
    }
  };

  useEffect(() => {
    document.title = 'Login - Instagram';
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCutOut((currentCutOut + 1) % cutOutArray.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [currentCutOut]);

  return (
    <div className=" mx-auto flex  h-screen w-screen items-center justify-center">
      <div className="flex   ">
        <div className="relative hidden md:block ">
          <img src={LogInTemplate} alt="iPhone with Instagram app" />
          <img
            className="absolute inset-x-1/3  top-6 "
            src={cutOutArray[currentCutOut]}
          />
        </div>
      </div>
      <div className="flex w-1/5 flex-col">
        <div className="mb-4 flex flex-col items-center border bg-white p-4">
          <h1 className="flex w-full justify-center">
            <img
              src={LogInLogo}
              alt="Instagram Logo"
              className="mt-2 mb-4 w-6/12"
            />
          </h1>

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email address"
              className="mr-3 mb-2 h-2 w-full rounded border py-5 px-4 text-sm"
              type="text"
              value={emailAddress}
              placeholder="Email address"
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              aria-label="Enter your password"
              className="mr-3 mb-2 h-2 w-full rounded border py-5 px-4 text-sm"
              type="password"
              value={password}
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              type="submit"
              disabled={isValid}
              className={`h-8 w-full rounded bg-blue-500 font-bold text-white ${
                isValid ? 'cursor-not-allowed opacity-50' : 'active:bg-blue-300'
              }`}
            >
              Log In
            </button>
          </form>
          <div className=" my-4  flex  w-full items-center ">
            <div className="grow border-t border-gray-400"></div>
            <span className="mx-5 grow-0 text-xs font-bold tracking-wide text-gray-400">
              OR
            </span>
            <div className="grow border-t border-gray-400"></div>
          </div>
          <button
            className={
              ' flex h-8 w-full items-center justify-center  gap-2 rounded font-semibold text-blue-600 active:opacity-50'
            }
          >
            <IconFacebook />
            Log in with Facebook
          </button>
          <div className="my-2 flex justify-center">
            <Link to={ROUTES.PASSWORD_RESET}>
              <p className="text-sm text-blue-500">Forgot Password?</p>
            </Link>
          </div>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
        </div>
        <div className="flex w-full flex-col items-center justify-center border bg-white p-4">
          <p className="text-sm">
            Don&apos;t have an account?{' '}
            <Link to={ROUTES.SIGN_UP} className="font-semibold text-blue-500">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
