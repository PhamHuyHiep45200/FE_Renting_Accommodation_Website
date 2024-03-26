import { AppStore, makeStore } from "@/store/store";
import type { AppProps } from "next/app";
import {
  ComponentType,
  ReactElement,
  ReactNode,
  useRef,
} from "react";
import LayoutDefault from "@/components/layouts/default";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import { NextPage } from "next";
import ProviderMessage from "@/components/base/ProviderMessage";
import { Inter } from 'next/font/google'
import 'moment/locale/vi';
import moment from "moment";

const inter = Inter({ subsets: ['latin'] })

moment().locale('he')

type Page<P = {}> = NextPage<P> & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: ReactElement) => ReactNode;
  layout?: ComponentType;
};

type Props = AppProps & {
  Component: Page;
};

export default function App({ Component, pageProps }: Props) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
  }
  const getLayout =
    Component.getLayout ||
    ((page: JSX.Element) => <LayoutDefault>{page}</LayoutDefault>);
  return (
    <Provider store={storeRef.current}>
      <div className={inter.className}>
      <ProviderMessage>
        {getLayout(<Component {...pageProps} />)}
      </ProviderMessage>
      </div>
    </Provider>
  );
}
