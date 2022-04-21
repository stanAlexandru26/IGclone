import React from 'react';
import { Link } from 'react-router-dom';

export default function Comments({ comments }) {
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
              <Link to={`/${item.displayName}/posts`}>
                <span className="font-semibold ">{item.displayName}</span>
              </Link>
              <span className="text-sm">{item.comment}</span>
            </p>
          ))}
        </div>
      </div>
    </>
  );
}
