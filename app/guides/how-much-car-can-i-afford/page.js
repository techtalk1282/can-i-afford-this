import Link from "next/link";

export const metadata = {
  title: "How Much Car Can I Afford?",
  description:
    "Learn how to think about car affordability using monthly payment, insurance, maintenance, savings, and total ownership cost.",
};

export default function HowMuchCarCanIAffordPage() {
  return (
    <main
      style={{
        minHeight: "70vh",
        background: "#f5f7fb",
        padding: "48px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <article
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: 22,
          padding: "32px 28px",
          boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#0f766e",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          Car affordability
        </p>

        <h1
          style={{
            margin: "10px 0 0 0",
            color: "#111827",
            fontSize: 42,
            lineHeight: 1.1,
            fontWeight: 800,
          }}
        >
          How much car can I afford?
        </h1>

        <p
          style={{
            margin: "18px 0 0 0",
            color: "#374151",
            fontSize: 18,
            lineHeight: 1.7,
          }}
        >
          A car can look affordable when the monthly payment is the only number
          in focus. The better question is whether the car fits alongside
          insurance, fuel, maintenance, registration, repairs, savings, and your
          other monthly obligations.
        </p>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 26, fontWeight: 800 }}>
            Look beyond the loan payment
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#374151", fontSize: 17, lineHeight: 1.7 }}>
            A safer car budget starts with the full cost of ownership. If a car
            payment fits only before insurance or maintenance is included, the
            true monthly cost may be higher than your budget can comfortably
            absorb.
          </p>
          <ul style={{ margin: "12px 0 0 20px", color: "#374151", fontSize: 17, lineHeight: 1.7 }}>
            <li>Estimate the car payment after any down payment.</li>
            <li>Add insurance, fuel, expected maintenance, and registration costs.</li>
            <li>Keep enough savings for deductibles, repairs, and emergencies.</li>
            <li>Compare the total monthly car cost against your leftover income.</li>
          </ul>
        </section>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 26, fontWeight: 800 }}>
            A safer car purchase leaves flexibility
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 16,
              marginTop: 16,
            }}
          >
            {[
              [
                "Comfortable",
                "The payment fits easily after normal expenses and you still save money each month.",
              ],
              [
                "Caution",
                "The payment works, but repairs, insurance increases, or income changes would create stress.",
              ],
              [
                "Dangerous",
                "The car requires draining savings or leaves very little monthly room after required bills.",
              ],
            ].map(([title, copy]) => (
              <div
                key={title}
                style={{
                  background: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: 16,
                  padding: 18,
                }}
              >
                <h3 style={{ margin: 0, color: "#111827", fontSize: 20, fontWeight: 800 }}>
                  {title}
                </h3>
                <p style={{ margin: "10px 0 0 0", color: "#6b7280", fontSize: 16, lineHeight: 1.6 }}>
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          style={{
            marginTop: 28,
            background: "linear-gradient(180deg, #effaf5 0%, #f7fffb 100%)",
            border: "1px solid #cdeee0",
            borderRadius: 18,
            padding: 22,
          }}
        >
          <h2 style={{ margin: 0, color: "#111827", fontSize: 22, fontWeight: 800 }}>
            Test a car price before you shop
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#374151", fontSize: 17, lineHeight: 1.6 }}>
            Run a potential car price through the calculator before visiting a
            dealership or applying for financing. It can help separate a payment
            that is technically possible from one that is financially calm.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-block",
              marginTop: 16,
              color: "#ffffff",
              background: "linear-gradient(135deg, #1f8a70 0%, #43b692 100%)",
              borderRadius: 999,
              padding: "12px 18px",
              fontSize: 16,
              fontWeight: 800,
              textDecoration: "none",
            }}
          >
            Open the calculator
          </Link>
        </section>

        <nav style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/guides" style={{ color: "#0f766e", fontWeight: 800 }}>
            All guides
          </Link>
          <Link href="/guides/should-i-finance-this" style={{ color: "#0f766e", fontWeight: 800 }}>
            Should I finance this?
          </Link>
          <Link href="/guides/safe-monthly-payment" style={{ color: "#0f766e", fontWeight: 800 }}>
            Safe monthly payment
          </Link>
        </nav>

        <p style={{ margin: "24px 0 0 0", color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
          Financial disclaimer: this guide is educational only and does not
          replace personalized financial, lending, insurance, or tax advice.
        </p>
      </article>
    </main>
  );
}
