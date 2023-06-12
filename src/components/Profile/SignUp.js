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
import ErrorAlert from "../Badges/ErrorAlert";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { isEmail, isValidPassword } from "../../validations";
import { ROUTES_DATA } from "../../routes";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
import { MESSAGES } from "../../text";

export default function SignUp() {
  const { signup } = useAuth();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatchingError, setPasswordMatchingError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleEmailBlur(event) {
    const email = event.target.value;
    setEmailError(!isEmail(email));
  }

  function handlePasswordBlur(event) {
    const password = event.target.value;
    setPasswordError(!isValidPassword(password));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fields = Object.fromEntries(formData.entries());

    const email = fields.email;
    const password = fields.password;
    const passwordConfirm = fields.passwordConfirm;

    if (emailError || passwordError || !email || !password) {
      return;
    }

    if (password !== passwordConfirm) {
      return setPasswordMatchingError(true);
    }

    try {
      await signup(email, password);
      navigate(ROUTES_DATA.AUTH.PROFILE.url);
    } catch (error) {
      const message = error.message;

      if (message.includes("auth/email-already-in-use")) {
        dispatch(uiActions.showNotification(MESSAGES.auth.emaiAlreadylInUse));
      } else {
        dispatch(uiActions.showNotification(MESSAGES.auth.createAccountFailed));
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
            onBlur={handleEmailBlur}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            helperText={emailError ? MESSAGES.auth.enterValidEmail : ""}
          />
          <TextField
            error={passwordError}
            onBlur={handlePasswordBlur}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={passwordError ? MESSAGES.auth.enterValidPassword : ""}
          />
          <TextField
            error={passwordMatchingError}
            margin="normal"
            required
            fullWidth
            name="passwordConfirm"
            label="Password Confirmation"
            type="password"
            id="passwordConfirm"
            autoComplete="current-password"
            helperText={
              passwordMatchingError ? MESSAGES.auth.passwordsDoNotMatch : ""
            }
          />
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
              <Link to={ROUTES_DATA.AUTH.SIGN_IN.url}>
                {"Already have an account? Sign In"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <ErrorAlert />
    </Container>
  );
}
