import React, { useState, useContext } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import UserContext from '../../context/userContext';
import FirebaseContext from '../../context/firebaseContext';
import { ref, uploadBytes } from 'firebase/storage';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import useFirebaseStorage from '../../hooks/useFirebaseStorage';
import { ReactComponent as HeaderNewPostIcon } from '../../assets/svg/HeaderNewPostIcon.svg';
import { ReactComponent as HeaderModalMediaIcon } from '../../assets/svg/HeaderModalMediaIcon.svg';

export default function HeaderNewPostModal() {
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
      docId: `${newPost.id}`,
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
        <HeaderNewPostIcon
          className={`${
            visible
              ? 'fill-black stroke-white'
              : 'fill-transparent stroke-black'
          }`}
        />
      </button>

      {visible ? (
        <>
          <div className=" fixed inset-0 z-50 flex items-center justify-center ">
            <div className="flex h-screen w-screen items-center justify-center ">
              {/*content*/}
              <div
                ref={objectReference}
                className="relative flex h-3/6 w-8/12  flex-col rounded-lg border-0 bg-white shadow-lg outline-none  focus:outline-none md:h-5/6 md:w-6/12"
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
                          <HeaderModalMediaIcon />
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
                          <div className="flex  max-h-fit basis-4/6  flex-col items-center justify-center rounded-b-lg bg-gray-100 ">
                            <img
                              src={URL.createObjectURL(file)}
                              alt="New Post Image"
                              className=" object-fill"
                            />
                          </div>
                          <div className="flex  flex-col gap-10 p-4 md:basis-5/12 ">
                            <div className="flex items-center gap-5">
                              <img
                                src={photoFirebaseUrl}
                                alt="User icon"
                                className="h-6 w-6 shrink-0 rounded-full border-2 md:h-10 md:w-10"
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
