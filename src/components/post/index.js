import React, { useRef, useState } from 'react';

import PostHeader from './PostHeader';
import PostImage from './PostImage';
import PostActions from './PostActions';
import PostFooter from './PostFooter';
import PostComments from './PostComments';
import PostAddComment from './PostAddComment';
import PostDate from './PostDate';

export default function Post({ content, horizontal }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  const [comments, setComments] = useState(content.comments);

  return (
    <>
      {!horizontal ? (
        <div className="mx-auto mb-8 flex  flex-col rounded border">
          <PostHeader
            username={content.username}
            imageSrc={content.userImageSrc}
          />
          <PostImage imageSrc={content.imageSrc} caption={content.caption} />
          <PostActions
            docId={content.docId}
            totalLikes={content.likes.length}
            likedPost={content.userLikedPost}
            handleFocus={handleFocus}
            savedPost={content.userSavedPost}
          />
          <PostFooter username={content.username} caption={content.caption} />
          <PostComments docId={content.docId} comments={comments} />
          <PostDate postedDate={content.dateCreated} />
          <PostAddComment
            docId={content.docId}
            comments={comments}
            commentInput={commentInput}
            setComments={setComments}
          />
        </div>
      ) : (
        <div className="mx-auto mb-8  flex w-11/12 flex-col rounded border md:flex-row ">
          <div className="flex items-center justify-center  bg-slate-100 md:border-r md:border-b-0  ">
            <PostImage imageSrc={content.imageSrc} caption={content.caption} />
          </div>
          <div className="flex shrink-0 flex-col place-content-evenly ">
            <div className="order-1 basis-1/12">
              <PostHeader
                username={content.username}
                imageSrc={content.userImageSrc}
              />
            </div>
            <div className="order-2 basis-1/12  ">
              <PostFooter
                username={content.username}
                caption={content.caption}
              />
            </div>
            <div className="order-3   ">
              <PostComments
                docId={content.docId}
                comments={comments}
                horizontal={horizontal}
              />
            </div>
            <div className="order-4 basis-1/12">
              <PostActions
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPost={content.userLikedPost}
                handleFocus={handleFocus}
                savedPost={content.userSavedPost}
              />
            </div>
            <div className="order-5">
              <PostDate postedDate={content.dateCreated} />
            </div>
            <div className="order-last basis-1/12">
              <PostAddComment
                docId={content.docId}
                comments={comments}
                commentInput={commentInput}
                setComments={setComments}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
