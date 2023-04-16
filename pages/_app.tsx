import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import {
  PayPalScriptProvider,
} from "@paypal/react-paypal-js";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AuthProvider, CartProvider, UiProvider } from "../context";
import { lightTheme, darkTheme } from "../themes";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const initOptions = {
    "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
  };
  return (
    <SessionProvider>
      <PayPalScriptProvider options={initOptions}>
        <SWRConfig
          value={{
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <AuthProvider>
            <CartProvider>
              <UiProvider>
                <ThemeProvider theme={darkTheme}>
                  <CssBaseline />
                  <Component {...pageProps} />
                </ThemeProvider>
              </UiProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  );
}
