import { Container, Typography } from "@mui/material";
import * as React from "react";

import Chart from "../components/Chart";
import withAuth from "../components/WithAuth";

function DashboardPage() {

  return (
    <Container component="main">
      <Typography variant="h5">Dashboard</Typography>
      <Chart currentValue={90} maxValue={100} />
    </Container>
  );
}

export default withAuth(DashboardPage);