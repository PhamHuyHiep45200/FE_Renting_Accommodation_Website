import DataHouse from "@/components/home/DataHouse";
import Search from "@/components/home/Search";
import Slide from "@/components/home/Slide";
import { ICommon } from "@/model/common.model";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getCategoryAll,
  getRunningQueriesThunk,
  useGetCategoryAllQuery,
} from "@/redux/service/user.service";
import { UserState, decrement, increment } from "@/redux/slide/user.slide";
import { wrapper } from "@/redux/store";
import { Button, Container } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

function Index() {
  const { value } = useAppSelector(
    (state: { userSlice: UserState }) => state.userSlice
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  // const { data, error, isLoading, isFetching, refetch } =
  //   useGetCategoryAllQuery({});

  // useEffect(() => {
  //   console.log(data, error, isLoading, isFetching);
  // }, [data, isFetching])

  return (
    <div className="">
      <Slide />
      <Container>
        <Search />
        <div className="mt-[80px]">
        <DataHouse /> 
        </div>
      </Container>
    </div>
  );
}

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(getCategoryAll.initiate);

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
