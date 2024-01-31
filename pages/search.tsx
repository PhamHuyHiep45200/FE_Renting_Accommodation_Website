import CardHome from "@/components/base/CardHome";
import Search from "@/components/home/Search";
import {
  getRunningQueriesThunk,
  search,
  useSearchQuery,
} from "@/store/service/user.service";
import { wrapper } from "@/store/store";
import { Container, Divider, Grid, Pagination } from "@mui/material";
import { useRouter } from "next/router";
import React, { ChangeEvent, useMemo, useState } from "react";

function SearchData() {
  const router = useRouter();
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
  });

  const {
    data,
    isFetching,
    isSuccess
  } = useSearchQuery({
    ...router.query,
    page_size: 8,
    page: pagination.page
  });

  const dataApi = useMemo(() => {
    if (isSuccess) {
      setPagination({
        ...pagination,
        total: data.data.total,
      });
      return data.data.data;
    }
    return [];
  }, [isFetching, isSuccess, data]);

  const changePage = (_: ChangeEvent<unknown>, page: number) => {
    setPagination({
      ...pagination,
      page: page,
    });
  };
  
  return (
    <Container>
      <Search />
      <div className="mt-[50px]">
        <Divider sx={{ marginBottom: 2 }} />
        <Grid container spacing={2}>
          {dataApi.map((product: any) => {
            return (
              <Grid item xs={3} key={product._id}>
                <CardHome house={product} />
              </Grid>
            );
          })}
        </Grid>
        {isSuccess && (
          <div className="flex justify-center mt-5">
            <Pagination
              count={Math.floor((pagination.total / 10) + 1)}
              page={pagination.page}
              onChange={changePage}
              color="primary"
            />
          </div>
        )}
      </div>
    </Container>
  );
}

export default SearchData;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(search.initiate);
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
