import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ caption, username }) {
  return (
    <div className="flex gap-2 px-4">
      <Link to={`/${username}/posts`}>
        <span className="= font-semibold">{username}</span>
      </Link>
      <span>{caption}</span>
    </div>
  );
}
