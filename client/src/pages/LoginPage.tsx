import { Container, Divider, Typography } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import { getAccessToken, loginRequest, setAccessToken } from "../lib/auth";
import { AuthError } from "~lib/exceptions";

export default function LoginPage() {
  const [error, setError] = React.useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/login`;
    try {
      const accessToken = await loginRequest(apiUrl, username, password);
      setAccessToken(accessToken);
      navigate("/");
    } catch (error) {
      if (error instanceof AuthError) {
        if (error.details)
          setError(error.details);
        else
          setError("Unexpected error happened");
      }
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
      <Typography variant="h5" sx={{ mb: 1 }}>Sign in</Typography>
      <Divider sx={{ mb: 3 }} />
      {error && <Typography color="error">{error}</Typography>} {/* Display the error message */}
      <LoginForm onLogin={handleLogin} />
    </Container>
  );
}