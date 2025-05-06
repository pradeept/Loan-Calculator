export default function calculateEMI(amount, rate, term) {
    const n = term * 12; // total months
    const r = rate / 12 / 100; // monthly interest rate

    const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return emi;
}

