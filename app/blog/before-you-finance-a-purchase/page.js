import Link from "next/link";

export const metadata = {
  title: "Before You Finance a Purchase",
  description:
    "Questions to ask before financing a purchase, including payment comfort, total cost, savings impact, and risk.",
};

export default function BeforeYouFinanceAPurchasePage() {
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
          Before you finance a purchase, slow the decision down.
        </h1>

        <p
          style={{
            margin: "18px 0 0 0",
            color: "#374151",
            fontSize: 18,
            lineHeight: 1.7,
          }}
        >
          Financing can be useful when it protects cash flow and supports a
          thoughtful purchase. It becomes risky when it makes a purchase feel
          smaller than it really is. Before you sign, look at the payment, total
          cost, savings cushion, and what happens if your month does not go
          perfectly.
        </p>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 26, fontWeight: 800 }}>
            Four questions to ask first
          </h2>
          <ul style={{ margin: "12px 0 0 20px", color: "#374151", fontSize: 17, lineHeight: 1.7 }}>
            <li>Would this payment still feel comfortable after normal bills and savings?</li>
            <li>How much will the purchase cost after interest, fees, and the full loan term?</li>
            <li>Will the item still be useful while you are paying for it?</li>
            <li>Could you handle a repair, emergency, or income disruption at the same time?</li>
          </ul>
        </section>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 26, fontWeight: 800 }}>
            The payment is only one part of the decision
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#374151", fontSize: 17, lineHeight: 1.7 }}>
            A lender or checkout screen may emphasize the monthly payment because
            it feels easier to compare. But a lower payment can come from a
            longer payoff timeline, which may increase total cost and keep you
            committed for longer than the item feels valuable.
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
            Test the financed price first
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#374151", fontSize: 17, lineHeight: 1.6 }}>
            Use the calculator to compare the price, down payment, estimated
            payment, and savings left after the purchase before you commit.
          </p>
          <Link href="/" style={{ display: "inline-block", marginTop: 16, color: "#ffffff", background: "linear-gradient(135deg, #1f8a70 0%, #43b692 100%)", borderRadius: 999, padding: "12px 18px", fontSize: 16, fontWeight: 800, textDecoration: "none" }}>
            Check affordability
          </Link>
        </section>

        <nav style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/blog" style={{ color: "#0f766e", fontWeight: 800 }}>All blog posts</Link>
          <Link href="/guides/should-i-finance-this" style={{ color: "#0f766e", fontWeight: 800 }}>Guide: should I finance this?</Link>
          <Link href="/guides/safe-monthly-payment" style={{ color: "#0f766e", fontWeight: 800 }}>Guide: safe monthly payment</Link>
        </nav>
      </article>
    </main>
  );
}
