import React, { useState, useEffect } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';
import { getAllUsers } from '../../utils/firebaseUtils';
import HeaderSearchProfile from './HeaderSearchProfile';
import { HeaderSearchCloseButton } from '../../utils/getIcon';
import { ReactComponent as HeaderSearchIcon } from '../../assets/svg/HeaderSearchIcon.svg';

export default function HeaderSearchBar() {
  const { objectReference, visible, setVisible } = useOutsideClick(false);

  const [search, setSearch] = useState('');
  const [userArray, setUserArray] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);

  useEffect(() => {
    getAllUsers().then((users) => {
      setUserArray(users);
    });
  }, []);

  useEffect(() => {
    if (search.length > 0) {
      const filtered = userArray.filter((user) => {
        return (
          user.username.toLowerCase().includes(search.toLowerCase()) ||
          user.fullName.toLowerCase().includes(search.toLowerCase())
        );
      });
      setFilteredArray(filtered);
    } else {
      setFilteredArray([]);
    }
  }, [search]);

  return (
    <div className=" relative hidden px-4 sm:flex" ref={objectReference}>
      <div className="flex max-w-max items-center  justify-evenly  gap-2  rounded-lg bg-gray-200 px-2 ">
        {!visible && (
          <label htmlFor="search">
            <HeaderSearchIcon />
          </label>
        )}
        <input
          id="search"
          type="text"
          className="h-8  bg-gray-200  px-2 font-normal placeholder:font-light focus:outline-none sm:w-20 md:w-full"
          placeholder="Search"
          value={search}
          onClick={() => setVisible(true)}
          onChange={(event) => setSearch(event.target.value)}
        />
        {visible && (
          <button
            className="flex"
            onClick={() => {
              setSearch('');
              setVisible(false);
            }}
          >
            <HeaderSearchCloseButton />
          </button>
        )}
      </div>
      {visible && (
        <div
          className={`absolute -inset-20 top-14 h-60 w-80  rounded bg-white shadow-xl drop-shadow-[0_0_1px_rgba(0,0,0,0.25)]  md:-inset-11 md:top-14  ${
            visible ? 'block' : 'hidden'
          }`}
        >
          <div className="absolute -inset-2 inset-x-40 h-4 w-4 rotate-45 bg-white "></div>
          <div className=" flex h-full w-full flex-col overflow-scroll ">
            {filteredArray.map((profile) => (
              <HeaderSearchProfile
                key={profile.docId}
                profileDocId={profile.docId}
                username={profile.username}
                followers={profile.followers}
                profileId={profile.userId}
                profileImgSrc={profile.imageSrc}
                fullName={profile.fullName}
              />
            ))}
            {(search.length == 0 || filteredArray.length == 0) && (
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-sm text-gray-500">
                  {search.length == 0
                    ? 'No recent searches.'
                    : 'No results found.'}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
