import React, { useEffect } from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page Not Found';
  }, []);

  return (
    <div className="bg-gray">
      <Header />
      <div className="mx-auto flex flex-col items-center gap-6">
        <p className="text-xl font-semibold">
          Sorry, this page isn&apos;t available.
        </p>
        <p>
          The link you followed may be broken, or the page may have been
          removed.
          <Link to="/" className="text-blue-800">
            Go back to Instagram.
          </Link>
        </p>
      </div>
    </div>
  );
}
