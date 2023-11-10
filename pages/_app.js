import '@styles/globals.css';

import { Toaster } from 'react-hot-toast';
import { UserContext } from '@lib/context';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useUserData } from '@lib/hooks';
import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <NextUIProvider>
        <Component {...pageProps} />
        <Toaster />
      </NextUIProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
