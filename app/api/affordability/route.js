// FILE: app/api/affordability/route.js
// VERSION: v2 - Step-by-step explanation logic added
// PURPOSE: Backend affordability engine with full transparency math + explanations

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

  // ---- CORE CALCULATION ----
  const monthlyAvailable = income - expenses;

  let monthlyPayment = 0;
  let remainingSavings = savings;
  let canAfford = false;
  let explanation = "";

  // ---- CASH PURCHASE ----
  if (paymentType === "cash") {
    remainingSavings = savings - price;

    canAfford =
      remainingSavings >= 3000 && // safety buffer
      monthlyAvailable > 0;

    explanation = `
Monthly income: $${income}
Monthly expenses: $${expenses}

Money left each month:
$${income} - $${expenses} = $${monthlyAvailable}

Savings before purchase: $${savings}
Purchase price: $${price}

Savings after purchase:
$${savings} - $${price} = $${remainingSavings}

Result:
${
  canAfford
    ? "You can afford this purchase while maintaining a safe savings buffer."
    : "This purchase is not recommended because it reduces your savings below a safe level."
}
`;
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

    const roundedPayment = Math.round(monthlyPayment);

    remainingSavings = savings - downPayment;

    const leftoverAfterPayment = Math.round(monthlyAvailable - monthlyPayment);

    canAfford =
      leftoverAfterPayment > 500 && // breathing room threshold
      remainingSavings >= 3000;

    explanation = `
Monthly income: $${income}
Monthly expenses: $${expenses}

Money left each month:
$${income} - $${expenses} = $${monthlyAvailable}

Loan amount:
$${price} - $${downPayment} = $${loanAmount}

Estimated monthly payment:
$${roundedPayment}

Money left after payment:
$${monthlyAvailable} - $${roundedPayment} = $${leftoverAfterPayment}

Savings after down payment:
$${savings} - $${downPayment} = $${remainingSavings}

Result:
${
  canAfford
    ? "You can afford this purchase with a comfortable monthly buffer."
    : "This purchase is not recommended because the remaining monthly buffer is too low or savings are insufficient."
}
`;
  }

  return Response.json({
    success: true,
    result: {
      canAfford,
      monthlyAvailable,
      monthlyPayment: Math.round(monthlyPayment),
      remainingSavings,
      explanation
    }
  });
}
