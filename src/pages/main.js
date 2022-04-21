import React, { useEffect } from 'react';
import Header from '../components/header';
import { Outlet } from 'react-router-dom';

export default function MainPage() {
  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <Header />

      <Outlet />
    </div>
  );
}
