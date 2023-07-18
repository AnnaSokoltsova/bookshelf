import React from "react";
import {
  Avatar,
  Drawer,
  Box,
  Toolbar,
  List,
  ListItemButton,
  IconButton,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { NavLink } from "react-router-dom";
import bookshelf from "../../images/bookshelfsimple.png";
import { useAuth } from "../../context/AuthContext";
import { ROUTES_DATA } from "../../routes";


function MobileNavbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (isExpanded, panel) => {
    setExpanded(isExpanded ? panel : false);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const { currentUser } = useAuth();
  const toValue = currentUser ? ROUTES_DATA.AUTH.PROFILE.url : ROUTES_DATA.AUTH.SIGN_IN.url;

  const navLinkStyle = { display: "flex", width: "100%" }

  return (
    <>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems={"center"}
        pl={"30px"}
      >
        <IconButton
          onClick={() => setIsDrawerOpen(true)}
          size="large"
          edge="start"
          color="black"
          aria-label="menu"
          width="10%"
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <Box p={2} width="250px" role="presentation" textAlign="center">
            <List>
              <ListItemButton>
                <NavLink
                  to="/bookshelf"
                  className={({ isActive }) =>
                    isActive ? "link active" : "link"
                  }
                  onClick={closeDrawer}
                  style={navLinkStyle}
                >
                  Search
                </NavLink>
              </ListItemButton>

              <ListItemButton>
                <Accordion
                  sx={{
                    width: "100%",
                    backgroundColor: "var(--clr-background-menu)",
                    boxShadow: 0,
                    ml: 0,
                  }}
                  classes={{ ml: 0 }}
                  expanded={expanded === "panel1"}
                  onChange={(event, isExpanded) =>
                    handleChange(isExpanded, "panel1")
                  }
                >
                  <AccordionSummary
                    id="panel1-header"
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{
                          color: "grey",
                        }}
                      />
                    }
                    sx={{
                      pl: 0,
                    }}
                  >
                    <Typography>Bookshelf</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <ListItemButton>
                      <NavLink
                        to={ROUTES_DATA.BOOKSHELF.TO_READ.url}
                        end
                        className={({ isActive }) =>
                          isActive ? "link active" : "link"
                        }
                        onClick={closeDrawer}
                        style={navLinkStyle}
                      >
                        To Read
                      </NavLink>
                    </ListItemButton>

                    <ListItemButton>
                      <NavLink
                        to={ROUTES_DATA.BOOKSHELF.IN_PROGRESS.url}
                        className={({ isActive }) =>
                          isActive ? "link active" : "link"
                        }
                        onClick={closeDrawer}
                        style={navLinkStyle}
                      >
                        In progress
                      </NavLink>
                    </ListItemButton>

                    <ListItemButton>
                      <NavLink
                        to={ROUTES_DATA.BOOKSHELF.COMPLETED.url}
                        className={({ isActive }) =>
                          isActive ? "link active" : "link"
                        }
                        onClick={closeDrawer}
                        style={navLinkStyle}
                      >
                        Completed
                      </NavLink>
                    </ListItemButton>
                  </AccordionDetails>
                </Accordion>
              </ListItemButton>

              <ListItemButton>
                <NavLink
                  to={toValue}
                  className={({ isActive }) =>
                    isActive ? "link active" : "link"
                  }
                  onClick={closeDrawer}
                  style={navLinkStyle}
                >
                  Profile
                </NavLink>
              </ListItemButton>
            </List>
          </Box>
        </Drawer>
        <Box ml="auto">
          <Toolbar sx={{}}>
            <Avatar
              alt="bookshelf"
              src={bookshelf}
              sx={{
                width: 40,
                height: 40,
                justifySelf: "end",
              }}
              variant="square"
            />
          </Toolbar>
        </Box>
        <Box />
      </Box>
    </>
  );
}

export default MobileNavbar;
