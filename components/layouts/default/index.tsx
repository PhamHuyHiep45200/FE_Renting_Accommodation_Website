import { ICommon } from "@/model/common.model";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import MaskLoading from "../../base/MaskLoading";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { startLoading, stopLoading } from "@/store/slide/common.slide";
import { useGetMeQuery, useUserFavoriteQuery } from "@/store/service/user.service";
import { setUser, setInfo, setFavorite } from "@/store/slide/auth.slide";
import { Divider } from "@mui/material";
import { IAuthSlide } from "@/model/auth.model";

interface ILayoutDefault {
  children: JSX.Element;
}
export default function LayoutDefault({ children }: ILayoutDefault) {
  const { loading } = useAppSelector(
    (state: { commonSlice: ICommon }) => state.commonSlice
  );
  const { checkChangeUser } = useAppSelector(
    (state: { authSlice: IAuthSlide }) => state.authSlice
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data, isFetching, isSuccess, refetch } = useGetMeQuery({});
  const { data: dataFavorite, isSuccess: successFavorite } = useUserFavoriteQuery({});

  const startLoadingStore = () => {
    dispatch(startLoading());
  };

  const stopLoadingStore = () => {
    dispatch(stopLoading());
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data.data.user));
      dispatch(
        setInfo({
          maxMoney: data.data.maxMoney,
          maxSquare: data.data.maxSquare,
          minMoney: data.data.minMoney,
          minSquare: data.data.minSquare,
        })
      );
    }
  }, [isFetching, isSuccess]);

  useEffect(() => {
    if(successFavorite) {
      dispatch(setFavorite(dataFavorite.data.data.length))
    }
  }, [dataFavorite, successFavorite]);

  useEffect(()=>{
    if(checkChangeUser) {
      refetch()
    }
  }, [checkChangeUser])

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
      <main className="mt-20 bg-[whitesmoke] min-h-[100vh] pb-10 pt-10">
        {loading && <MaskLoading />}
        {children}
      </main>
      <Divider />
      <Footer />
    </>
  );
}
