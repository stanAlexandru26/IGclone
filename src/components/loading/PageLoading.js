import React from 'react';
import { ReactComponent as PageLoadingLogoIcon } from '../../assets/svg/PageLoadingLogoIcon.svg';

export default function PageLoading() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100">
      <PageLoadingLogoIcon className="h-16 w-16 fill-gray-300 " />
    </div>
  );
}
