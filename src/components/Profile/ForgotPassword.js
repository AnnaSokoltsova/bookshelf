import * as React from "react";
import { useState } from "react";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { ROUTES_DATA } from "../../routes";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
import ErrorAlert from "../Badges/ErrorAlert";
import { MESSAGES } from "../../text";


export default function ForgotPassword() {
  const { resetPassword } = useAuth();

  const [message, setMessage] = useState(false);
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");

    try {
      await resetPassword(email);
      setMessage(true);
    } catch (error) {
      const message = error.message;
      if (message.includes("auth/user-not-found")) {
        dispatch(
          uiActions.showNotification(
            MESSAGES.auth.emailNotFound
          )
        );
        
      } else {
        dispatch(uiActions.showNotification(MESSAGES.auth.resetPasswordFailed));
        
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
          Forgot Password?
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={
              message ? MESSAGES.auth.checkInbox : ""
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Reset Password
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link to={ROUTES_DATA.AUTH.SIGN_IN.url}>
                Remember Password? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ErrorAlert />
    </Container>
  );
}
