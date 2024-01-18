import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import RandomHouse from "./dataHouse/RandomHouse";
import NewHouse from "./dataHouse/NewHouse";

function DataHouse() {
  return (
    <Grid container spacing={2}>
      <Grid xs={8}>
        <RandomHouse />
      </Grid>
      <Grid xs={4}>
        <NewHouse />
      </Grid>
    </Grid>
  );
}

export default DataHouse;
