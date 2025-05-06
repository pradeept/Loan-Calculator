import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import NavBar from "../components/NavBar";
import { useState } from "react";
import styles from "./styles.module.css";
import generateEmis from "../utils/generateEmis";
import calculateEMI from "../utils/calculateEmi";
import useValidate from "../hooks/useValidate";
import axios from "axios";

const API_URL = import.meta.env.VITE_EXCHANGE_API_URL;

const currencyList = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD"];

export default function EMI() {
  const [inputs, setInputs] = useState({ amount: 100000, rate: 8.5, term: 5 });
  const [showCalculations, setShowCalculation] = useState(false);
  const [monthlyEmi, setMonthlyEmi] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const [schedule, setSchedule] = useState([]);
  const [toast, setToast] = useState(false);
  const { inputError, errorMessage, validateField } = useValidate(inputs);
  const [baseSchedule, setBaseSchedule] = useState([]); // keep the USD version

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
    console.log(inputError);
  };
  const handleCurrencyChange = async (e) => {
    const selectedCurrency = e.target.value;
    setCurrency(selectedCurrency);

    if (selectedCurrency === "USD") {
      setSchedule(baseSchedule); // set back the baseSchedule
    } else {
      try {
        const res = await axios.get(API_URL);
        const rate = res.data.conversion_rates[selectedCurrency];

        // recalculate the table
        const convertedSchedule = baseSchedule.map((row) => ({
          ...row,
          principal: (row.principal * rate).toFixed(2),
          interest: (row.interest * rate).toFixed(2),
          emi: (row.emi * rate).toFixed(2),
          balance: (row.balance * rate).toFixed(2),
        }));

        setSchedule(convertedSchedule);
      } catch (e) {
        console.error("Currency conversion error", e);
        setToast(true);
      }
    }
  };

  const handleSubmit = () => {
    const scheduleUSD = generateEmis(inputs);
    // Based on Dollar schedule table
    // Calculate the conversion rates.
    setBaseSchedule(scheduleUSD);
    setSchedule(scheduleUSD);
    setMonthlyEmi(() =>
      calculateEMI(inputs.amount, inputs.rate, inputs.term).toFixed(2)
    );
    setCurrency("USD");
    setShowCalculation(true);
  };

  const calculationResult = (
    <Box>
      <Typography variant='h6' sx={{ padding: "1rem" }}>
        Monthly EMI: {`$ ${monthlyEmi}`}
      </Typography>
      <Box variant='div' className={styles.options_container}>
        <FormControl>
          <InputLabel id='currency-label'>Currency</InputLabel>
          <Select
            labelId='currency-label'
            id='currency-select'
            value={currency}
            label='Currency'
            onChange={(e) => handleCurrencyChange(e)}
          >
            {currencyList.map((item, index) => (
              <MenuItem key={index} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant='outlined'
          color='secondary'
          onClick={() => setShowCalculation(false)}
        >
          RESET TABLE
        </Button>
      </Box>
      {/* table */}
      <Box variant='div' sx={{ maxHeight: 400, overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Month</TableCell>
              <TableCell>Principal</TableCell>
              <TableCell>Interest</TableCell>
              <TableCell>Remaining Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((row) => (
              <TableRow key={row.month}>
                <TableCell>{row.month}</TableCell>
                <TableCell>
                  {row.amount} {currency}
                </TableCell>
                <TableCell>
                  {row.interest} {currency}
                </TableCell>
                <TableCell>
                  {row.balance} {currency}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );

  return (
    <>
      <NavBar />
      <Box sx={{ margin: "1.5rem" }}>
        <Typography variant='h4' sx={{ padding: "1rem" }}>
          Loan Calculator Dashboard
        </Typography>
        <Box
          variant='div'
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            margin: "1rem",
          }}
        >
          <TextField
            name='amount'
            id='outlined-basic'
            label='Loan Amount'
            variant='outlined'
            required
            value={inputs.amount}
            onChange={handleInput}
            error={inputError.amount}
            helperText={errorMessage.amount}
          />
          <TextField
            name='rate'
            id='outlined-basic'
            label='Interest Rate (%)'
            variant='outlined'
            value={inputs.rate}
            onChange={handleInput}
            required
            error={inputError.rate}
            helperText={errorMessage.rate}
          />
          <TextField
            name='term'
            id='outlined-basic'
            label='Term (Years)'
            variant='outlined'
            value={inputs.term}
            onChange={handleInput}
            error={inputError.term}
            helperText={errorMessage.term}
            required
          />
        </Box>
        <Box
          variant='dev'
          sx={{
            display: "flex",
            margin: "1rem",
            gap: "1rem",
            justifyContent: "start",
            alignItems: "center",
          }}
        >
          <Button
            variant='contained'
            onClick={handleSubmit}
            disabled={inputError.amount || inputError.rate || inputError.term}
          >
            Calculate
          </Button>
        </Box>
        {showCalculations && calculationResult}

        <Snackbar
          open={toast}
          autoHideDuration={1000}
          onClose={() => setToast(false)}
        >
          <Alert severity='error' variant='filled' sx={{ width: "100%" }}>
            Something went wrong please try again!
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
}
