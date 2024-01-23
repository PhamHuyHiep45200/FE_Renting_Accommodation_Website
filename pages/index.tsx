import DataHouse from "@/components/home/DataHouse";
import Search from "@/components/home/Search";
import Slide from "@/components/home/Slide";
import { Container } from "@mui/material";
import React from "react";

function Index() {

  return (
    <div className="">
      <Slide />
      <Container>
        <Search />
        <div className="mt-[60px]">
        <DataHouse /> 
        </div>
      </Container>
    </div>
  );
}

export default Index;

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//     store.dispatch(getCategoryAll.initiate);

//     await Promise.all(store.dispatch(getRunningQueriesThunk()));

//     return {
//       props: {},
//     };
//   }
// );
