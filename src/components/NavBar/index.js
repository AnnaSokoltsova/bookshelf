import React from "react";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import DesktopNavBar from "./DesktopNavBar";
import MobileNavbar from "./MobileNavbar";
import { AppBar } from "@mui/material";

function NavBar() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <AppBar position="static" sx={{
      bgcolor: "var(--clr-background-menu)",
    }}>
      {isDesktop ? <DesktopNavBar /> : <MobileNavbar/>}
    </AppBar>
  );
}

export default NavBar;