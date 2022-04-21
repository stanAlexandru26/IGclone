import React from 'react';
import moment from 'moment';

export default function PostedDate({ postedDate }) {
  return (
    <p className="mt-2 p-4 text-xs uppercase text-gray-400">
      {moment(postedDate).fromNow()}
    </p>
  );
}
