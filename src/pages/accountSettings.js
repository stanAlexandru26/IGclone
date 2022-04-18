import React, { useEffect } from 'react';
import Header from '../components/header';
import AccountSettings from '../components/account-settings';

export default function AccountSettingsPage() {
  useEffect(() => {
    document.title = 'Settings - Instagram';
  }, []);

  return (
    <>
      <Header />
      <AccountSettings />
    </>
  );
}
