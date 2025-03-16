import { Container, Typography } from "@mui/material";
import * as React from "react";

import Chart from "../components/Chart";
import Header from "../components/Header";
import LogoutButton from "../components/LogoutButton";
import withAuth from "../components/WithAuth";

function DashboardPage() {
  return (
    <Container component="main">
      <Header>
        <Typography variant="h5" sx={{ mb: 1 }}>Dashboard</Typography>
        <LogoutButton />
      </Header>
      <Chart currentValue={90} maxValue={100} />
    </Container>
  );
}

export default withAuth(DashboardPage);