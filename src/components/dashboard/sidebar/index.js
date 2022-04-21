import React, { useState, useEffect } from 'react';
import useUser from '../../../hooks/useUser';
import SidebarLoading from '../../loading/sidebarLoading';
import SidebarUserHeader from './SidebarUserHeader';
import { getSuggestedProfiles } from '../../../utils/firebaseUilts';
import SuggestedProfile from './SidebarSuggestedProfile';

export default function Sidebar() {
  const activeUser = useUser();
  const [suggestedProfiles, setSuggestedProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(activeUser.userId);
      setSuggestedProfiles(response);
    }
    suggestedProfiles();
  }, [activeUser]);

  return (
    <div className="hidden lg:block">
      {!activeUser ? (
        <SidebarLoading />
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <SidebarUserHeader
              username={activeUser.username}
              fullName={activeUser.fullName}
              imageSrc={activeUser.imageSrc}
            />
            <div className="py-2 font-semibold text-gray-400 ">
              Suggestions For You
            </div>
            <div>
              {suggestedProfiles && suggestedProfiles.length > 0 && (
                <div className="flex flex-col gap-2 p-2">
                  {suggestedProfiles.map((profile) => (
                    <SuggestedProfile
                      key={profile.docId}
                      userDocId={profile.docId}
                      username={profile.username}
                      followers={profile.followers}
                      profileId={profile.userId}
                      userId={activeUser.userId}
                      profileImgSrc={profile.imageSrc}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
