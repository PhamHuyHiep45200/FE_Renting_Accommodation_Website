import CardHome from "@/components/base/CardHome";
import { Grid } from "@mui/material";
import React from "react";

function RandomHouse() {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3, 4, , 5, 6].map((product) => {
        return (
          <Grid item xs={6} key={product}>
            <CardHome />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default RandomHouse;
