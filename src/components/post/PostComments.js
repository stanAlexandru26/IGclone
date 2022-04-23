import React from 'react';
import { Link } from 'react-router-dom';

export default function PostComments({ comments, docId, horizontal }) {
  console.log(
    '🚀 ~ file: PostComments.js ~ line 5 ~ PostComments ~ horizontal',
    horizontal,
  );
  return (
    <>
      <div
        className={`${
          horizontal ? 'h-40' : ''
        } h-full  w-full overflow-scroll px-4`}
      >
        {!horizontal && comments.length >= 3 && (
          <Link to={`/p/${docId}`} className="text-sm text-gray-600">
            View all {comments.length} comments
          </Link>
        )}
        <div className="flex flex-col ">
          {!horizontal &&
            comments.slice(0, 3).map((item) => (
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
          {horizontal &&
            comments.map((item) => (
              <p
                key={`${item.comment}-${item.displayName}`}
                className="flex items-center gap-2  "
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
