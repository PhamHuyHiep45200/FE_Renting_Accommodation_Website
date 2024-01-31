import CardHome from '@/components/base/CardHome';
import { useUserFavoriteQuery } from '@/store/service/user.service';
import { Container, Divider, Grid, Pagination } from '@mui/material'
import React, { ChangeEvent, useMemo, useState } from 'react'

function Favorite() {
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
  });

  const { data: dataFavorite, isSuccess: successFavorite, isFetching } = useUserFavoriteQuery({
    page_size: 8,
    page: pagination.page
  });
  const dataApi = useMemo(() => {
    if (successFavorite) {
      setPagination({
        ...pagination,
        total: dataFavorite.data.total,
      });
      return dataFavorite.data.data.map((e: any)=>({
        ...e,
        ...e.house,
        user: e.user
      }));
    }
    return [];
  }, [isFetching, successFavorite, dataFavorite]);

  const changePage = (_: ChangeEvent<unknown>, page: number) => {
    setPagination({
      ...pagination,
      page: page,
    });
  };
  
  return (
    <Container>
      <h1>DANH SÁCH NHÀ TRỌ YÊU THÍCH</h1>
      <Divider sx={{ marginBottom: 2 }} />
        <Grid container spacing={2}>
          {dataApi.map((product: any) => {
            return (
              <Grid item xs={3} key={product._id}>
                <CardHome house={product} favorite />
              </Grid>
            );
          })}
        </Grid>
        {!isFetching && dataFavorite.data.total > 0 && (
          <div className="flex justify-center mt-5">
            <Pagination
              count={Math.floor((pagination.total / 10) + 1)}
              page={pagination.page}
              onChange={changePage}
              color="primary"
            />
          </div>
        )}
    </Container>
  )
}

export default Favorite