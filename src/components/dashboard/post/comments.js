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
          <p className="cursor-pointer text-sm text-gray-500">
            View all {comments.length} comments
          </p>
        )}
        <div className="flex flex-col ">
          {comments.slice(0, 3).map((item) => (
            <p
              key={`${item.comment}-${item.displayName}`}
              className="flex items-center gap-2"
            >
              <Link to={`/p/${item.displayName}`}>
                <span className="font-semibold ">{item.displayName}</span>
              </Link>
              <span className="text-sm">{item.comment}</span>
            </p>
          ))}
        </div>
        <p className="mt-2 text-xs uppercase text-gray-400">
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
