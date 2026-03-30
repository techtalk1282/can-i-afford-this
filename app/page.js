// FILE: app/page.js
// VERSION: v3 - UI polish for premium readability
// PURPOSE: Clean, structured display of affordability results

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
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: 36, marginBottom: 20 }}>Can I Afford This</h1>

      <div style={{ maxWidth: 300 }}>
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

        <button
          onClick={handleCheck}
          style={{
            marginTop: 10,
            padding: "8px 12px",
            cursor: "pointer"
          }}
        >
          Check Affordability
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 30, maxWidth: 600 }}>

          {/* SUMMARY BLOCK */}
          <div
            style={{
              padding: 20,
              border: "1px solid #ddd",
              borderRadius: 8,
              marginBottom: 20
            }}
          >
            <p><strong>Can Afford:</strong> {result.canAfford ? "Yes" : "No"}</p>
            <p><strong>Monthly Left:</strong> ${result.monthlyAvailable}</p>
            <p><strong>Estimated Payment:</strong> ${result.monthlyPayment}</p>
            <p><strong>Savings After:</strong> ${result.remainingSavings}</p>
          </div>

          {/* EXPLANATION BLOCK */}
          <div
            style={{
              padding: 20,
              border: "1px solid #ddd",
              borderRadius: 8,
              background: "#f9f9f9"
            }}
          >
            <h3 style={{ marginBottom: 10 }}>How this was calculated</h3>

            {result.explanation.split("\n").map((line, index) => {
              if (line.includes("STEP")) {
                return (
                  <p key={index} style={{ fontWeight: "bold", marginTop: 10 }}>
                    {line}
                  </p>
                );
              }

              if (line.includes("=")) {
                return (
                  <p key={index} style={{ marginLeft: 10 }}>
                    {line}
                  </p>
                );
              }

              if (line.includes("Result")) {
                return (
                  <p key={index} style={{ marginTop: 15, fontWeight: "bold" }}>
                    {line}
                  </p>
                );
              }

              return (
                <p key={index} style={{ marginLeft: 10 }}>
                  {line}
                </p>
              );
            })}
          </div>

        </div>
      )}
    </main>
  );
}
