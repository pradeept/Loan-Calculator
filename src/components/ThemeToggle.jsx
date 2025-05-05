// ThemeToggleSwitch.jsx
import React from "react";
import Switch from "@mui/material/Switch";
// import { useThemeMode } from "./ThemeContext";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useThemeMode } from "../context/ThemeContextComp";

function ThemeToggle() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Box display='flex' alignItems='center'>
      {/* <Typography variant='body2' sx={{ mr: 1 }}>
        {mode === "light" ? "Light" : "Dark"} Mode
      </Typography> */}
      <Switch checked={mode === "dark"} onChange={toggleTheme} />
    </Box>
  );
}

export default ThemeToggle;
