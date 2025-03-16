import { Container, Typography } from "@mui/material";
import * as React from "react";

import Chart from "../components/Chart";

export default function DashboardPage() {
  return (
    <Container component="main">
      <Typography variant="h5">Dashboard</Typography>
      <Chart percentage={0} />
    </Container>
  );
}