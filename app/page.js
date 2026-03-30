// FILE: app/page.js
// VERSION: v2 - Display backend explanation + fix UI clarity

"use client";

import { useState } from "react";

export default function Home() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [price, setPrice] = useState("");

  const [result, setResult] = useState(null);

  async function handleCheck() {
    const res = await fetch("/api/affordability", {
      method: "POST",
      body: JSON.stringify({
        income: Number(income),
        expenses: Number(expenses),
        savings: Number(savings),
        price: Number(price),
        paymentType: "finance"
      })
    });

    const data = await res.json();
    setResult(data.result);
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Can I Afford This</h1>

      <input
        placeholder="Monthly Income"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />
      <br />

      <input
        placeholder="Monthly Expenses"
        value={expenses}
        onChange={(e) => setExpenses(e.target.value)}
      />
      <br />

      <input
        placeholder="Savings"
        value={savings}
        onChange={(e) => setSavings(e.target.value)}
      />
      <br />

      <input
        placeholder="Item Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br />

      <button onClick={handleCheck}>Check Affordability</button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <p><strong>Can Afford:</strong> {result.canAfford ? "Yes" : "No"}</p>

          <p><strong>Monthly Left:</strong> ${result.monthlyAvailable}</p>

          <p><strong>Estimated Payment:</strong> ${result.monthlyPayment}</p>

          <p><strong>Savings After:</strong> ${result.remainingSavings}</p>

          <hr />

          <h3>How this was calculated:</h3>

          <pre style={{ whiteSpace: "pre-wrap" }}>
            {result.explanation}
          </pre>
        </div>
      )}
    </main>
  );
}
