import '@styles/globals.css';

import { Toaster } from 'react-hot-toast';
import { UserContext } from '@lib/context';

import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useUserData } from '@lib/hooks';
import { NextUIProvider } from '@nextui-org/react';
import {ThemeProvider as NextThemesProvider} from 'next-themes';

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <NextUIProvider>
        <NextThemesProvider attribute="class" defaultTheme="dark">
          <Component {...pageProps} />
          <Toaster />
        </NextThemesProvider>
      </NextUIProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
