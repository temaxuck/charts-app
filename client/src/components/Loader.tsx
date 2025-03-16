import { Box, CircularProgress, Typography } from "@mui/material";
import * as React from "react";


export default function Loader() {
  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    }} >
      <CircularProgress size={100} />
      <Typography variant="h6">Fetching data...</Typography>
    </Box>
  );
}