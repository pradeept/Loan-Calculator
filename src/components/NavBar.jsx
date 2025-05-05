import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const drawerWidth = 240;
const navItems = ["Home", "Exchange Rates (live)", "Error Page"];

export default function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currPath, setCurrPath] = useState("/");
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    setCurrPath(pathname);
  }, []);
  const paths = {
    Home: "/",
    "Exchange Rates (live)": "/rate-conversion",
    "Error Page": "/error",
  };
  const handleNav = (item) => {
    setCurrPath(paths[item]);
    navigate(paths[item]);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              sx={{ textAlign: "left" }}
              onClick={() => {
                handleNav(item);
              }}
              selected={paths[item] === currPath}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {/* <ThemeToggle /> */}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar component='nav' position='static'>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            component='div'
            sx={{ flexGrow: 1, display: { sm: "block" } }}
          >
            Loan Caclulator
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{
                  color: "#fff",
                  backgroundColor:
                    paths[item] === currPath ? "#1565c0" : "transparent",
                  paddingX: "1rem",
                }}
                onClick={() => handleNav(item)}
              >
                {item}
              </Button>
            ))}
          </Box>
          <ThemeToggle />
        </Toolbar>
      </AppBar>

      <Drawer
        container={container}
        variant='temporary'
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
