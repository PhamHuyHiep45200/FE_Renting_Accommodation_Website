import { ICommon } from "@/model/common.model";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import MaskLoading from "../base/MaskLoading";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { startLoading, stopLoading } from "@/redux/slide/common.slide";

interface ILayoutDefault {
  children: JSX.Element;
}
export default function LayoutDefault({ children }: ILayoutDefault) {
  const { loading } = useAppSelector(
    (state: { commonSlice: ICommon }) => state.commonSlice
  );
  const dispatch = useAppDispatch()
  const router = useRouter();

  const startLoadingStore = () => {
    dispatch(startLoading())
  };

  const stopLoadingStore = () => {
    dispatch(stopLoading())
  };

  useEffect(() => {
    router.events.on("routeChangeStart", startLoadingStore);
    router.events.on("routeChangeComplete", stopLoadingStore);
    router.events.on("routeChangeError", stopLoadingStore);

    return () => {
      router.events.off("routeChangeStart", startLoadingStore);
      router.events.off("routeChangeComplete", stopLoadingStore);
      router.events.off("routeChangeError", stopLoadingStore);
    };
  }, [router, router.events]);
  return (
    <>
      <header className="bg-white">
        <Header />
      </header>
      <main className="max-h-[100vh] mt-20 bg-white min-h-[100vh] overflow-auto">
        {loading ? <MaskLoading /> : children}
      </main>
      <Footer />
    </>
  );
}
