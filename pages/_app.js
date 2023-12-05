import "@styles/globals.css";

import { Toaster } from "react-hot-toast";
import { UserContext } from "@lib/context";

import { useRouter } from "next/router";
import { useUserData } from "@lib/hooks";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import NavBar from "@components/NavBar";
import AttachmentIssues from "@components/AttachmentIssues";

function MyApp({ Component, pageProps }) {
  const userData = useUserData();
  const router = useRouter();

  return (
    <UserContext.Provider value={userData}>
      <NextUIProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          navigate={router.push}
        >
          <NavBar />
          <AttachmentIssues />
          <Component {...pageProps} />
          <Toaster />
        </NextThemesProvider>
      </NextUIProvider>
    </UserContext.Provider>
  );
}

export default MyApp;
