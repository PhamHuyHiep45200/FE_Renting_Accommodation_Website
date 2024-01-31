import DataHouse from "@/components/home/DataHouse";
import Search from "@/components/home/Search";
import Slide from "@/components/home/Slide";
import RandomPair from "@/components/home/dataHouse/RandomPair";
import {
  favorite,
  getCategory,
  getRunningQueriesThunk,
  newHouse,
  randomHouse,
  randomUser,
} from "@/store/service/user.service";
import { wrapper } from "@/store/store";
import { Container, Divider } from "@mui/material";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import FavoriteIcon from '@mui/icons-material/Favorite';
import React from "react";
import HeaderProduct from "@/components/base/HeaderProduct";

function Index() {
  return (
    <div className="">
      <HeaderProduct
        icon={<FavoriteIcon color="primary" sx={{ width: 40, height: 40, color: "white" }} />}
        center
        color="#d20000"
        textColor="white"
        title={"Được Thích Nhiều Nhất"}
      />
      <Slide />
      <Container>
        <Search />
      </Container>
      <Divider className="mt-10" />
      <HeaderProduct
        icon={<GroupAddIcon sx={{ width: 40, height: 40, color: "white" }} />}
        center
        color="#1976d2"
        textColor="white"
        title={"Tìm Người Ở Ghép"}
      />
      <RandomPair />
      <Divider />
      <Container>
        <div className="mt-[60px]">
          <DataHouse />
        </div>
      </Container>
    </div>
  );
}

export default Index;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    store.dispatch(favorite.initiate);
    store.dispatch(randomHouse.initiate);
    store.dispatch(randomUser.initiate);
    store.dispatch(getCategory.initiate);
    store.dispatch(newHouse.initiate);

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  }
);
