import { useState } from "react";

export default function useInputValidation(initialFields) {
  const [inputError, setInputError] = useState(
    Object.keys(initialFields).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {}
    )
  );

  const [errorMessage, setErrorMessage] = useState(
    Object.keys(initialFields).reduce((acc, key) => ({ ...acc, [key]: "" }), {})
  );

  const validateField = (name, value) => {
    let error = false;
    let message = "";

    if (!value) {
      message = `"${capitalize(name)}" can't be empty`;
      error = true;
    } else if (isNaN(value)) {
      message = `"${capitalize(name)}" must be a number`;
      error = true;
    } else {
      const numericValue = Number(value);
      if (name === "rate" && (numericValue < 1 || numericValue > 100)) {
        message = "Rate should be between 1 and 100";
        error = true;
      } else if (name === "term" && (numericValue < 1 || numericValue > 30)) {
        message = "Term should be between 1 and 30";
        error = true;
      }
    }

    setInputError((prev) => ({ ...prev, [name]: error }));
    setErrorMessage((prev) => ({ ...prev, [name]: message }));

    return !error;
  };

  return {
    inputError,
    errorMessage,
    validateField,
  };
}

const capitalize = (str) => str[0].toUpperCase() + str.slice(1);
