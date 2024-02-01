import InfoProduct from "@/components/detail/InfoProduct";
import InfoUser from "@/components/detail/InfoUser";
import {
  detailHouse,
  favoriteById,
  getRunningQueriesThunk,
  useDetailHouseQuery,
} from "@/store/service/user.service";
import { wrapper } from "@/store/store";
import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

function DetailPost() {
  const router = useRouter();
  const id = router.query.id;
  const { data, isSuccess } = useDetailHouseQuery(id, {
    skip: !id,
  });

  const detail = useMemo(() => {
    if (isSuccess) {
      return data.data;
    }
    return [];
  }, [isSuccess]);
  return (
    <Container className="bg-white rounded-lg py-10">
      <Grid container spacing={4}>
        <Grid xs={9}>
          <InfoProduct detail={detail} />
        </Grid>
        <Grid xs={3}>
          <InfoUser detail={detail} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default DetailPost;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context: GetServerSidePropsContext) => {
    const id = context.query.id;
    if (typeof id === "string") {
      store.dispatch(detailHouse.initiate(id));
      store.dispatch(favoriteById.initiate(id));
    }
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
