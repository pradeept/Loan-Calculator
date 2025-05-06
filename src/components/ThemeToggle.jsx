import React from "react";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { useThemeMode } from "../context/ThemeContextComp";

function ThemeToggle() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <Box display='flex' alignItems='center'>
      <Switch checked={mode === "dark"} onChange={toggleTheme} />
    </Box>
  );
}

export default ThemeToggle;
