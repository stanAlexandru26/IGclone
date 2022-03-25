import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as ROUTES from '../constants/routes';
import LogInTemplate from '../assets/images/iphone-cutout-template.png';
import LogInLogo from '../assets/images/logo.png';
import CutOut0 from '../assets/images/login/cutout-0.png';
import CutOut1 from '../assets/images/login/cutout-1.png';
import CutOut2 from '../assets/images/login/cutout-2.png';
import CutOut3 from '../assets/images/login/cutout-3.png';

export default function Login() {
  let navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [currentCutOut, setCurrentCutOut] = useState(0);
  const [error, setError] = useState('');

  const cutOutArray = [CutOut0, CutOut1, CutOut2, CutOut3];
  const auth = getAuth();

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
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5 ">
        <div className="relative ">
          <img src={LogInTemplate} alt="iPhone with Instagram app" />
          <img
            className="absolute inset-x-1/3  top-6 "
            src={cutOutArray[currentCutOut]}
          />
        </div>
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border mb-4">
          <h1 className="flex justify-center w-full">
            <img
              src={LogInLogo}
              alt="Instagram Logo"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email address"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="text"
              value={emailAddress}
              placeholder="Email address"
              onChange={({ target }) => setEmailAddress(target.value)}
            />
            <input
              aria-label="Enter your password"
              className="text-sm w-full mr-3 py-5 px-4 h-2 border rounded mb-2"
              type="password"
              value={password}
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <button
              type="submit"
              className={`bg-blue-500 text-white w-full rounded h-8 font-bold 
            }`}
            >
              Log In
            </button>
          </form>
          <div className=" w-full  flex  items-center ">
            <div className="grow border-t border-gray-400"></div>
            <span className="grow-0 mx-5 text-gray-400">OR</span>
            <div className="grow border-t border-gray-400"></div>
          </div>
          <div className="flex justify-center">
            <Link to={ROUTES.PASSWORD_RESET}>
              <p className="text-sm text-blue-500">Forgot Password</p>
            </Link>
          </div>
          {error && <p className="mb-4 text-xs text-red-500">{error}</p>}
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 border">
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
