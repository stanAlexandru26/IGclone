import React, { useContext, useState } from 'react';
import UserContext from '../../context/userContext';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';
import { getAuth, updatePassword } from 'firebase/auth';

export default function AccountPassword() {
  const user = useContext(UserContext);
  const { photoFirebaseUrl } = useFirebaseStorage(user.photoURL, 'avatar');

  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const isValid = password.length > 6;

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const handleSubmit = (event) => {
    event.preventDefault();
    updatePassword(currentUser, password)
      .then(() => {
        setPassword('');
        setError('');
        console.log('you changed your password');
        auth.signOut();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <>
      <div className="h-full w-full p-4 md:flex md:items-start md:justify-center ">
        <div className="mb-2  flex flex-col  gap-2 md:w-10/12 md:items-center">
          {/* header */}
          <div className="flex  flex-row items-center gap-2 md:w-full  md:basis-1/4">
            <div className=" min-w-max md:w-28  md:flex-auto ">
              <img
                className={`h-12 w-12 rounded-full  `}
                src={photoFirebaseUrl}
                alt={`${user.displayName} profile picture`}
              />
            </div>
            <div className="flex w-full max-w-sm flex-col gap-2  md:w-full md:flex-auto  ">
              <h1 className="flex-auto font-semibold ">{user.displayName}</h1>
            </div>
          </div>
          {/* body */}
          <div className="flex flex-col gap-2 md:w-full md:basis-1/4 md:flex-row md:items-center">
            <label
              htmlFor="name"
              className="font-semibold md:w-28  md:flex-auto"
            >
              New Password
            </label>
            <input
              className="w-full max-w-sm rounded border p-2"
              type="password"
              id="name"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim(' '))}
            />
          </div>
          <button
            disabled={!isValid}
            className={`h-8 w-full max-w-sm rounded bg-blue-500  font-bold text-white  ${
              isValid
                ? 'hover:cursor-pointer  active:bg-blue-500/50 '
                : 'cursor-not-allowed bg-blue-500/50 active:bg-blue-500/50  '
            }`}
            onClick={handleSubmit}
          >
            Change Password
          </button>
          {error && (
            <p className="mb-4 text-center text-xs text-red-500">{error}</p>
          )}
        </div>
      </div>
    </>
  );
}
