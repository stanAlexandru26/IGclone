/* eslint-disable no-unused-vars */
import React, { memo, useState, useEffect } from 'react';
import { getSuggestedProfiles } from '../../utils/firebaseUilts';
import ProfileSugestion from './profileSugestion';

export default function Sugestions({ userId }) {
  const [profiles, setProfiles] = useState(null);

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId);
      setProfiles(response);
    }
    if (userId) {
      suggestedProfiles();
    }
  }, [userId]);

  return (
    <div>
      {profiles && profiles.length > 0 && (
        <div className="flex flex-col gap-2 p-2">
          {profiles.map((profile) => (
            <ProfileSugestion
              key={profile.docId}
              userDocId={profile.docId}
              username={profile.username}
              profileId={profile.userId}
              userId={userId}
              profileImgSrc={profile.imageSrc}
            />
          ))}
        </div>
      )}
    </div>
  );
}
