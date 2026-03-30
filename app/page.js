"use client";

import { useState } from "react";

export default function HomePage() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [price, setPrice] = useState("");
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    const res = await fetch("/api/affordability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        income: Number(income),
        expenses: Number(expenses),
        savings: Number(savings),
        price: Number(price),
      }),
    });

    const data = await res.json();
    setResult(data.result);
  };

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Can I Afford This</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <input placeholder="Monthly Income" value={income} onChange={(e) => setIncome(e.target.value)} />
        <input placeholder="Monthly Expenses" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
        <input placeholder="Savings" value={savings} onChange={(e) => setSavings(e.target.value)} />
        <input placeholder="Item Price" value={price} onChange={(e) => setPrice(e.target.value)} />

        <button onClick={handleCheck}>Check Affordability</button>
      </div>

      {result && (
        <div style={{ marginTop: "20px" }}>
          <p>Can Afford: {result.canAfford ? "Yes" : "No"}</p>
          <p>Monthly Left: ${result.monthlyAvailable}</p>
          <p>Required Savings: ${result.requiredSavings}</p>
        </div>
      )}
    </main>
  );
}
