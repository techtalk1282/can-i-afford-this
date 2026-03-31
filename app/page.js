// FILE: app/page.js
// VERSION: v6 - Landing page rebuild with side-by-side example and input cards
// PURPOSE: Create the approved premium landing layout while preserving the current affordability flow and backend integration

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

    setTimeout(() => {
      const resultSection = document.getElementById("result-section");
      if (resultSection) {
        resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }

  function formatLine(line) {
    return line
      .replace(/STEP \d+ — /g, "")
      .replace("Result:", "Summary:");
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
      <div
        key={key}
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 16,
          padding: 20,
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
        }}
      >
        <h3
          style={{
            margin: "0 0 12px 0",
            fontSize: 20,
            fontWeight: 700,
            color: "#111827",
          }}
        >
          {title}
        </h3>

        {content.map((line, index) => (
          <p
            key={index}
            style={{
              margin: index === 0 ? 0 : "10px 0 0 0",
              fontSize: 17,
              lineHeight: 1.5,
              color: "#374151",
            }}
          >
            {line}
          </p>
        ))}
      </div>
    );
  }

  return (
    <main
  style={{
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f7fb",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  }}
>
      <div
      style={{
      width: "100%",
      maxWidth: 1180,
  }}
>
        <header style={{ textAlign: "center", marginBottom: 24 }}>
          <h1
            style={{
              margin: 0,
              fontSize: 48,
              lineHeight: 1.05,
              fontWeight: 800,
              color: "#111827",
            }}
          >
            Can I Afford This?
          </h1>

          <p
            style={{
             margin: "12px 0 0 0",
             lineHeight: 1.25,
              fontSize: 22,
              lineHeight: 1.3,
              color: "#1f2937",
              fontWeight: 500,
            }}
          >
            Know what you should spend — before you spend it.
          </p>

          <p
            style={{
              margin: "4px 0 0 0",
lineHeight: 1.25,
              fontSize: 18,
              lineHeight: 1.5,
              color: "#6b7280",
            }}
          >
            Make smarter purchase decisions in seconds. No signup required.
          </p>
        </header>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 20,
              padding: 18,
              boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 800,
                color: "#111827",
                textAlign: "center",
              }}
            >
              See How It Works
            </h2>

            <p
              style={{
                margin: "10px 0 24px 0",
                fontSize: 17,
                color: "#6b7280",
                textAlign: "center",
              }}
            >
              A quick example using real numbers
            </p>

            <div
              style={{
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: 16,
                overflow: "hidden",
                marginBottom: 20,
              }}
            >
              {[
                ["Monthly Income", "$6,200"],
                ["Monthly Expenses", "$4,000"],
                ["Savings", "$15,000"],
                ["Item Price", "$40,000"],
                ["Financing", "Loan"],
              ].map(([label, value], index) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 18px",
                    borderBottom: index === 4 ? "none" : "1px solid #e5e7eb",
                  }}
                >
                  <span
                    style={{
                      fontSize: 18,
                      color: "#374151",
                      fontWeight: 500,
                    }}
                  >
                    {label}
                  </span>

                  <span
                    style={{
                      fontSize: 18,
                      color: "#111827",
                      fontWeight: 700,
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <div
              style={{
                background: "linear-gradient(180deg, #effaf5 0%, #f7fffb 100%)",
                border: "1px solid #cdeee0",
                borderRadius: 16,
                padding: 20,
                marginBottom: 18,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: 17,
                  fontWeight: 800,
                  color: "#0f766e",
                }}
              >
                YES — You can afford this
              </p>

              <p
                style={{
                  margin: "8px 0 0 0",
                  fontSize: 16,
                  lineHeight: 1.5,
                  color: "#374151",
                }}
              >
                You are in a safe financial position.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: 14,
              }}
            >
              {[
                ["Monthly Left", "$2,000"],
                ["Est. Payment", "$396"],
                ["Savings After", "$10,000"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    background: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: 14,
                    padding: 16,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: "#6b7280",
                      lineHeight: 1.4,
                    }}
                  >
                    {label}
                  </p>

                  <p
                    style={{
                      margin: "8px 0 0 0",
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#111827",
                    }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #dfe4ea",
              borderRadius: 20,
              padding: 18,
              boxShadow: "0 18px 45px rgba(15, 23, 42, 0.10)",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 24,
                fontWeight: 800,
                color: "#111827",
                textAlign: "center",
              }}
            >
              Check Before You Spend
            </h2>

            <p
              style={{
                margin: "10px 0 24px 0",
                fontSize: 17,
                color: "#6b7280",
                textAlign: "center",
              }}
            >
              Enter your details to get your answer
            </p>

            <div
              style={{
                display: "grid",
                gap: 16,
              }}
            >
              {[
                {
                  label: "Monthly Income",
                  value: income,
                  setValue: setIncome,
                  placeholder: "Enter monthly income",
                },
                {
                  label: "Monthly Expenses",
                  value: expenses,
                  setValue: setExpenses,
                  placeholder: "Enter monthly expenses",
                },
                {
                  label: "Savings",
                  value: savings,
                  setValue: setSavings,
                  placeholder: "Enter current savings",
                },
                {
                  label: "Item Price",
                  value: price,
                  setValue: setPrice,
                  placeholder: "Enter item price",
                },
              ].map((field) => (
                <div key={field.label}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: 8,
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#374151",
                    }}
                  >
                    {field.label}
                  </label>

                  <input
                    value={field.value}
                    onChange={(e) => field.setValue(e.target.value)}
                    placeholder={field.placeholder}
                    style={{
                      width: "100%",
                      height: 46,
                      borderRadius: 12,
                      border: "1px solid #d1d5db",
                      padding: "0 16px",
                      fontSize: 17,
                      color: "#111827",
                      background: "#ffffff",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleCheck}
              style={{
                width: "100%",
                marginTop: 22,
                height: 56,
                border: "none",
                borderRadius: 999,
                background: "linear-gradient(135deg, #1f8a70 0%, #43b692 100%)",
                color: "#ffffff",
                fontSize: 22,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 14px 30px rgba(31, 138, 112, 0.28)",
              }}
            >
              Check My Affordability →
            </button>

            <p
              style={{
                margin: "14px 0 0 0",
                textAlign: "center",
                fontSize: 16,
                color: "#6b7280",
              }}
            >
              Takes 10 seconds • No commitment
            </p>
          </div>
        </section>

        {result && (
          <section id="result-section" style={{ marginTop: 40 }}>
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 20,
                padding: 28,
                boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
                marginBottom: 18,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#111827",
                }}
              >
                Your Result
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  gap: 16,
                  marginTop: 20,
                }}
              >
                {[
                  ["Can Afford", result.canAfford ? "Yes" : "No"],
                  ["Monthly Left", `$${result.monthlyAvailable}`],
                  ["Estimated Payment", `$${result.monthlyPayment}`],
                  ["Savings After", `$${result.remainingSavings}`],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    style={{
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: 14,
                      padding: 18,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        color: "#6b7280",
                      }}
                    >
                      {label}
                    </p>

                    <p
                      style={{
                        margin: "10px 0 0 0",
                        fontSize: 24,
                        fontWeight: 800,
                        color: "#111827",
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <p
                style={{
                  margin: "20px 0 0 0",
                  fontSize: 18,
                  lineHeight: 1.5,
                  color: "#374151",
                }}
              >
                {result.canAfford
                  ? "You are in a safe position for this purchase."
                  : "This purchase may stretch your finances."}
              </p>
            </div>

            <button
              onClick={() => setShowBreakdown(!showBreakdown)}
              style={{
                marginBottom: 18,
                height: 48,
                padding: "0 18px",
                borderRadius: 12,
                border: "1px solid #d1d5db",
                background: "#ffffff",
                color: "#111827",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {showBreakdown ? "Hide full breakdown" : "Show full breakdown"}
            </button>

            {showBreakdown && (() => {
              const sections = parseExplanation(result.explanation);

              return (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                    gap: 12,
                  }}
                >
                  {renderBreakdownCard("Monthly leftover", sections.monthly, "monthly")}
                  {renderBreakdownCard("Loan amount", sections.loan, "loan")}
                  {renderBreakdownCard("Estimated payment", sections.payment, "payment")}
                  {renderBreakdownCard("After payment", sections.afterPayment, "afterPayment")}
                  {renderBreakdownCard("Savings after", sections.savings, "savings")}
                  {renderBreakdownCard("Safety rules", sections.safety, "safety")}

                  <div
                    style={{
                      gridColumn: "1 / -1",
                      background: "#eef6ff",
                      border: "1px solid #d7e8ff",
                      borderRadius: 16,
                      padding: 20,
                      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
                    }}
                  >
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 20,
                        fontWeight: 800,
                        color: "#111827",
                      }}
                    >
                      Summary
                    </h3>

                    <p
                      style={{
                        margin: "12px 0 0 0",
                        fontSize: 17,
                        lineHeight: 1.6,
                        color: "#374151",
                      }}
                    >
                      {sections.summary.replace("Summary:", "").trim()}
                    </p>
                  </div>
                </div>
              );
            })()}
          </section>
        )}
      </div>
    </main>
  );
}
