import * as React from "react";
import { Divider, Stack } from "@mui/material";

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Stack
        direction="row"
        sx={{ justifyContent: 'space-between', alignItems: 'baseline' }}
      >
        {children}
      </Stack>
      <Divider sx={{ mb: 3 }} />
    </>
  );
}