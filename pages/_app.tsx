import { AppStore, makeStore } from "@/redux/store";
import type { AppProps } from "next/app";
import { useEffect, useRef } from "react";
import LayoutDefault from "@/components/layouts";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import 'swiper/css';
import 'swiper/css/pagination';

export default function App({ Component, pageProps }: AppProps) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <LayoutDefault>
        <Component {...pageProps} />
      </LayoutDefault>
    </Provider>
  );
}
