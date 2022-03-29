/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import useUser from '../hooks/useUser';

export default function Sidebar() {
  const activeUser = useUser();

  return (
    <div className="p-4">{activeUser && <p>{activeUser.fullName}</p>}</div>
  );
}
