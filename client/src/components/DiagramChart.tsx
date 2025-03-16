import { Box, CircularProgress, Typography } from "@mui/material";
import * as React from "react";


export default function DiagramChart({ percentage }: { percentage: number }) {
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