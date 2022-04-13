import React, { useEffect } from 'react';
import ExploreTimeline from '../components/explore';
import Header from '../components/header';

export default function Explore() {
  useEffect(() => {
    document.title = 'Explore - Instagram';
  }, []);
  return (
    <>
      <Header />
      <ExploreTimeline />
    </>
  );
}
