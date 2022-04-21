import React, { useRef, useState } from 'react';

import Header from './header';
import Image from './image';
import Actions from './actions';
import Footer from './footer';
import Comments from './comments';
import AddComment from './addComment';
import PostedDate from './postedDate';

export default function Post({ content, horizontal }) {
  
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  const [comments, setComments] = useState(content.comments);

  return (
    <>
      {!horizontal ? (
        <div className="mx-auto mb-8 flex  flex-col rounded border">
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
            comments={comments}
            commentInput={commentInput}
          />
          <PostedDate postedDate={content.dateCreated} />
          <AddComment
            docId={content.docId}
            comments={comments}
            commentInput={commentInput}
            setComments={setComments}
          />
        </div>
      ) : (
        <div className="mx-auto mb-8  flex w-11/12 flex-col rounded border md:flex-row ">
          <div className="flex items-center justify-center  bg-slate-100 md:border-r md:border-b-0  ">
            <Image imageSrc={content.imageSrc} caption={content.caption} />
          </div>
          <div className="flex shrink-0 flex-col place-content-evenly ">
            <div className="order-1 basis-1/12">
              <Header
                username={content.username}
                imageSrc={content.userImageSrc}
              />
            </div>
            <div className="order-2 basis-1/12  ">
              <Footer username={content.username} caption={content.caption} />
            </div>
            <div className="order-3 grow  ">
              <Comments
                docId={content.docId}
                comments={comments}
                postedDate={content.dateCreated}
                commentInput={commentInput}
              />
            </div>
            <div className="order-4 basis-1/12">
              <Actions
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPost={content.userLikedPost}
                handleFocus={handleFocus}
                savedPost={content.userSavedPost}
              />
            </div>
            <div className="order-5">
              <PostedDate postedDate={content.dateCreated} />
            </div>
            <div className="order-last basis-1/12">
              <AddComment
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
