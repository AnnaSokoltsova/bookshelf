import {
  AppBar,
  Avatar,
  Toolbar,
  CssBaseline,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";

import { NavLink, Link } from "react-router-dom";
import bookshelf from "../../images/bookshelfsimple.png";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function NavBar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { currentUser } = useAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toValue = currentUser ? "/profile" : "/signin";

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          bgcolor: "var(--clr-background-menu)",
        }}
      >
        <CssBaseline />

        <Toolbar>
          {/* {!isDesktop && (
            <DrawerComponent handleStoriesClick={handleStoriesClick} />
          )} */}

          <Link to="/">
            <Avatar
              alt="bookshelf"
              src={bookshelf}
              sx={{
                width: 45,
                height: 45,
              }}
              variant="square"
            />
          </Link>

          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}
          >
            <MenuItem key={"search"}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
              >
                Search
              </NavLink>
            </MenuItem>
            <MenuItem
              key={"bookshelf"}
              id="resources-button"
              aria-controls={open ? "resources-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onMouseEnter={handleClick}
            >
              <NavLink
                to="/bookshelf"
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
              >
                Bookshelf
              </NavLink>
            </MenuItem>
            <Menu
              id="resources-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              MenuListProps={{
                "aria-labelledby": "resources-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                {" "}
                <NavLink
                  to="/bookshelf"
                  className={({ isActive }) =>
                    isActive ? "link active" : "link"
                  }
                >
                  To Read
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                {" "}
                <NavLink
                  to="/bookshelf/inprogress"
                  className={({ isActive }) =>
                    isActive ? "link active" : "link"
                  }
                >
                  In progress
                </NavLink>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <NavLink
                  to="/bookshelf/completed"
                  className={({ isActive }) =>
                    isActive ? "link active" : "link"
                  }
                >
                  Completed
                </NavLink>
              </MenuItem>
            </Menu>

            <MenuItem key={"profile"}>
              <NavLink
                to={toValue}
                className={({ isActive }) =>
                  isActive ? "link active" : "link"
                }
              >
                Profile
              </NavLink>
            </MenuItem>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
