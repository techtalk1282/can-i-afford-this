export async function GET() {
  return Response.json({
    message: "Affordability API is working"
  });
}

export async function POST(req) {
  const body = await req.json();

  const {
    income,
    expenses,
    savings,
    price,
    paymentType, // "cash" or "finance"
    downPayment = 0,
    interestRate = 0.07,
    loanTermYears = 5
  } = body;

  const monthlyAvailable = income - expenses;

  let monthlyPayment = 0;
  let remainingSavings = savings;
  let canAfford = false;
  let recommendation = "";

  // ---- CASH PURCHASE ----
  if (paymentType === "cash") {
    remainingSavings = savings - price;

    canAfford =
      remainingSavings >= 3000 && // safety buffer
      monthlyAvailable > 0;

    recommendation = canAfford
      ? "Comfortable"
      : "Not recommended — leaves insufficient savings buffer";
  }

  // ---- FINANCING ----
  if (paymentType === "finance") {
    const loanAmount = price - downPayment;

    const monthlyRate = interestRate / 12;
    const totalMonths = loanTermYears * 12;

    // Loan payment formula
    monthlyPayment =
      (loanAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -totalMonths));

    remainingSavings = savings - downPayment;

    const leftoverAfterPayment = monthlyAvailable - monthlyPayment;

    canAfford =
      leftoverAfterPayment > 500 && // breathing room
      remainingSavings >= 3000;

    recommendation = canAfford
      ? "Comfortable"
      : "Not recommended — payment too high or savings too low";
  }

  return Response.json({
    success: true,
    result: {
      canAfford,
      monthlyAvailable,
      monthlyPayment: Math.round(monthlyPayment),
      remainingSavings,
      recommendation
    }
  });
}
