import React from 'react';
import Timeline from "./timeline"
import Sidebar from "./sidebar"

export default function Dashboard() {
  return (
    <div className="mx-auto grid max-w-screen-lg grid-cols-3 justify-between gap-7">
      <Timeline />
      <Sidebar />
    </div>
  );
}
