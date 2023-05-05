import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Container from "../Container/Container";
import classes from './Profile.module.css';
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [error, setError] = useState("")
  const { currentUser, logout, loading } = useAuth();
  const navigate = useNavigate();
  async function handleLogout() {
    setError("")
    try {
      await logout()
      navigate('/signin');
    } catch {
      setError("Failed to log out")
    }
  }


  return (
    <Container>
      {!loading && (
        <div className={classes.profile}>
          <h2>Profile</h2>
          <p>Email: {currentUser.email}</p>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <Button variant="contained" onClick={handleLogout}>Log out</Button>
        </div>
      )}
    </Container>
  );
}
