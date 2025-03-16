import { Box, Typography } from "@mui/material";
import * as React from "react";

export interface Props {
  onLogin: (username: string, password: string) => void
}

export default function LoginForm({ onLogin }: Props) {
  return (
    <Box>
      <Typography variant="h4">Login form</Typography>
    </Box>
  );
}