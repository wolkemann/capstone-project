import "../style.css";
import { GlobalStyle } from "../components/GlobalStyles/GlobalStyle";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <SessionProvider session={session}>
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
          </Head>
          <GlobalStyle />
          <Component {...pageProps} />
        </SWRConfig>
      </SessionProvider>
    </>
  );
}

export default MyApp;
