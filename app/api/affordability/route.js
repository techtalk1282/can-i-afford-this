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
    price
  } = body;

  const monthlyAvailable = income - expenses;

  const canAfford =
    monthlyAvailable > 0 &&
    savings >= price * 0.2;

  return Response.json({
    success: true,
    result: {
      canAfford,
      monthlyAvailable,
      requiredSavings: price * 0.2
    }
  });
}
