import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import RandomHouse from "./dataHouse/RandomHouse";
import NewHouse from "./dataHouse/NewHouse";
import { Pagination } from "@mui/material";

function DataHouse() {
  return (
    <Grid container spacing={4}>
      <Grid xs={8}>
        <RandomHouse />
        <div className="flex justify-center my-10">
        <Pagination count={10} color="primary" />
        </div>
      </Grid>
      <Grid xs={4}>
        <NewHouse />
      </Grid>
    </Grid>
  );
}

export default DataHouse;
