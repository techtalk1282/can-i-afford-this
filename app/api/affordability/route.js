/**
 * File: app/api/affordability/route.js
 * Version: v4
 * Date: 2026-04-15
 *
 * Purpose:
 * - Handle affordability calculations for cash and finance purchases
 * - Return clear step-by-step explanation for user trust
 *
 * Inputs:
 * - income
 * - expenses
 * - savings
 * - price
 * - paymentType
 * - downPayment
 * - interestRate
 * - loanTermYears
 *
 * Outputs:
 * - canAfford
 * - monthlyAvailable
 * - monthlyPayment
 * - remainingSavings
 * - explanation
 *
 * Sections:
 * 1. Health check GET route
 * 2. POST request input parsing
 * 3. Input validation (SECURITY LAYER)
 * 4. Shared calculation setup
 * 5. Cash purchase logic
 * 6. Finance purchase logic
 * 7. Final JSON response
 *
 * Safe edit zones:
 * - explanation text
 * - affordability thresholds
 * - output structure (with caution)
 *
 * Protected caution:
 * - Do NOT change response shape without checking frontend usage
 * - Do NOT remove validation layer
 */

/* =========================================================
   SECTION 1 — HEALTH CHECK (GET)
   Purpose: Verify API is running
========================================================= */
export async function GET() {
  return Response.json({
    message: "Affordability API is working"
  });
}

/* =========================================================
   SECTION 2 — MAIN POST HANDLER
   Purpose: Receive user input + process affordability
========================================================= */
export async function POST(req) {
  const body = await req.json();

  /* =========================================================
     SECTION 3 — INPUT PARSING
     Purpose: Extract user-provided financial inputs
  ========================================================= */
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

  /* =========================================================
     SECTION 4 — INPUT VALIDATION (SECURITY LAYER)
     Purpose: Prevent invalid or unsafe data from breaking logic
  ========================================================= */

  const requiredFields = { income, expenses, savings, price };

  for (const [key, value] of Object.entries(requiredFields)) {
    if (value === undefined || value === null || value === "") {
      return Response.json({
        success: false,
        error: `${key} is required`
      }, { status: 400 });
    }

    if (typeof value !== "number" || isNaN(value)) {
      return Response.json({
        success: false,
        error: `${key} must be a valid number`
      }, { status: 400 });
    }

    if (value < 0) {
      return Response.json({
        success: false,
        error: `${key} cannot be negative`
      }, { status: 400 });
    }
  }
// Ensure down payment does not exceed savings
if (downPayment > savings) {
  return Response.json({
    success: false,
    error: "Down payment cannot exceed your savings"
  }, { status: 400 });
}

// Ensure down payment does not exceed item price
if (downPayment > price) {
  return Response.json({
    success: false,
    error: "Down payment cannot exceed item price"
  }, { status: 400 });
}
  const optionalFields = { downPayment, interestRate, loanTermYears };

  for (const [key, value] of Object.entries(optionalFields)) {
    if (value !== undefined && value !== null) {
      if (typeof value !== "number" || isNaN(value)) {
        return Response.json({
          success: false,
          error: `${key} must be a valid number`
        }, { status: 400 });
      }

      if (value < 0) {
        return Response.json({
          success: false,
          error: `${key} cannot be negative`
        }, { status: 400 });
      }
    }
  }

  if (paymentType !== "cash" && paymentType !== "finance") {
    return Response.json({
      success: false,
      error: "Invalid payment type"
    }, { status: 400 });
  }

  /* =========================================================
     SECTION 5 — SHARED CALCULATION SETUP
     Purpose: Initialize shared variables for both paths
  ========================================================= */

  const monthlyAvailable = income - expenses;

  let monthlyPayment = 0;
  let remainingSavings = savings;
  let canAfford = false;
  let explanation = "";

  /* =========================================================
     SECTION 6 — CASH PURCHASE LOGIC
     Purpose: Evaluate affordability for full cash payment
  ========================================================= */

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

  /* =========================================================
     SECTION 7 — FINANCE PURCHASE LOGIC
     Purpose: Evaluate affordability for financed purchase
  ========================================================= */

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
Estimated using 7% interest over 5 years → Monthly payment = $${roundedPayment}

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

  /* =========================================================
     SECTION 8 — FINAL RESPONSE
     Purpose: Return structured affordability result to frontend
  ========================================================= */

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
