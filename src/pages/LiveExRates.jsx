import { Box, Button, TextField } from "@mui/material";
import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import useInputValidation from "../hooks/useValidate";
import styles from "./styles.module.css";


export default function LiveExRates() {
  const [amount, setAmount] = useState("1");
  const { inputError, errorMessage, validateField } = useInputValidation({
    exAmount: amount,
  });

  useEffect(() => {
    validateField("exAmount", amount);
  }, [amount]);

  return (
    <>
      <NavBar />
      <Box variant="div" className={styles.exchange_container}>
        <TextField
          name='Amount'
          label="Amount in USD ($)"
          error={inputError.exAmount}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          helperText={errorMessage.exAmount}
        ></TextField>
        <Button variant='contained' disabled={inputError.exAmount}>
          Get Exchange Rate
        </Button>
      </Box>
    </>
  );
}

// theme context memo
// calculateEmi, generateEmis
// usevalidate ()
