import type { AppProps } from "next/app";

import Providers from "../lib/providers";

import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider>
      <Providers>
        <Component {...pageProps} />
      </Providers>
    </Provider>
  );
}

export default MyApp;
