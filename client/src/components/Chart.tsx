import { Box, Card, CircularProgress, Divider, Typography } from "@mui/material";
import * as React from "react";

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


function DiagramChart({ percentage }: { percentage: number }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={percentage} size={100} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h5">
          {`${Math.round(percentage)}%`}
        </Typography>
      </Box>
    </Box>
  );
}