import { Container, Typography } from "@mui/material";
import * as React from "react";

import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <Container component="main">
      <Typography variant="h5">Login Page</Typography>
      <LoginForm onLogin={() => { }} />
    </Container>
  );
}