# Loan Calculator App
__React app to Calculate Monthly EMI, View Amortization Schedule and View Live Currency Exchange Rates.__

## Live (Netlify)🔴
[loan-calculator-exchange-rate](https://loan-calculator-exchange-rate.netlify.app)

## Tech Stack 🛠️
 ```
 - React.js
 - MUI
 - Context API
 - exchangerate-api.com
```
## Setup and Run ⚙️

``git clone <repo link>``

``cd <cloned-folder>``

``npm i``

``cd run dev``

## Using Docker 🐋

``git clone <repo link>``

``cd <cloned-folder>``

``docker build -t loan-calc:1.0.0 .``

``docker run -p 80:80 --name loan-app loan-calc:1.0.0``

You can access the site at: ``http://localhost:80`` or ``http://127.0.0.1:80``

## Example env 🔑
```
VITE_EXCHANGE_API_URL=
```
NOTE: You can get a free API key from [here](https://www.exchangerate-api.com/)


