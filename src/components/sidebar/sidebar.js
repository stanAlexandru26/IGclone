import React from 'react';
import useUser from '../../hooks/useUser';
import SidebarLoading from '../loading/sidebarLoading';
import Sugestions from './sugestions';
import User from './user';

export default function Sidebar() {
  const activeUser = useUser();

  return (
    <div className="col-span-1 p-4">
      {!activeUser ? (
        <SidebarLoading />
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <User username={activeUser.username} fullName={activeUser.fullName} />
            <div className="py-2 text-gray-400 font-semibold ">Suggestions For You</div>
            <Sugestions userId={activeUser.userId} />
          </div>
        </>
      )}
    </div>
  );
}
