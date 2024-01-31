import MaskLoading from "@/components/base/MaskLoading";
import { ICommon } from "@/model/common.model";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { startLoading, stopLoading } from "@/store/slide/common.slide";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function LayoutLogin({ children }: { children: JSX.Element }) {
  const router = useRouter()
  const { loading } = useAppSelector(
    (state: { commonSlice: ICommon }) => state.commonSlice
  );
  const dispatch = useAppDispatch();

  const startLoadingStore = () => {
    dispatch(startLoading());
  };

  const stopLoadingStore = () => {
    dispatch(stopLoading());
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
    <div className="w-[100vw] h-[100vh] bg-[#4baeff] flex justify-center items-center">
      {loading && <MaskLoading />}
      {children}
    </div>
  );
}

export default LayoutLogin;
