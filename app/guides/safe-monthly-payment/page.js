import Link from "next/link";

export const metadata = {
  title: "Safe Monthly Payment Guide",
  description:
    "Learn how to estimate a safer monthly payment by protecting cash flow, emergency savings, and flexibility before taking on a purchase.",
};

export default function SafeMonthlyPaymentPage() {
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
          Monthly payment planning
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
          What is a safe monthly payment?
        </h1>

        <p
          style={{
            margin: "18px 0 0 0",
            color: "#374151",
            fontSize: 18,
            lineHeight: 1.7,
          }}
        >
          A safe monthly payment is not the largest payment you can technically
          make. It is a payment that fits after essential expenses, protects your
          savings cushion, and leaves enough room for normal life to continue
          without constant financial tension.
        </p>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 26, fontWeight: 800 }}>
            Start with leftover income
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#374151", fontSize: 17, lineHeight: 1.7 }}>
            Begin by subtracting regular monthly expenses from monthly income.
            Then consider whether the remaining amount already has jobs: savings,
            debt payoff, groceries that vary, subscriptions, medical costs,
            family support, or other recurring commitments.
          </p>
        </section>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 26, fontWeight: 800 }}>
            Three safety checks before accepting a payment
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
                "Leftover test",
                "After the payment, you should still have meaningful monthly room for savings and irregular expenses.",
              ],
              [
                "Savings test",
                "The purchase should not leave you without an emergency cushion for repairs, deductibles, or income disruption.",
              ],
              [
                "Stress test",
                "Ask whether the payment still works if income dips, another bill rises, or the item costs more to maintain.",
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

        <section style={{ marginTop: 28 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 26, fontWeight: 800 }}>
            Why smaller payments can still be risky
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#374151", fontSize: 17, lineHeight: 1.7 }}>
            A smaller payment may come from a longer loan, a larger down payment,
            or a promotional offer. Each can help in the short term, but the
            decision is safer when the total cost, payoff timeline, and savings
            impact still make sense together.
          </p>
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
            Estimate a safer payment range
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#374151", fontSize: 17, lineHeight: 1.6 }}>
            Use the calculator to see how a purchase changes your leftover
            monthly income and savings position. If the result feels tight, test
            a lower price, a larger down payment, or waiting longer before buying.
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
            Estimate affordability
          </Link>
        </section>

        <nav style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/guides" style={{ color: "#0f766e", fontWeight: 800 }}>
            All guides
          </Link>
          <Link href="/guides/can-i-afford-this" style={{ color: "#0f766e", fontWeight: 800 }}>
            Can I afford this?
          </Link>
          <Link href="/guides/should-i-finance-this" style={{ color: "#0f766e", fontWeight: 800 }}>
            Should I finance this?
          </Link>
        </nav>

        <p style={{ margin: "24px 0 0 0", color: "#6b7280", fontSize: 14, lineHeight: 1.6 }}>
          Financial disclaimer: this guide is for education only and should not
          be treated as personalized financial, legal, tax, or lending advice.
        </p>
      </article>
    </main>
  );
}
