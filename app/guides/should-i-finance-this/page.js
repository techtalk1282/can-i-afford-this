import Link from "next/link";

export const metadata = {
  title: "Should I Finance This?",
  description:
    "Learn how to evaluate financing decisions, including payment size, loan length, interest cost, savings impact, and purchase risk.",
};

export default function ShouldIFinanceThisPage() {
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
          Financing decisions
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
          Should I finance this?
        </h1>

        <p
          style={{
            margin: "18px 0 0 0",
            color: "#374151",
            fontSize: 18,
            lineHeight: 1.7,
          }}
        >
          Financing can make a purchase possible without paying the full price
          today, but it also adds a future obligation. A good financing decision
          should preserve cash flow, avoid draining savings, and keep the total
          cost reasonable for the value you receive.
        </p>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 26, fontWeight: 800 }}>
            When financing may be reasonable
          </h2>
          <ul style={{ margin: "12px 0 0 20px", color: "#374151", fontSize: 17, lineHeight: 1.7 }}>
            <li>The payment fits comfortably after existing bills and savings goals.</li>
            <li>You understand the interest rate, loan length, fees, and total repayment amount.</li>
            <li>The item is useful long enough to justify paying for it over time.</li>
            <li>You could handle a temporary setback without missing payments.</li>
          </ul>
        </section>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 26, fontWeight: 800 }}>
            When financing is a warning sign
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
                "Payment hiding price",
                "A low monthly payment can distract from a high total cost, especially when the loan is stretched over many years.",
              ],
              [
                "No room for error",
                "If one unexpected bill would make the payment hard to cover, financing may add too much pressure.",
              ],
              [
                "Emotional urgency",
                "Financing is riskier when the decision is driven by pressure, scarcity, or a desire to buy before thinking it through.",
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
            Compare financing against your budget
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#374151", fontSize: 17, lineHeight: 1.6 }}>
            Before financing, compare the estimated payment against your monthly
            leftover income and savings cushion. The safest payment is one that
            still lets you live normally and handle surprises.
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
            Check a financed purchase
          </Link>
        </section>

        <nav style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/guides" style={{ color: "#0f766e", fontWeight: 800 }}>
            All guides
          </Link>
          <Link href="/guides/can-i-afford-this" style={{ color: "#0f766e", fontWeight: 800 }}>
            Can I afford this?
          </Link>
          <Link href="/guides/safe-monthly-payment" style={{ color: "#0f766e", fontWeight: 800 }}>
            Safe monthly payment
          </Link>
        </nav>

        <p style={{ margin: "24px 0 0 0", color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
          Financial disclaimer: this guide is educational only and is not a
          recommendation to borrow, lend, invest, or purchase.
        </p>
      </article>
    </main>
  );
}
