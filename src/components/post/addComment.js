import React, { useState, useContext } from 'react';
import UserContext from '../../context/userContext';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

import FirebaseContext from '../../context/firebaseContext';

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState('');
  const { db } = useContext(FirebaseContext);
  const user = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();
    setComments([{ comment, displayName: user.displayName }, ...comments]);
    const document = doc(db, 'photos', docId);
    updateDoc(document, {
      comments: arrayUnion({ displayName: user.displayName, comment: comment }),
    });
    setComment('');
  };

  return (
    <div className="border-t border-gray">
      <form
        className="flex w-full justify-between pl-0 pr-5"
        onSubmit={(event) =>
          comment.length >= 3
            ? handleSubmitComment(event)
            : event.preventDefault()
        }
        method="POST"
      >
        <input
          aria-label="Add a comment"
          autoComplete="off"
          className="text-sm text-gray w-full mr-3 py-5 px-4"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-500 ${
            !comment && 'opacity-25'
          }`}
          type="button"
          disabled={comment.length < 3}
          onClick={handleSubmitComment}
        >
          Post
        </button>
      </form>
    </div>
  );
}
