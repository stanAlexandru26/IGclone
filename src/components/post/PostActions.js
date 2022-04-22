import React, { useState, useContext } from 'react';
import UserContext from '../../context/userContext';
import FirebaseContext from '../../context/firebaseContext';
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import useUser from '../../hooks/useUser';
import { ReactComponent as PostActionLikeIcon } from '../../assets/svg/PostActionLikeIcon.svg';
import { ReactComponent as PostActionCommentIcon } from '../../assets/svg/PostActionCommentIcon.svg';
import { ReactComponent as PostActionSavedIcon } from '../../assets/svg/PostActionSavedIcon.svg';

export default function PostActions({
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
        <div className="flex items-center">
          <PostActionLikeIcon
            onClick={() => handleToggleLiked((toggleLiked) => !toggleLiked)}
            className={`mr-4 w-7 cursor-pointer select-none hover:opacity-50 ${
              toggleLiked ? 'fill-red-500 text-red-500 ' : 'fill-white'
            }`}
          />
          <PostActionCommentIcon
            onClick={handleFocus}
            className=" text-black-light w-7 cursor-pointer select-none hover:opacity-50"
          />
        </div>
        <div>
          <PostActionSavedIcon
            onClick={handleToggleSaved}
            className={`hover:cursor-pointer hover:opacity-50 ${
              toggleSaved ? 'fill-black' : 'fill-white'
            }`}
          />
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
