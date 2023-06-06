import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Container from "../Container/Container";
import classes from "./Profile.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Profile() {
  const [error, setError] = useState("");
  const { currentUser, logout, loading } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/signin");
    } catch {
      setError("Failed to log out");
    }
  }

  console.log(currentUser);

  return (
    <Container>
      <div >
        <h2>Profile</h2>
        {loading ? <p>Loading...</p> : <div className={classes.profile}>
        {currentUser ? (
          <p>Email: {currentUser.email}</p>
        ) : (
          <p>You are not logged in</p>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {currentUser ? (
          <Button variant="contained" onClick={handleLogout}>
            Log out
          </Button>
        ) : (
          <Link to="/signin">Log in</Link>
        )} 
        </div>}
       
      </div>
    </Container>
  );
}
