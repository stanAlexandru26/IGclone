import React, { useEffect } from 'react';
import Header from '../components/header';
import Timeline from '../components/timeline';
import Sidebar from '../components/sidebar/sidebar';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Instagram';
  }, []);

  return (
    <div className="w-screen h-screen">
      <Header />
      <div className="grid grid-cols-3 gap-7 justify-between mx-auto max-w-screen-lg">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
