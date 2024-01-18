import { Card, CardHeader, Grid, Skeleton } from "@mui/material";
import React from "react";

function RandomHouse() {
  return (
    <Grid container spacing={1}>
      <Grid xs={6}>
        <Card sx={{ maxWidth: 345, m: 2, marginBottom: 4 }}>
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            }
            title={
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            }
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
          <div className="p-5">
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </div>
        </Card>
      </Grid>
      <Grid xs={6}>
        <Card sx={{ maxWidth: 345, m: 2, marginBottom: 4 }}>
          <CardHeader
            avatar={
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            }
            title={
              <Skeleton
                animation="wave"
                height={10}
                width="80%"
                style={{ marginBottom: 6 }}
              />
            }
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
          <Skeleton
            sx={{ height: 190 }}
            animation="wave"
            variant="rectangular"
          />
          <div className="p-5">
            <Skeleton
              animation="wave"
              height={10}
              style={{ marginBottom: 6 }}
            />
            <Skeleton animation="wave" height={10} width="80%" />
          </div>
        </Card>
      </Grid>
    </Grid>
  );
}

export default RandomHouse;
