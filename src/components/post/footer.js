import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer({ caption, username }) {
  return (
    <div className="px-4 flex gap-2">
      <Link to={`/p/${username}`}>
        <span className="= font-semibold">{username}</span>
      </Link>
      <span>{caption}</span>
    </div>
  );
}
