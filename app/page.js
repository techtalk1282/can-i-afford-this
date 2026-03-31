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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        income: Number(income),
        expenses: Number(expenses),
        savings: Number(savings),
        price: Number(price),
        paymentType: "finance",
      }),
    });

    const data = await res.json();
    setResult(data.result);
    setShowBreakdown(false);
  }

  function formatLine(line) {
    return line
      .replace(/STEP \d+ — /g, "")
      .replace("Result:", "Summary:");
  }

  // 🔥 Extract sections into structured blocks
  function parseExplanation(explanation) {
    const lines = explanation.split("\n").map(formatLine);

    const sections = {
      monthly: [],
      loan: [],
      payment: [],
      afterPayment: [],
      savings: [],
      safety: [],
      summary: "",
    };

    let current = "";

    lines.forEach((line) => {
      if (!line.trim()) return;

      if (line.includes("Monthly leftover")) current = "monthly";
      else if (line.includes("Loan amount")) current = "loan";
      else if (line.includes("Estimated monthly payment")) current = "payment";
      else if (line.includes("Money left after payment")) current = "afterPayment";
      else if (line.includes("Savings after")) current = "savings";
      else if (line.includes("Safety rules")) current = "safety";
      else if (line.includes("Summary")) {
        sections.summary = line;
        current = "";
      } else if (current) {
        sections[current].push(line);
      }
    });

    return sections;
  }

  return (
    <main style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: 36, marginBottom: 20 }}>
        Can I Afford This
      </h1>

      <div style={{ maxWidth: 300 }}>
        <input placeholder="Monthly Income" value={income} onChange={(e) => setIncome(e.target.value)} />
        <br />
        <input placeholder="Monthly Expenses" value={expenses} onChange={(e) => setExpenses(e.target.value)} />
        <br />
        <input placeholder="Savings" value={savings} onChange={(e) => setSavings(e.target.value)} />
        <br />
        <input placeholder="Item Price" value={price} onChange={(e) => setPrice(e.target.value)} />
        <br />

        <button
          onClick={handleCheck}
          style={{ marginTop: 10, padding: "8px 12px", cursor: "pointer" }}
        >
          Check Affordability
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 30, maxWidth: 900 }}>

          {/* SUMMARY */}
          <div
            style={{
              padding: 20,
              borderRadius: 10,
              background: "#ffffff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              marginBottom: 20,
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

          <button
            onClick={() => setShowBreakdown(!showBreakdown)}
            style={{ marginBottom: 15, padding: "6px 10px", cursor: "pointer" }}
          >
            {showBreakdown ? "Hide full breakdown" : "Show full breakdown"}
          </button>

          {showBreakdown && (() => {
            const sections = parseExplanation(result.explanation);

            return (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 15,
                }}
              >

                {/* CARD BUILDER */}
                {[
                  ["Monthly leftover", sections.monthly],
                  ["Loan amount", sections.loan],
                  ["Estimated payment", sections.payment],
                  ["After payment", sections.afterPayment],
                  ["Savings after", sections.savings],
                  ["Safety rules", sections.safety],
                ].map(([title, content], i) => (
                  <div
                    key={i}
                    style={{
                      padding: 15,
                      borderRadius: 10,
                      background: "#f8f9fb",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                    }}
                  >
                    <strong>{title}</strong>
                    {content.map((line, idx) => (
                      <p key={idx} style={{ marginTop: 5 }}>{line}</p>
                    ))}
                  </div>
                ))}

                {/* SUMMARY FULL WIDTH */}
                <div
                  style={{
                    gridColumn: "span 2",
                    padding: 15,
                    borderRadius: 10,
                    background: "#eef2ff",
                    fontWeight: "bold",
                  }}
                >
                  {sections.summary}
                </div>

              </div>
            );
          })()}

        </div>
      )}
    </main>
  );
}
