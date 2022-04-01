import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddComment from './addComment';
import moment from 'moment';

export default function Comments({
  docId,
  comments: allComments,
  postedDate,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments);

  return (
    <>
      <div className="p-4 pt-1 ">
        {comments.length >= 3 && (
          <p className="text-sm text-gray-500 cursor-pointer">
            View all {comments.length} comments
          </p>
        )}
        <div className="flex flex-col ">
          {comments.slice(0, 3).map((item) => (
            <p
              key={`${item.comment}-${item.displayName}`}
              className="flex gap-2 items-center"
            >
              <Link to={`/p/${item.displayName}`}>
                <span className="font-semibold ">{item.displayName}</span>
              </Link>
              <span className="text-sm">{item.comment}</span>
            </p>
          ))}
        </div>
        <p className="text-gray-400 uppercase text-xs mt-2">
          {moment(postedDate).fromNow()}
        </p>
      </div>

      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      />
    </>
  );
}
