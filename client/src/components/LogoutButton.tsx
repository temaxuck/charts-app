import * as React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { removeAccessToken } from "~lib/auth";

export default function LogoutButton() {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeAccessToken();
    navigate("/login");
  }
  return (
    <Button variant="text" onClick={handleLogout}>Log out</Button>
  );
}