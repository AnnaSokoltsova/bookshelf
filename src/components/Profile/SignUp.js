import { useState } from "react";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import classes from "./Authentication.module.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const isValidPassword = (password) => /^(?=.*\d).{8,}$/.test(password);

export default function SignUp() {
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    const passwordConfirm = data.get("passwordConfirm");
    let emailOrPasswordInvalid = false;

    if (!isEmail(email)) {
      setError("");
      setEmailError(true);
      emailOrPasswordInvalid = true;
    } else {
      setEmailError(false);
    }

    if (!isValidPassword(password)) {
      setPasswordError(true);
      emailOrPasswordInvalid = true;
    } else {
      setPasswordError(false);
    }

    if (emailOrPasswordInvalid) {
      return;
    }

    if (password !== passwordConfirm) {
      return setError("Passwords do not match");
    }

    try {
      await signup(email, password);
      navigate("/profile");
    } catch (error) {
      const message = error.message;

      if (message.includes("auth/email-already-in-use")) {
        setError(`Email is already in use`);
      } else {
        setError(`Failed to create an account`);
      }
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={emailError}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={emailError ? "Please enter a valid email address" : ""}
          />
          <TextField
            error={passwordError}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={
              passwordError
                ? "Password should be at least 8 characters long and contain at least one digit"
                : ""
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordConfirm"
            label="Password Confirmation"
            type="password"
            id="passwordConfirm"
            autoComplete="current-password"
          />

          {error && <p className={classes["error__text"]}>{error}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to="/signin">{"Already have an account? Sign In"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
