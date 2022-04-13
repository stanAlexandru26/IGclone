import React, { useRef } from 'react';

import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';

export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  return (
    <div className="mb-8 rounded border bg-white">
      <Header username={content.username} imageSrc={content.userImageSrc} />
      <Image imageSrc={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPost={content.userLikedPost}
        handleFocus={handleFocus}
        savedPost={content.userSavedPost}
      />
      <Footer username={content.username} caption={content.caption} />
      <Comments
        docId={content.docId}
        comments={content.comments}
        postedDate={content.dateCreated}
        commentInput={commentInput}
      />
    </div>
  );
}
