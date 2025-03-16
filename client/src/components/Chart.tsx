import { Box, Card, Divider, Typography } from "@mui/material";
import * as React from "react";
import DiagramChart from "./DiagramChart";

export interface Props {
  currentValue: number;
  maxValue: number;
}

export default function Chart({ currentValue, maxValue }: Props) {
  const percentage = currentValue / maxValue * 100;

  return (
    <Card variant="outlined" sx={{ maxWidth: 360 }}>
      <Box sx={{ p: 2 }}>
        <Typography gutterBottom variant="h5" component="div">
          Chart data
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {Math.round(currentValue)} / {Math.round(maxValue)}
        </Typography>

      </Box>
      <Divider />
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
        <DiagramChart percentage={percentage} />
      </Box>
    </Card>
  );
}
