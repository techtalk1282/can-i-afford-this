// FILE: app/page.js
// VERSION: v7 - Restore natural page flow and preserve landing hero + results scrolling
// PURPOSE: Fix cutoff and broken upward scrolling by removing viewport-locked centered layout while keeping the approved landing design

"use client";

import { useEffect, useState } from "react";

const FREE_SESSION_STORAGE_KEY = "ciat_free_session_used";
const PREMIUM_UNLOCKED_STORAGE_KEY = "ciat_premium_unlocked";

export default function Home() {
  const [income, setIncome] = useState("");
const [expenses, setExpenses] = useState("");
const [savings, setSavings] = useState("");
const [downPayment, setDownPayment] = useState("");
const [price, setPrice] = useState("");

const [errors, setErrors] = useState({
  income: "",
  expenses: "",
  savings: "",
  downPayment: "",
  price: "",
});

const [result, setResult] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);
 const [apiError, setApiError] = useState("");
 const [decimalBlockedField, setDecimalBlockedField] = useState("");
  const [showContinueNotice, setShowContinueNotice] = useState(false);
  const [hasUsedFreeSession, setHasUsedFreeSession] = useState(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [premiumStatusMessage, setPremiumStatusMessage] = useState("");
  const [viewportWidth, setViewportWidth] = useState(1200);

   useEffect(() => {
    if (typeof window === "undefined") return;

    const savedFreeSessionState = window.localStorage.getItem(FREE_SESSION_STORAGE_KEY);
    const savedPremiumUnlockState = window.localStorage.getItem(PREMIUM_UNLOCKED_STORAGE_KEY);
    const searchParams = new URLSearchParams(window.location.search);
    const checkoutState = searchParams.get("checkout");
    const sessionId = searchParams.get("session_id");

    if (savedFreeSessionState === "1") {
      setHasUsedFreeSession(true);
    }

    if (savedPremiumUnlockState === "1") {
      setIsPremiumUnlocked(true);
    }

    if (checkoutState === "cancel") {
      setPremiumStatusMessage("Checkout was canceled. You can try again whenever you're ready.");
    }

    if (checkoutState === "success" && sessionId) {
      setPremiumStatusMessage("Verifying your premium unlock...");
    }

    const updateViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    updateViewportWidth();
    window.addEventListener("resize", updateViewportWidth);

    return () => {
      window.removeEventListener("resize", updateViewportWidth);
    };
  }, []);

  const isPhone = viewportWidth <= 767;
  const isSmallPhone = viewportWidth <= 480;

 function validateField(name, value) {
  const isNumber = /^[0-9]*\.?[0-9]+$/.test(value);
  const num = Number(value);

  let valid = false;
  let message = "";

  const zeroSpam =
    /^0{2,}$/.test(value) ||
    (/^0+$/.test(value) && value.length > 1);

  if (zeroSpam) {
    valid = false;
    message = "Enter a normal number";
  } else if (!isNumber) {
    valid = false;
    message = "Enter a valid number";
  } else {
    // BASE RULES
    if (name === "income" || name === "price") {
      if (num <= 0) {
        valid = false;
        message = "Must be greater than 0";
      } else {
        valid = true;
      }
    } else {
      if (num < 0) {
        valid = false;
        message = "Cannot be negative";
      } else {
        valid = true;
      }
    }

    // HARD LIMITS
    if (valid) {
      if (name === "income" && num > 1000000) {
        valid = false;
        message = "Max allowed: $1,000,000";
      }

      if (name === "expenses" && num > 1000000) {
        valid = false;
        message = "Max allowed: $1,000,000";
      }

      if (name === "savings" && num > 5000000) {
        valid = false;
        message = "Max allowed: $5,000,000";
      }

      if (name === "price" && num > 10000000) {
        valid = false;
        message = "Max allowed: $10,000,000";
      }

     if (name === "downPayment") {
        if (price !== "" && num > Number(price)) {
          valid = false;
          message = "Cannot exceed item price";
        } else if (num > Number(savings)) {
          valid = false;
          message = "Cannot exceed savings";
        }
      }
    }
  }

  setErrors((prev) => ({
    ...prev,
    [name]: valid ? "" : message,
  }));

  return valid;
}
 function validateAll() {
    const checks = [
      validateField("income", income),
      validateField("expenses", expenses),
      validateField("savings", savings),
      validateField("price", price),
    ];

    if (downPayment !== "") {
      checks.push(validateField("downPayment", downPayment));
    }

    return checks.every(Boolean);
  }
async function handleCheck() {
    if (!validateAll()) return;

    setApiError("");

    if (hasUsedFreeSession) {
      setShowContinueNotice(true);

      if (result) {
        setShowBreakdown(true);
      }

      scrollToSmartSpendingPanel();
      return;
    }

    const res = await fetch("/api/affordability", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
  income: Number(income),
  expenses: Number(expenses),
  savings: Number(savings),
  downPayment: Number(downPayment || 0),
  price: Number(price),
  paymentType: "finance",
}),
    });

    const data = await res.json();

    if (!res.ok || data.success === false) {
      setApiError(data.error || "Unable to check affordability right now.");
      setResult(null);
      setShowBreakdown(false);
      setShowContinueNotice(false);
      return;
    }

    setResult(data.result);
    setHasUsedFreeSession(true);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(FREE_SESSION_STORAGE_KEY, "1");
    }

    setShowBreakdown(false);
    setShowContinueNotice(false);

    setTimeout(() => {
      const resultSection = document.getElementById("result-section");
      if (resultSection) {
        resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  }

  function formatLine(line) {
    return line.replace(/STEP \d+ — /g, "").replace("Result:", "Summary:");
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

  function scrollToSmartSpendingPanel() {
    setTimeout(() => {
      const smartSpendingPanel = document.getElementById("smart-spending-panel");
      if (smartSpendingPanel) {
        smartSpendingPanel.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 180);
  }

  function renderSmartSpendingPanel() {
    return (
      <div
        id="smart-spending-panel"
        style={{
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 20,
          padding: 24,
          boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: isPhone ? 22 : 30,
            fontWeight: 800,
            color: "#111827",
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          Access Your Smart Spending Insights
        </h2>

        <div
          style={{
            width: 18,
            height: 3,
            borderRadius: 999,
            background: "#facc15",
            margin: "10px auto 0 auto",
          }}
        />

        {showContinueNotice && (
          <div
            style={{
              marginTop: 16,
              background: "linear-gradient(180deg, #effaf5 0%, #f7fffb 100%)",
              border: "1px solid #cdeee0",
              borderRadius: 14,
              padding: "12px 16px",
              textAlign: "center",
              fontSize: 15,
              fontWeight: 700,
              lineHeight: 1.5,
              color: "#0f766e",
            }}
          >
            You’ve used your free affordability session. Choose an option below to continue.
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 14,
            marginTop: 22,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: 18,
              padding: 24,
              textAlign: "center",
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.04)",
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
              Continue Free
            </h3>

            <p
              style={{
                margin: "12px 0 0 0",
                fontSize: 17,
                lineHeight: 1.5,
                color: "#6b7280",
              }}
            >
              Watch one short ad to unlock 1 extra free check.
            </p>

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                width: "100%",
                marginTop: 18,
                height: 54,
                border: "none",
                borderRadius: 14,
                background: "linear-gradient(135deg, #facc15 0%, #fbbf24 100%)",
                color: "#111827",
                fontSize: 18,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 10px 25px rgba(251, 191, 36, 0.28)",
              }}
            >
              Watch Ad to Continue
            </button>
          </div>

          <div
            style={{
              background: "linear-gradient(180deg, #f3fbf8 0%, #eef8f4 100%)",
              border: "1px solid #d8eee7",
              borderRadius: 18,
              padding: 24,
              textAlign: "center",
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.04)",
            }}
          >
             <h3
              style={{
                margin: 0,
                fontSize: isPhone ? 14 : 16,
                fontWeight: 800,
                color: "#0f766e",
                whiteSpace: isPhone ? "normal" : "nowrap",
                lineHeight: 1.3,
              }}
            >
              Unlock Smart Spending Insights
            </h3>

            <p
              style={{
                margin: "12px 0 0 0",
                fontSize: 18,
                color: "#374151",
                fontWeight: 700,
              }}
            >
              $7 One-Time
            </p>

            <button
              style={{
                width: "100%",
                marginTop: 18,
                height: 58,
                border: "none",
                borderRadius: 14,
                background: "linear-gradient(135deg, #1f8a70 0%, #43b692 100%)",
                color: "#ffffff",
                fontSize: 18,
                fontWeight: 800,
                cursor: "pointer",
                boxShadow: "0 12px 28px rgba(31, 138, 112, 0.28)",
              }}
            >
              Unlock Now
            </button>

            <p
              style={{
                margin: "12px 0 0 0",
                fontSize: 15,
                lineHeight: 1.5,
                color: "#6b7280",
              }}
            >
              No subscription. One payment.
              <br />
              Better decisions every time.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "24px 20px 48px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1180,
          margin: "0 auto",
        }}
      >
        <header style={{ textAlign: "center", marginBottom: 20 }}>
          <h1
            style={{
              margin: 0,
              fontSize: isPhone ? 34 : 48,
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
    fontSize: isPhone ? 15 : 16,
    lineHeight: 1.4,
    color: "#6b7280",
    whiteSpace: isPhone ? "normal" : "nowrap",
    overflow: isPhone ? "visible" : "hidden",
    textOverflow: isPhone ? "clip" : "ellipsis",
    padding: isPhone ? "0 10px" : 0,
  }}
>
  Know what you should spend before you spend it • Make smarter purchase decisions in seconds
</p>

          
        </header>

         <section
          style={{
            display: "grid",
            gridTemplateColumns: isPhone ? "1fr" : "repeat(2, minmax(0, 1fr))",
            gap: isPhone ? 20 : 16,
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
              How It Works (Example Scenario)
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
               YES — In this example scenario, this is affordable
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
                gridTemplateColumns: isPhone ? "1fr" : "repeat(3, minmax(0, 1fr))",
                gap: 14,
              }}
            >
              {[
                ["Available Monthly Income", "$2,000"],
                ["Est. Payment", "$396"],
                ["Savings After Purchase", "$10,000"],
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
  label: "Down Payment (from savings)",
  value: downPayment,
  setValue: setDownPayment,
  placeholder: isSmallPhone
    ? "Enter down payment"
    : "Enter amount to use toward purchase",
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
                    inputMode="numeric"
                    value={
  /^[1-9]\d*$/.test(field.value) || /^0$/.test(field.value)
    ? `$${field.value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
    : field.value
}
                   onKeyDown={(e) => {
  const currentFieldName =
    field.label === "Monthly Income"
      ? "income"
      : field.label === "Monthly Expenses"
      ? "expenses"
      : field.label === "Savings"
      ? "savings"
      : field.label === "Down Payment (from savings)"
      ? "downPayment"
      : "price";

  if ([".", ",", "e", "E", "+", "-"].includes(e.key)) {
    e.preventDefault();
    setDecimalBlockedField(currentFieldName);
    return;
  }

  if (
    e.key === "Backspace" ||
    e.key === "Delete" ||
    e.key === "Tab" ||
    e.key.startsWith("Arrow")
  ) {
    setDecimalBlockedField("");
  }
}}
                   onBlur={() => {
  setDecimalBlockedField("");
}}
                   onChange={(e) => {
  const rawVal = e.target.value.replace(/[$,]/g, "");
  const val = rawVal.includes(".") ? rawVal.split(".")[0] : rawVal;

  const fieldName =
    field.label === "Monthly Income"
      ? "income"
      : field.label === "Monthly Expenses"
      ? "expenses"
      : field.label === "Savings"
      ? "savings"
      : field.label === "Down Payment (from savings)"
      ? "downPayment"
      : "price";

  if (decimalBlockedField === fieldName) return;

  const maxWholeDigits =
    fieldName === "price" ? 8 : 7;

  const parts = val.split(".");
  const wholePart = parts[0] || "";
  const decimalPart = parts[1];

  const limitedWholePart =
    wholePart.length > maxWholeDigits
      ? wholePart.slice(0, maxWholeDigits)
      : wholePart;

  const normalizedWholePart =
    limitedWholePart === ""
      ? ""
      : limitedWholePart.replace(/^0+(?=\d)/, "");

  const nextValue =
    decimalPart !== undefined
      ? wholePart === ""
        ? val
        : `${normalizedWholePart}.${decimalPart}`
      : normalizedWholePart;

  field.setValue(nextValue);
  validateField(fieldName, nextValue);

  if (fieldName === "savings" || fieldName === "price") {
    if (downPayment === "") {
      setErrors((prev) => ({
        ...prev,
        downPayment: "",
      }));
      return;
    }

    const nextSavings =
      fieldName === "savings" ? nextValue : savings;

    const nextPrice =
      fieldName === "price" ? nextValue : price;

    const downPaymentIsNumber = /^[0-9]*\.?[0-9]+$/.test(downPayment);
    const downPaymentZeroSpam =
      /^0{2,}$/.test(downPayment) ||
      (/^0+$/.test(downPayment) && downPayment.length > 1);

    const downPaymentNum = Number(downPayment);

    let downPaymentMessage = "";

    if (downPaymentZeroSpam) {
      downPaymentMessage = "Enter a normal number";
    } else if (!downPaymentIsNumber) {
      downPaymentMessage = "Enter a valid number";
    } else if (nextPrice !== "" && downPaymentNum > Number(nextPrice)) {
      downPaymentMessage = "Cannot exceed item price";
    } else if (downPaymentNum > Number(nextSavings)) {
      downPaymentMessage = "Cannot exceed savings";
    }

    setErrors((prev) => ({
      ...prev,
      downPayment: downPaymentMessage,
    }));
  }
}}
                    placeholder={field.placeholder}
                    style={{
                      width: "100%",
                      height: 46,
                      borderRadius: 12,
                      border:
  errors[
    field.label === "Monthly Income"
      ? "income"
      : field.label === "Monthly Expenses"
      ? "expenses"
      : field.label === "Savings"
      ? "savings"
      : field.label === "Down Payment (from savings)"
      ? "downPayment"
      : "price"
  ]
    ? "1px solid #ef4444"
    : "1px solid #d1d5db",
                      padding: "0 16px",
                      fontSize: 17,
                      color: "#111827",
                      background: "#ffffff",
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
     {errors[
  field.label === "Monthly Income"
    ? "income"
    : field.label === "Monthly Expenses"
    ? "expenses"
    : field.label === "Savings"
    ? "savings"
    : field.label === "Down Payment (from savings)"
    ? "downPayment"
    : "price"
] && (               
  <p style={{ color: "#ef4444", fontSize: 14, marginTop: 6 }}>
    {
      errors[
  field.label === "Monthly Income"
    ? "income"
    : field.label === "Monthly Expenses"
    ? "expenses"
    : field.label === "Savings"
    ? "savings"
    : field.label === "Down Payment (from savings)"
    ? "downPayment"
    : "price"
]
    }
  </p>
)}
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

 {apiError && (
              <p
                style={{
                  margin: "12px 0 0 0",
                  textAlign: "center",
                  fontSize: 15,
                  color: "#ef4444",
                  fontWeight: 600,
                }}
              >
                {apiError}
              </p>
            )}

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

        {!result && hasUsedFreeSession && showContinueNotice && (
          <section style={{ marginTop: 40 }}>
            {renderSmartSpendingPanel()}
          </section>
        )}

        {result && (
          <section id="result-section" style={{ marginTop: 40 }}>
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: 20,
                padding: isPhone ? 20 : 28,
                boxShadow: "0 18px 45px rgba(15, 23, 42, 0.08)",
                marginBottom: 18,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: isPhone ? 22 : 28,
                  fontWeight: 800,
                  color: "#111827",
                  lineHeight: 1.15,
                }}
              >
               Your Affordability Check
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: isSmallPhone
                    ? "1fr"
                    : isPhone
                    ? "repeat(2, minmax(0, 1fr))"
                    : "repeat(4, minmax(0, 1fr))",
                  gap: 16,
                  marginTop: 20,
                }}
              >
                {[
  ["Can Afford", result.canAfford ? "Yes" : "No"],
  [
    "Available Monthly Income",
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(result.monthlyAvailable)),
  ],
  [
    "Estimated Monthly Payment",
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(result.monthlyPayment)),
  ],
  [
    "Savings After Purchase",
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Number(result.remainingSavings)),
  ],
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
                        fontSize: isPhone ? 18 : 24,
                        fontWeight: 800,
                        color: "#111827",
                        lineHeight: 1.2,
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <p
                style={{
                  margin: "12px 0 0 0",
                  fontSize: 18,
                  lineHeight: 1.5,
                  color: "#374151",
                }}
              >
                {result.canAfford
  ? "You can afford this purchase comfortably based on your current finances."
  : result.monthlyAvailable < 0
  ? "Your expenses exceed your income. This purchase is not affordable right now."
  : "This purchase may stretch your finances. Consider adjusting your budget."}
              </p>
            </div>



            <div
              style={{
                display: "flex",
                gap: 12,
                marginBottom: 18,
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={() => setShowBreakdown(!showBreakdown)}
                style={{
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

              <button
                onClick={() => {
                  if (!showBreakdown) {
                    setShowBreakdown(true);
                    setTimeout(() => {
                      const el = document.getElementById("summary-section");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth", block: "start" });
                      }
                    }, 150);
                  } else {
                    const el = document.getElementById("summary-section");
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                  }
                }}
                style={{
                  height: 48,
                  padding: "0 18px",
                  borderRadius: 12,
                  border: "none",
                  background: "linear-gradient(135deg, #facc15 0%, #fbbf24 100%)",
                  color: "#111827",
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  boxShadow: "0 8px 20px rgba(251, 191, 36, 0.25)",
                }}
              >
                See Smart Spending Insights
              </button>
            </div>

            {showBreakdown && (() => {
              const sections = parseExplanation(result.explanation);

              return (
                <>
             <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                      gap: 12,
                      marginBottom: 18,
                    }}
                  >
                    {renderBreakdownCard("Available Monthly Income", sections.monthly, "monthly")}
                    {renderBreakdownCard("Amount Financed", sections.loan, "loan")}
                    {renderBreakdownCard("Estimated Monthly Payment", sections.payment, "payment")}
                    {renderBreakdownCard("Monthly Remaining After Payment", sections.afterPayment, "afterPayment")}
                 <div
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
                        Savings After Purchase
                      </h3>

                      {sections.savings.map((line, index) => (
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

                      <p
                        style={{
                          margin: "12px 0 0 0",
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "#6b7280",
                        }}
                      >
                        {Number(result.remainingSavings) >= 3000
                          ? "You still keep a healthy savings cushion after this purchase."
                          : Number(result.remainingSavings) > 0
                          ? "You keep some savings, but you fall below the recommended cushion."
                          : "This purchase leaves you with no savings cushion after buying."}
                      </p>

                      <p
                        style={{
                          margin: "8px 0 0 0",
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "#6b7280",
                        }}
                      >
                        {Number(result.remainingSavings) >= 3000
                          ? "That gives you more room for emergencies, repairs, and unexpected bills after the purchase."
                          : Number(result.remainingSavings) > 0
                          ? "A thin cushion leaves less room for emergencies, repairs, or timing changes after you buy."
                          : "Savings are important because they protect your financial health when unexpected costs show up after the purchase."}
                      </p>

                      <p
                        style={{
                          margin: "8px 0 0 0",
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "#6b7280",
                        }}
                      >
                        {result.canAfford
                          ? "The unlock section below can help you compare smarter price points while keeping more money in reserve."
                          : "The unlock section below can help you find a safer target price and protect more of your savings."}
                      </p>
                    </div>

                    <div
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
                        Financial Safety Checks
                      </h3>

                      {sections.safety.map((line, index) => (
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

                      <p
                        style={{
                          margin: "12px 0 0 0",
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "#6b7280",
                        }}
                      >
                        {Math.round(Number(result.monthlyAvailable) - Number(result.monthlyPayment)) >= 500
                          ? "Your monthly leftover stays above the recommended minimum."
                          : "Your monthly leftover falls below the recommended minimum."}
                      </p>

                      <p
                        style={{
                          margin: "8px 0 0 0",
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "#6b7280",
                        }}
                      >
                        {Number(result.remainingSavings) >= 3000
                          ? "Your savings level also stays above the recommended minimum."
                          : "Your savings level falls below the recommended minimum."}
                      </p>

                      <p
                        style={{
                          margin: "8px 0 0 0",
                          fontSize: 15,
                          lineHeight: 1.6,
                          color: "#6b7280",
                        }}
                      >
                        {(Math.round(Number(result.monthlyAvailable) - Number(result.monthlyPayment)) >= 500) &&
                        (Number(result.remainingSavings) >= 3000)
                          ? "Passing both checks usually means the purchase fits more safely inside your budget."
                          : "The safest purchases pass both checks, not just one, so weak spots matter here."}
                      </p>
                    </div>

                    <div
                      style={{
                        background: "linear-gradient(180deg, #effaf5 0%, #f7fffb 100%)",
                        border: "1px solid #cdeee0",
                        borderRadius: 16,
                        padding: 20,
                        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
                      }}
                    >
                      <h3
                        id="summary-section"
                        style={{
                          margin: 0,
                          fontSize: 20,
                          fontWeight: 800,
                          color: "#111827",
                        }}
                      >
                        What This Means For You
                      </h3>

                      <p
                        style={{
                          margin: "12px 0 0 0",
                          fontSize: 16,
                          lineHeight: 1.6,
                          color: "#374151",
                        }}
                      >
                        {result.canAfford ? (
                          <>
                            <strong>This purchase fits your budget right now.</strong>
                            <br /><br />
                            That is the first answer.
                            <br />
                            The smarter answer is whether this is the best use of your money.
                          </>
                        ) : (
                          <>
                            <strong>This purchase is not in a safe range right now.</strong>
                            <br /><br />
                            That does not mean you are stuck.
                            <br />
                            It means the numbers need a smarter target.
                          </>
                        )}
                      </p>
                    </div>

                    <div
                      style={{
                        background: "linear-gradient(180deg, #effaf5 0%, #f7fffb 100%)",
                        border: "1px solid #cdeee0",
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
                        Your Next Smart Move
                      </h3>

                      <p
                        style={{
                          margin: "12px 0 0 0",
                          fontSize: 16,
                          lineHeight: 1.6,
                          color: "#374151",
                        }}
                      >
                        {result.canAfford ? (
                          <>
                            • Could you spend less and still be happy?<br />
                            • Could you keep more savings after buying this?<br />
                            • Could you choose a smarter price point?
                          </>
                        ) : (
                          <>
                            • What price would be safer for you?<br />
                            • How much should you lower your budget?<br />
                            • What change would make this affordable?
                          </>
                        )}
                      </p>
                    </div>
                </div>

                  {renderSmartSpendingPanel()}
                </>
              );
            })()}
          </section>
        )}
      </div>
    </main>
  );
}
