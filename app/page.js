"use client";

import { useState } from "react";

/*
VERSION: v8
PURPOSE:
- Remove alert() completely
- Add inline field validation
- Block invalid input at typing level
- Ensure ONLY positive numbers allowed
- Add clean summary handling
*/

function isValidPositiveNumber(value) {
  if (value === "") return true; // allow empty while typing
  return /^[0-9]*\.?[0-9]+$/.test(value);
}

function sanitizeNumber(value) {
  const parsed = parseFloat(value);
  if (isNaN(parsed) || parsed < 0) return 0;
  return parsed;
}

export default function Home() {
  const [income, setIncome] = useState("");
  const [expenses, setExpenses] = useState("");
  const [savings, setSavings] = useState("");
  const [price, setPrice] = useState("");

  const [errors, setErrors] = useState({
    income: "",
    expenses: "",
    savings: "",
    price: "",
  });

  const [result, setResult] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  function handleInputChange(field, value, setter) {
    // Block invalid characters immediately
    if (!isValidPositiveNumber(value)) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Please enter a valid positive number",
      }));
      return;
    }

    // Clear error + update value
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));

    setter(value);
  }

  async function handleCheck() {
    const cleanIncome = sanitizeNumber(income);
    const cleanExpenses = sanitizeNumber(expenses);
    const cleanSavings = sanitizeNumber(savings);
    const cleanPrice = sanitizeNumber(price);

    const newErrors = {
      income: cleanIncome <= 0 ? "Please enter a valid positive number" : "",
      expenses: cleanExpenses <= 0 ? "Please enter a valid positive number" : "",
      savings: cleanSavings < 0 ? "Please enter a valid positive number" : "",
      price: cleanPrice <= 0 ? "Please enter a valid positive number" : "",
    };

    setErrors(newErrors);

    if (
      newErrors.income ||
      newErrors.expenses ||
      newErrors.savings ||
      newErrors.price
    ) {
      return;
    }

    const res = await fetch("/api/affordability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        income: cleanIncome,
        expenses: cleanExpenses,
        savings: cleanSavings,
        price: cleanPrice,
        paymentType: "finance",
      }),
    });

    const data = await res.json();
    setResult(data.result);
    setShowBreakdown(false);

    setTimeout(() => {
      const resultSection = document.getElementById("result-section");
      if (resultSection) {
        resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }

  function formatLine(line) {
    let cleaned = line
      .replace(/STEP \d+ — /g, "")
      .replace("Result:", "Summary:");

    cleaned = cleaned.replace(/\$-([0-9]+)/g, "$0");

    return cleaned;
  }

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

  function renderBreakdownCard(title, content, key) {
    return (
      <div key={key} style={cardStyle}>
        <h3 style={cardTitle}>{title}</h3>
        {content.map((line, i) => (
          <p key={i} style={cardText}>{line}</p>
        ))}
      </div>
    );
  }

  const inputFields = [
    { key: "income", label: "Monthly Income", value: income, setter: setIncome },
    { key: "expenses", label: "Monthly Expenses", value: expenses, setter: setExpenses },
    { key: "savings", label: "Savings", value: savings, setter: setSavings },
    { key: "price", label: "Item Price", value: price, setter: setPrice },
  ];

  return (
    <main style={mainStyle}>
      <div style={containerStyle}>

        <h1 style={titleStyle}>Can I Afford This?</h1>

        <div style={gridStyle}>

          {/* INPUT SIDE */}
          <div style={cardStyle}>
            {inputFields.map((field) => (
              <div key={field.key} style={{ marginBottom: 16 }}>
                <label style={labelStyle}>{field.label}</label>

                <input
                  value={field.value}
                  onChange={(e) =>
                    handleInputChange(field.key, e.target.value, field.setter)
                  }
                  style={{
                    ...inputStyle,
                    border: errors[field.key]
                      ? "1px solid red"
                      : "1px solid #ccc",
                  }}
                />

                {errors[field.key] && (
                  <div style={errorStyle}>
                    {errors[field.key]}
                  </div>
                )}
              </div>
            ))}

            <button onClick={handleCheck} style={buttonStyle}>
              Check My Affordability →
            </button>
          </div>

          {/* RESULT */}
          {result && (
            <div style={cardStyle}>
              <h2>Your Result</h2>

              <p><strong>Can Afford:</strong> {result.canAfford ? "Yes" : "No"}</p>
              <p><strong>Monthly Left:</strong> ${result.monthlyAvailable}</p>
              <p><strong>Payment:</strong> ${result.monthlyPayment}</p>
              <p><strong>Savings After:</strong> ${result.remainingSavings}</p>

              <p style={{ marginTop: 10 }}>
                {result.canAfford
                  ? "You are in a safe position for this purchase."
                  : "This purchase may stretch your finances."}
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

/* STYLES */

const mainStyle = { padding: 20, fontFamily: "Arial" };
const containerStyle = { maxWidth: 900, margin: "0 auto" };
const gridStyle = { display: "grid", gap: 20 };

const cardStyle = {
  background: "#fff",
  padding: 20,
  borderRadius: 12,
  border: "1px solid #eee",
};

const labelStyle = { fontWeight: "bold", marginBottom: 6, display: "block" };
const inputStyle = {
  width: "100%",
  height: 40,
  padding: "0 10px",
  borderRadius: 8,
};

const errorStyle = {
  color: "red",
  fontSize: 13,
  marginTop: 4,
};

const buttonStyle = {
  marginTop: 20,
  width: "100%",
  height: 45,
  background: "#1f8a70",
  color: "#fff",
  border: "none",
  borderRadius: 999,
  fontSize: 18,
  cursor: "pointer",
};

const titleStyle = {
  textAlign: "center",
  marginBottom: 20,
};

const cardTitle = { fontWeight: "bold", marginBottom: 10 };
const cardText = { margin: "6px 0" };
