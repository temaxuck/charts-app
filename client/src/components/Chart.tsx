import { Box, Typography } from "@mui/material";
import * as React from "react";

export interface Props {
  percentage: number;
}

export default function Chart({ percentage }: Props) {
  return (
    <Box>
      <Typography variant="h4">Chart</Typography>
      <Typography variant="h3">{percentage}</Typography>
    </Box>
  );
}