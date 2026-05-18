import Link from "next/link";

export const metadata = {
  title: "Can I Afford This? Guide",
  description:
    "Learn a practical framework for deciding whether a purchase is affordable, including cash flow, savings, financing, and risk signals.",
};

export default function CanIAffordThisGuidePage() {
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
          Affordability guide
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
          Can I afford this?
        </h1>

        <p
          style={{
            margin: "18px 0 0 0",
            color: "#374151",
            fontSize: 18,
            lineHeight: 1.7,
          }}
        >
          Affordability is not only about whether you can make the payment this
          month. A safer decision asks whether the purchase still leaves you
          with monthly breathing room, emergency savings, and flexibility when
          life does not go exactly as planned.
        </p>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 26, fontWeight: 800 }}>
            A simple four-part test
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
                "Cash flow",
                "After normal monthly expenses, there should be enough left to cover the new payment without making every month feel tight.",
              ],
              [
                "Savings impact",
                "A down payment or cash purchase should not drain the emergency buffer you rely on for surprises.",
              ],
              [
                "Financing cost",
                "Interest and loan length can make a purchase feel smaller today while increasing the total cost over time.",
              ],
              [
                "Stress level",
                "If the purchase requires perfect income, no repairs, and no unexpected bills, it may be too fragile.",
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
            Warning signs a purchase may be too expensive
          </h2>
          <ul style={{ margin: "12px 0 0 20px", color: "#374151", fontSize: 17, lineHeight: 1.7 }}>
            <li>You need to use most of your savings just to make the purchase work.</li>
            <li>The payment leaves little room after rent, food, debt, insurance, and utilities.</li>
            <li>You are counting on future raises, bonuses, or overtime to feel comfortable.</li>
            <li>You would struggle if the item needed repairs, maintenance, or replacement parts.</li>
          </ul>
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
            Use your actual numbers
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#374151", fontSize: 17, lineHeight: 1.6 }}>
            The calculator can help you compare the purchase price, down payment,
            savings left over, and estimated monthly pressure in one place.
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
            Check affordability
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
          Financial disclaimer: this guide is educational only and is not
          financial, legal, tax, lending, or investment advice.
        </p>
      </article>
    </main>
  );
}
