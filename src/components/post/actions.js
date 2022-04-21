import React, { useState, useContext } from 'react';
import UserContext from '../../context/userContext';
import FirebaseContext from '../../context/firebaseContext';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import useUser from '../../hooks/useUser';

export default function Actions({
  docId,
  totalLikes,
  likedPost,
  handleFocus,
  savedPost,
}) {
  const user = useContext(UserContext);
  const userAdvanced = useUser();
  const [toggleLiked, setToggleLiked] = useState(likedPost);
  const [likes, setLikes] = useState(totalLikes);
  const { db } = useContext(FirebaseContext);
  const [toggleSaved, setToggleSaved] = useState(savedPost);

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);

    const document = await doc(db, 'posts', docId);

    await updateDoc(document, {
      likes: toggleLiked ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  const handleToggleSaved = async () => {
    setToggleSaved((toggleSaved) => !toggleSaved);

    const postDocument = await doc(db, 'posts', docId);
    const userDocument = await doc(db, 'users', userAdvanced.docId);
    await updateDoc(postDocument, {
      savedUsers: toggleSaved ? arrayRemove(user.uid) : arrayUnion(user.uid),
    });
    await updateDoc(userDocument, {
      savedPosts: toggleSaved ? arrayRemove(docId) : arrayUnion(docId),
    });
  };

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <svg
            onClick={() => handleToggleLiked((toggleLiked) => !toggleLiked)}
            className={`mr-4 w-7 cursor-pointer select-none hover:opacity-50 ${
              toggleLiked ? 'fill-current text-red-500' : 'text-black'
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            tabIndex={0}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797  "
            />
          </svg>
          <svg
            onClick={handleFocus}
            className=" text-black-light w-6 cursor-pointer select-none hover:opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            tabIndex={0}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
            />
          </svg>
        </div>
        <div>
          <svg
            onClick={handleToggleSaved}
            className={`hover:cursor-pointer hover:opacity-50 ${
              toggleSaved ? 'fill-black' : 'fill-white'
            }`}
            aria-label="Save"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <polygon
              points="20 21 12 13.44 4 21 4 3 20 3 20 21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></polygon>
          </svg>
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-bold">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </>
  );
}
