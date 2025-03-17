import { Container, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import { loginRequest } from "../lib/api";
import { getAccessToken, setAccessToken } from "../lib/auth";
import { AuthError } from "../lib/exceptions";
import { getApiURL } from "../lib/utils";

export default function LoginPage() {
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    const apiUrl = `${getApiURL()}/login`;
    try {
      const accessToken = await loginRequest(apiUrl, username, password);
      setAccessToken(accessToken);
      navigate("/");
    } catch (error) {
      if (error instanceof AuthError) {
        setError(error.details || "Unexpected error happened");
        return;
      }
      setError("Unexpected error happened");
    }
  };

  React.useEffect(() => {
    const accessToken = getAccessToken();
    if (accessToken !== null) {
      navigate("/");
    }
  }, []);

  return (
    <Container component="main">
      <Header>
        <Typography variant="h5" sx={{ mb: 1 }}>Sign in</Typography>
      </Header>
      {error && <Typography color="error">{error}</Typography>}
      <LoginForm onLogin={handleLogin} />
    </Container>
  );
}