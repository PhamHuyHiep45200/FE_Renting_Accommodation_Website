import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  getCategoryAll,
  getRunningQueriesThunk,
  useGetCategoryAllQuery,
} from "@/redux/service/user.service";
import { UserState, decrement, increment } from "@/redux/slide/user.slide";
import { wrapper } from "@/redux/store";
import { Button } from "@mui/material";
import React, { useEffect } from "react";

function Index() {
  const { value } = useAppSelector(
    (state: { userSlice: UserState }) => state.userSlice
  );
  const dispatch = useAppDispatch();
  const { data, error } = useGetCategoryAllQuery({});
  useEffect(() => {
    console.log(data, error);
  }, [data]);
  return (
    <div className="flex items-center">
      <Button variant='contained' onClick={() => dispatch(increment())}>
        add
      </Button>
      <div className="mx-5">{value}</div>
      <Button variant='contained' onClick={() => dispatch(decrement())}>
        minus
      </Button>
    </div>
  );
}

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    store.dispatch(getCategoryAll.initiate);

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
