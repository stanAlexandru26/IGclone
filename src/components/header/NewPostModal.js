/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import UserContext from '../../context/userContext';
import FirebaseContext from '../../context/firebaseContext';
import { ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';

export default function NewPostModal() {
  const { objectReference, visible, setVisible } = useOutsideClick(false);
  const { storage, db } = useContext(FirebaseContext);
  const user = useContext(UserContext);
  const { photoFirebaseUrl } = useFirebaseStorage(user.photoURL, 'avatar');

  const [file, setFile] = useState(null);
  const [imgCaption, setImgCaption] = useState('');

  const handleRename = async (image, postId) => {
    if (image) {
      let renamedImg = new File([image], `${postId}`, {
        type: 'image/jpeg',
      });
      return renamedImg;
    }
  };

  const handleNewPost = async (event) => {
    event.preventDefault();

    const docRef = collection(db, 'posts');
    const newPost = await addDoc(docRef, {
      userId: `${user.uid}`,
      caption: `${imgCaption}`,
      likes: [],
      comments: [],
      userLatitude: '',
      userLongitude: '',
      dateCreated: Date.now(),
      imageSrc: '',
      savedUsers: [],
    });
    const newPostRef = doc(db, `posts/${newPost.id}`);
    await updateDoc(newPostRef, {
      imageSrc: `${newPost.id}.jpg`,
    });

    const storageRef = ref(storage, `images/${newPost.id}.jpg`);
    const renamedImg = await handleRename(file, newPost.id);

    uploadBytes(storageRef, renamedImg).then(() => {
      console.log('Uploaded a blob or file!');
    });

    setFile(null);
    setImgCaption('');
    setVisible(false);
  };
  return (
    <>
      <button arial-label="New Post" onClick={() => setVisible(!visible)}>
        <svg
          className={`${
            visible ? 'fill-black stroke-white' : 'fill-transparent'
          }`}
          aria-label="New Post"
          height="24"
          role="img"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        >
          <path
            d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          ></path>
          <line
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="6.545"
            x2="17.455"
            y1="12.001"
            y2="12.001"
          ></line>
          <line
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            x1="12.003"
            x2="12.003"
            y1="6.545"
            y2="17.455"
          ></line>
        </svg>
      </button>

      {visible ? (
        <>
          <div className=" fixed inset-0 z-50 flex items-center justify-center ">
            <div className="flex h-screen w-screen items-center justify-center ">
              {/*content*/}
              <div
                ref={objectReference}
                className="relative flex h-5/6 w-6/12 flex-col rounded-lg border-0 bg-white  shadow-lg outline-none focus:outline-none"
              >
                {/*header*/}
                <div className="flex items-center justify-center border-b py-2 px-6  ">
                  <h3 className="flex-auto font-semibold">Create New Post</h3>
                  {file && (
                    <button
                      onClick={handleNewPost}
                      className="font-semibold text-blue-500 active:opacity-50 "
                    >
                      Share
                    </button>
                  )}
                </div>
                {/*body*/}
                <div className="h-full w-full overflow-hidden  ">
                  {!file ? (
                    <>
                      <div className="flex h-full  items-center justify-center">
                        <div className="flex flex-col items-center justify-center gap-4">
                          <svg
                            aria-label="Icon to represent media such as images or videos"
                            color="#262626"
                            fill="#262626"
                            height="77"
                            role="img"
                            viewBox="0 0 97.6 77.3"
                            width="96"
                          >
                            <path
                              d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                              fill="currentColor"
                            ></path>
                            <path
                              d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                              fill="currentColor"
                            ></path>
                            <path
                              d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                              fill="currentColor"
                            ></path>
                          </svg>
                          <p className=" text-xl font-light">
                            Drag photos and videos here
                          </p>
                          <label
                            htmlFor="photoInput"
                            className="rounded-md bg-blue-500 px-3 py-1 text-white hover:cursor-pointer active:bg-blue-300"
                          >
                            Select from computer{' '}
                          </label>
                          <input
                            id="photoInput"
                            type="file"
                            accept=".jpg"
                            className="hidden"
                            onChange={(event) => setFile(event.target.files[0])}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    file && (
                      <>
                        <div className="flex h-full flex-row divide-x-2 ">
                          <div className="flex h-[30rem] basis-4/6  flex-col justify-center">
                            <img
                              src={URL.createObjectURL(file)}
                              alt="New Post Image"
                              className=" object-fill"
                            />
                          </div>
                          <div className="flex basis-5/12 flex-col gap-10 p-4 ">
                            <div className="flex items-center gap-5">
                              <img
                                src={photoFirebaseUrl}
                                alt="User icon"
                                className="h-10 w-10 rounded-full border-2"
                              />
                              <p className=" font-semibold">
                                {user.displayName}
                              </p>
                            </div>
                            <textarea
                              className="h-1/2 w-full resize-none focus:outline-none"
                              placeholder="Write a caption..."
                              onChange={(event) =>
                                setImgCaption(event.target.value)
                              }
                            >
                              {imgCaption}
                            </textarea>
                          </div>
                        </div>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className=" fixed inset-0 z-40 bg-black/80"></div>
        </>
      ) : null}
    </>
  );
}
