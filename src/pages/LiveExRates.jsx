import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  TablePagination,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import NavBar from "../components/NavBar";

const API_URL = import.meta.env.VITE_EXCHANGE_API_URL;

const LiveExRates = () => {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toast, setToast] = useState(false);

  const fetchRates = async () => {
    try {
      const response = await axios.get(API_URL);
      const formattedRates = Object.entries(response.data.conversion_rates).map(
        ([currency, rate]) => ({
          currency,
          rate,
        })
      );
      setRates(formattedRates);
      setLoading(false);
    } catch (error) {
      setToast(true);
      setLoading(false);
      console.error("Error fetching exchange rates:", error);
    }
  };

  useEffect(() => {
    fetchRates();
    // Update every 120 seconds - 2 mins
    const interval = setInterval(fetchRates, 120000);
    return () => clearInterval(interval);
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <NavBar />
      <Box sx={{ maxWidth: 600, margin: "auto", mt: 5 }}>
        <Typography variant='h5' gutterBottom align='center'>
          Live Exchange Rates (USD)
        </Typography>
        <center>(Updates every 120 seconds.)</center>
        {loading ? (
          <Box display='flex' justifyContent='center' mt={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Currency</strong>
                    </TableCell>
                    <TableCell>
                      <strong>Rate</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rates
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(({ currency, rate }) => (
                      <TableRow key={currency}>
                        <TableCell>{currency}</TableCell>
                        <TableCell>{rate.toFixed(4)}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component='div'
              count={rates.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 20]}
            />
          </>
        )}
        <Snackbar
          open={toast}
          autoHideDuration={10000}
          onClose={() => setToast(false)}
        >
          <Alert severity='error' variant='filled' sx={{ width: "100%" }}>
            Something went wrong please try again!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default LiveExRates;
