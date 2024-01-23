import InfoProduct from '@/components/detail/InfoProduct'
import InfoUser from '@/components/detail/InfoUser';
import { Container } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";
import React from 'react'

function DetailPost() {
  return (
    <Container>
      <Grid container spacing={4}>
        <Grid xs={9}>
          <InfoProduct />
        </Grid>
        <Grid xs={3}>
          <InfoUser />
        </Grid>
      </Grid>
    </Container>
  )
}

export default DetailPost