import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <Box
        sx={{
          height: "calc(100vh - 64px)", // subtract navbar height (usually 64px)
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2, // padding on small screens
        }}
      >
        
        <Typography variant="h5" color="error">404 Page Not Found</Typography>
        <Button onClick={() => navigate("/")} variant="outlined">Back to Home</Button>
      </Box>
    </>
  );
}
