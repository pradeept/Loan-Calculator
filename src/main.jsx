import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EMI from "./pages/EMI.jsx";
import LiveExRates from "./pages/LiveExRates.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { ThemeContextComp } from "./context/ThemeContextComp.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeContextComp>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<EMI />} />
          <Route path='/rate-conversion' element={<LiveExRates />} />
          <Route path='/error' element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextComp>
  </StrictMode>
);
