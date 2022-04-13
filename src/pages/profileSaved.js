import React, { useEffect } from 'react';
import Header from '../components/header';

export default function ProfileSaved() {
  useEffect(() => {
    document.title = 'Saved - Instagram';
  }, []);

  return (
    <>
      <Header />

      saved
    </>
  );
}
