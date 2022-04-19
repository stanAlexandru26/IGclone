import React, { useEffect } from 'react';
import AccountSettings from '../components/account-settings';

export default function AccountSettingsPage() {
  useEffect(() => {
    document.title = 'Settings - Instagram';
  }, []);

  return (
    <>
      <AccountSettings />
    </>
  );
}
