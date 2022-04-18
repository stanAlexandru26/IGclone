import React, { useContext, useEffect, useState } from 'react';
import useUser from '../../hooks/useUser';
import UserContext from '../../context/userContext';
import FirebaseContext from '../../context/firebaseContext';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth, updateEmail, updateProfile, signOut } from 'firebase/auth';
import { ref, uploadBytes } from 'firebase/storage';

export default function AccountEdit() {
  const user = useUser();
  const contextUser = useContext(UserContext);
  const { db, storage } = useContext(FirebaseContext);
  const auth = getAuth();

  const { photoFirebaseUrl } = useFirebaseStorage(
    contextUser.photoURL,
    'avatar',
  );

  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [file, setFile] = useState(null);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (user) {
      if (
        user.username !== username ||
        user.fullName !== fullName ||
        user.email !== email
      ) {
        setIsValid(true);
      } else {
        setIsValid(false);
      }
    }
  }, [username, fullName, email]);

  const handleRename = async (image, postId) => {
    if (image) {
      let renamedImg = new File([image], `${postId}`, {
        type: 'image/jpeg',
      });
      return renamedImg;
    }
  };

  useEffect(() => {
    const handleImageChange = async () => {
      if (file !== null && file !== undefined && user) {
        const userRef = doc(db, 'users', user.docId);
        await updateDoc(userRef, {
          imageSrc: `${user.userId}.jpg`,
        });
        const storageRef = ref(storage, `avatars/${user.userId}.jpg`);
        const renamedImg = await handleRename(file, user.userId);

        await uploadBytes(storageRef, renamedImg).then(() => {
          console.log('Uploaded a blob or file!');
        });
        await updateProfile(auth.currentUser, {
          photoURL: `${user.userId}.jpg`,
        });
        setFile(null);
      }
    };

    handleImageChange();
  }, [file]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userRef = doc(db, 'users', user.docId);

    if (username !== user.username && username.length > 0) {
      try {
        await updateDoc(userRef, {
          username: username,
        });
        updateProfile(auth.currentUser, {
          displayName: username,
        });
        console.log('it worked username');
      } catch (error) {
        setError(error.message);
      }
    }
    if (fullName !== user.fullName && fullName.length > 0) {
      try {
        await updateDoc(userRef, {
          fullName: fullName,
        });
        console.log('it worked fullName');
      } catch (error) {
        setError(error.message);
      }
    }
    if (email !== user.emailAddress && email.length > 0) {
      try {
        await updateEmail(auth.currentUser, email);
        await updateDoc(userRef, {
          emailAddress: email,
        });
        signOut(auth);
        console.log('it worked emailAddress');
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <>
      {user && (
        <div className="h-full w-full p-4 md:flex md:items-start md:justify-center ">
          <div className="mb-2  flex flex-col  gap-2 md:w-10/12 md:items-center">
            {/* header */}
            <div className="flex  flex-row items-center gap-2 md:w-full md:basis-1/4">
              <div className="min-w-max  md:w-28  md:flex-auto ">
                <img
                  className={`h-12 w-12 rounded-full `}
                  src={photoFirebaseUrl}
                  alt={`${user.displayName} profile picture`}
                />
              </div>
              <div className="flex w-full max-w-sm flex-col gap-2  md:w-full md:flex-auto  ">
                <h1 className="flex-auto font-semibold ">{user.username}</h1>
                <label
                  htmlFor="photoInput"
                  className="text-sm font-semibold text-blue-500 hover:cursor-pointer active:text-blue-300"
                >
                  Change Profile Photo{' '}
                </label>
                <input
                  id="photoInput"
                  type="file"
                  accept=".jpg"
                  className="hidden"
                  onChange={(event) => setFile(event.target.files[0])}
                />
              </div>
            </div>
            {/* body */}
            {/* fullName */}
            <div className="flex flex-col gap-2 md:w-full md:basis-1/4 md:flex-row md:items-center">
              <label
                htmlFor="name"
                className="font-semibold md:w-28  md:flex-auto"
              >
                {' '}
                Name
              </label>
              <input
                className="w-full max-w-sm rounded border p-2"
                type="text"
                id="name"
                defaultValue={user.fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            {/* username */}
            <div className="flex flex-col gap-2 md:w-full md:basis-1/4 md:flex-row md:items-center">
              <label
                htmlFor="username"
                className="font-semibold md:w-28  md:flex-auto"
              >
                {' '}
                Username
              </label>
              <input
                className="w-full max-w-sm rounded border p-2"
                type="text"
                id="username"
                defaultValue={user.username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            {/* email */}
            <div className="flex flex-col gap-2 md:w-full md:basis-1/4 md:flex-row md:items-center ">
              <label
                htmlFor="email"
                className="font-semibold md:w-28 md:flex-auto"
              >
                {' '}
                Email
              </label>
              <input
                className="w-full max-w-sm rounded border p-2"
                type="email"
                id="email"
                defaultValue={user.emailAddress}
                onChange={(e) => setEmail(e.target.value)}
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
              Submit
            </button>
            {error && (
              <p className="mb-4 text-center text-xs text-red-500">{error}</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
