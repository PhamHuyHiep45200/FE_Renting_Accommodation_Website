import { Grid, Skeleton } from "@mui/material";
import React from "react";

function NewHouse() {
  return (
    <div>
      {[1, 2, 3].map((e) => {
        return (
          <Grid container spacing={[1]} key={e} className="mb-5">
            <Grid xs={4}>
              <Skeleton variant="rectangular" width={100} height={100} />
            </Grid>
            <Grid xs={8}>
              <Skeleton
                animation="wave"
                height={30}
                width="80%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={20}
                width="40%"
                style={{ marginBottom: 6 }}
              />
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}

export default NewHouse;
