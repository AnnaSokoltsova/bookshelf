import { useAuth } from "../../context/AuthContext";
import Container from "../Container/Container";
import classes from "./Authentication.module.css";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ROUTES_DATA } from "../../routes";
import { uiActions } from "../../store/ui-slice";
import { useDispatch } from "react-redux";
import ErrorAlert from "../Badges/ErrorAlert";
import { MESSAGES } from "../../text";

export default function Profile() {
  const { currentUser, logout, loading } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleLogout() {
    try {
      await logout();
      navigate(ROUTES_DATA.AUTH.SIGN_IN.url);
    } catch {
      dispatch(uiActions.showNotification(MESSAGES.auth.logOutFailed));
     
    }
  }

  console.log(currentUser);

  return (
    <Container>
      <div>
        <h2>Profile</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={classes.profile}>
            {currentUser ? (
              <p className={classes["profile__text"]}>
                Email: {currentUser.email}
              </p>
            ) : (
              <p>You are not logged in</p>
            )}

            {currentUser ? (
              <Button variant="contained" onClick={handleLogout}>
                Log out
              </Button>
            ) : (
              <Link to={ROUTES_DATA.AUTH.SIGN_IN.url}>Log in</Link>
            )}
          </div>
        )}
      </div>
      <ErrorAlert />
    </Container>
  );
}
