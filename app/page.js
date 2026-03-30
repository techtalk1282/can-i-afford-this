// FILE: app/page.js
// VERSION: v5 - Remove "STEP" labels and convert to clean financial breakdown
// PURPOSE: Improve UX by removing instructional tone and making output feel professional

"use client";

import { useState } from "react";

export default function Home() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [price, setPrice] = useState("");

  const [result, setResult] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

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
    setShowBreakdown(false);
  }

  // 🔥 Helper to clean labels
  function formatLine(line) {
    return line
      .replace(/STEP \d+ — /g, "") // remove STEP labels
      .replace("Result:", "Summary:");
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
          style={{ marginTop: 10, padding: "8px 12px", cursor: "pointer" }}
        >
          Check Affordability
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 30, maxWidth: 600 }}>

          {/* SUMMARY CARD */}
          <div
            style={{
              padding: 20,
              border: "1px solid #ddd",
              borderRadius: 8,
              marginBottom: 15
            }}
          >
            <p><strong>Can Afford:</strong> {result.canAfford ? "Yes" : "No"}</p>
            <p><strong>Monthly Left:</strong> ${result.monthlyAvailable}</p>
            <p><strong>Estimated Payment:</strong> ${result.monthlyPayment}</p>
            <p><strong>Savings After:</strong> ${result.remainingSavings}</p>

            <p style={{ marginTop: 10 }}>
              {result.canAfford
                ? "You are in a safe position for this purchase."
                : "This purchase may stretch your finances."}
            </p>
          </div>

          {/* TOGGLE */}
          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            style={{
              marginBottom: 10,
              padding: "6px 10px",
              cursor: "pointer"
            }}
          >
            {showBreakdown ? "Hide full breakdown" : "Show full breakdown"}
          </button>

          {/* BREAKDOWN */}
          {showBreakdown && (
            <div
              style={{
                padding: 20,
                border: "1px solid #ddd",
                borderRadius: 8,
                background: "#f9f9f9"
              }}
            >
              <h3 style={{ marginBottom: 10 }}>Detailed Breakdown</h3>

              {result.explanation.split("\n").map((line, index) => {
                const cleanLine = formatLine(line);

                if (!cleanLine.trim()) return null;

                // Section headers (former STEP titles)
                if (
                  cleanLine.includes("Monthly leftover") ||
                  cleanLine.includes("Loan amount") ||
                  cleanLine.includes("Estimated monthly payment") ||
                  cleanLine.includes("Money left after payment") ||
                  cleanLine.includes("Savings after") ||
                  cleanLine.includes("Safety rules")
                ) {
                  return (
                    <p key={index} style={{ fontWeight: "bold", marginTop: 10 }}>
                      {cleanLine}
                    </p>
                  );
                }

                // Summary line
                if (cleanLine.includes("Summary")) {
                  return (
                    <p key={index} style={{ marginTop: 15, fontWeight: "bold" }}>
                      {cleanLine}
                    </p>
                  );
                }

                return (
                  <p key={index} style={{ marginLeft: 10 }}>
                    {cleanLine}
                  </p>
                );
              })}
            </div>
          )}

        </div>
      )}
    </main>
  );
}
