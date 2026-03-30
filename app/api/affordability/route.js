// FILE: app/api/affordability/route.js
// VERSION: v3 - Clean structured explanation with explicit step math
// PURPOSE: Make calculations crystal clear + user-trust focused

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
    paymentType,
    downPayment = 0,
    interestRate = 0.07,
    loanTermYears = 5
  } = body;

  const monthlyAvailable = income - expenses;

  let monthlyPayment = 0;
  let remainingSavings = savings;
  let canAfford = false;
  let explanation = "";

  // ---- CASH ----
  if (paymentType === "cash") {
    remainingSavings = savings - price;

    canAfford =
      remainingSavings >= 3000 &&
      monthlyAvailable > 0;

    explanation = `
STEP 1 — Monthly leftover
$${income} (income) - $${expenses} (expenses) = $${monthlyAvailable}

STEP 2 — Savings after purchase
$${savings} - $${price} = $${remainingSavings}

STEP 3 — Safety check
Minimum recommended savings: $3000

Result:
${
  canAfford
    ? "You are in a safe position to make this purchase."
    : "This purchase would reduce your savings below a safe level."
}
`;
  }

  // ---- FINANCE ----
  if (paymentType === "finance") {
    const loanAmount = price - downPayment;

    const monthlyRate = interestRate / 12;
    const totalMonths = loanTermYears * 12;

    monthlyPayment =
      (loanAmount * monthlyRate) /
      (1 - Math.pow(1 + monthlyRate, -totalMonths));

    const roundedPayment = Math.round(monthlyPayment);

    remainingSavings = savings - downPayment;

    const leftoverAfterPayment = Math.round(monthlyAvailable - monthlyPayment);

    canAfford =
      leftoverAfterPayment > 500 &&
      remainingSavings >= 3000;

    explanation = `
STEP 1 — Monthly leftover
$${income} (income) - $${expenses} (expenses) = $${monthlyAvailable}

STEP 2 — Loan amount
$${price} (price) - $${downPayment} (down payment) = $${loanAmount}

STEP 3 — Estimated monthly payment
Calculated loan payment = $${roundedPayment}

STEP 4 — Money left after payment
$${monthlyAvailable} - $${roundedPayment} = $${leftoverAfterPayment}

STEP 5 — Savings after down payment
$${savings} - $${downPayment} = $${remainingSavings}

STEP 6 — Safety rules
• Minimum leftover after payment: $500  
• Minimum savings: $3000  

Result:
${
  canAfford
    ? "You can afford this purchase with a safe financial buffer."
    : "This purchase is not recommended based on your current numbers."
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
