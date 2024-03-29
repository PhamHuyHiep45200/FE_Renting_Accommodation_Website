import BaseLoadingSkeleton from "@/components/base/BaseLoadingSkeleton";
import { Grid } from "@mui/material";
import React from "react";

function SlideHome({ span, listNum }: { span?: number; listNum?: number }) {
  return (
    <Grid container spacing={4}>
      {Array.from({ length: listNum ?? 4 }, (_, i) => i).map((e) => (
        <Grid xs={span ?? 3} key={e} sx={{display: 'flex', justifyContent: 'center'}}>
          <BaseLoadingSkeleton />
        </Grid>
      ))}
    </Grid>
  );
}
export default SlideHome;
