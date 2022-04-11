import React, { useEffect } from 'react';
import Header from '../components/header';
import Timeline from '../components/dashboard/timeline';
import Sidebar from '../components/sidebar';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="mx-auto grid max-w-screen-lg grid-cols-3 justify-between gap-7">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
