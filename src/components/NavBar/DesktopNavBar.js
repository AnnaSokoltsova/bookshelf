import { Avatar, Button, Toolbar, Menu, MenuItem, Box } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { NavLink, Link } from "react-router-dom";
import bookshelf from "../../images/bookshelfsimple.png";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function DesktopNavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { currentUser } = useAuth();

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toValue = currentUser ? "/profile" : "/signin";

  return (
    <Box>
      <Toolbar>
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

        <Box sx={{ display: "flex", alignItems: "center", marginLeft: "auto" }}>
          <Button key={"search"}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              Search
            </NavLink>
          </Button>
          <Button
            key={"bookshelf"}
            id="resources-button"
            aria-controls={open ? "resources-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            endIcon={<KeyboardArrowDownIcon />}
            onClick={handleClick}
            sx={{
              color: "var(--clr-text)",
              fontFamily: "Albert Sans",
            }}
          >
            Bookshelf
          </Button>
          <Menu
            id="resources-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "resources-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <NavLink
                to="/bookshelf/toread"
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

          <Button key={"profile"}>
            <NavLink
              to={toValue}
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              Profile
            </NavLink>
          </Button>
        </Box>
      </Toolbar>
    </Box>
  );
}
