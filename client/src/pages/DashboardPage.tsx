import { Container, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import Chart from "../components/Chart";
import Header from "../components/Header";
import Loader from "../components/Loader";
import LogoutButton from "../components/LogoutButton";
import withAuth from "../components/WithAuth";
import { getChartData } from "../lib/api";
import { removeAccessToken } from "../lib/auth";
import { AuthError } from "../lib/exceptions";
import { ChartData } from "../lib/models";
import { getApiURL } from "../lib/utils";

function DashboardPage() {
  const [chartData, setChartData] = React.useState<ChartData | null>(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    getChartData(`${getApiURL()}/chart-data`)
      .then((chartData) => setChartData(chartData))
      .catch((err) => {
        if (err instanceof AuthError) {
          removeAccessToken();
          navigate("/login");
        } else {
          console.error(err);
        }
      });
  }, []);
  return (
    <Container component="main">
      <Header>
        <Typography variant="h5" sx={{ mb: 1 }}>Dashboard</Typography>
        <LogoutButton />
      </Header>
      {
        chartData
          ? <Chart currentValue={chartData.value} maxValue={chartData.max} />
          : <Loader />
      }
    </Container>
  );
}

export default withAuth(DashboardPage);