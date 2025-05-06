import calculateEMI from "./calculateEmi";

export default function generateEmis(inputParam) {
    const { amount, rate, term } = inputParam;
    console.log("generateemi: ", amount, rate, term)
    const r = rate / 12 / 100;
    const n = term * 12;
    const emi = calculateEMI(amount, rate, term);
    console.log("generateemi: ", emi)

    let balance = amount;
    const schedule = [];

    for (let month = 1; month <= n; month++) {
        const interest = balance * r;
        const amountComponent = emi - interest;
        balance -= amountComponent;

        schedule.push({
            month,
            interest: interest.toFixed(2),
            amount: amountComponent.toFixed(2),
            balance: balance > 0 ? balance.toFixed(2) : '0.00',
        });
    }

    return schedule;
}
