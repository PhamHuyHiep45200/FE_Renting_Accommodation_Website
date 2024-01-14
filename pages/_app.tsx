import { AppStore, makeStore } from "@/redux/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRef } from "react";
import { Provider } from "react-redux";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App({ Component, pageProps }: AppProps) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
    // storeRef.current.dispatch(initializeCount(count))
  }
  return (
    <Provider store={storeRef.current}>
      <Component {...pageProps} />
    </Provider>
  );
}
