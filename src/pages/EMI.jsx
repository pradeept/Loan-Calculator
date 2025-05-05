import { Box, Input, TextField, Typography } from "@mui/material";
import NavBar from "../components/NavBar";
import {  useState } from "react";
import useInputValidation from "../hooks/useValidate";

export default function EMI() {
  const [inputs, setInputs] = useState({ amount: 10000, rate: 8.5, term: 3 });
  const { inputError, errorMessage, validateField, validateAll } =
    useInputValidation(inputs);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = () => {
    if (validateAll(inputs)) {
      // Proceed with form submission
    }
  };

  return (
    <>
      <NavBar />
      <Box>
        <Typography variant='h4'>Loan Calculator Dashboard</Typography>
        <Box variant='div' sx={{ display: "flex" }}>
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
      </Box>
    </>
  );
}
