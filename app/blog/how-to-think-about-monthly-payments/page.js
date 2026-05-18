import Link from "next/link";

export const metadata = {
  title: "How to Think About Monthly Payments",
  description:
    "Learn how to evaluate monthly payments by looking at cash flow, total cost, loan length, and budget flexibility.",
};

export default function HowToThinkAboutMonthlyPaymentsPage() {
  return (
    <main style={{ minHeight: "70vh", background: "#f5f7fb", padding: "48px 20px", fontFamily: "Arial, sans-serif" }}>
      <article style={{ maxWidth: 900, margin: "0 auto", background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 22, padding: "32px 28px", boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)" }}>
        <p style={{ margin: 0, color: "#0f766e", fontSize: 14, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Monthly payments
        </p>

        <h1 style={{ margin: "10px 0 0 0", color: "#111827", fontSize: 42, lineHeight: 1.1, fontWeight: 800 }}>
          How to think about monthly payments.
        </h1>

        <p style={{ margin: "18px 0 0 0", color: "#374151", fontSize: 18, lineHeight: 1.7 }}>
          Monthly payments make purchases easier to compare, but they can also
          hide important details. A payment is safer when it fits your current
          budget, leaves room for savings, and does not require stretching the
          timeline so far that the total cost becomes uncomfortable.
        </p>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 26, fontWeight: 800 }}>
            The payment has three parts
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 16 }}>
            {[
              ["Payment size", "The amount due each month affects how much room remains for bills, savings, and everyday choices."],
              ["Payment length", "A longer timeline can lower the monthly amount but keep the obligation around for more months or years."],
              ["Total cost", "Interest and fees can make the final amount paid much higher than the original purchase price."],
            ].map(([title, copy]) => (
              <div key={title} style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 16, padding: 18 }}>
                <h3 style={{ margin: 0, color: "#111827", fontSize: 20, fontWeight: 800 }}>{title}</h3>
                <p style={{ margin: "10px 0 0 0", color: "#6b7280", fontSize: 16, lineHeight: 1.6 }}>{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 26, fontWeight: 800 }}>
            Ask what the payment would crowd out
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#374151", fontSize: 17, lineHeight: 1.7 }}>
            Every payment competes with something else: emergency savings, debt
            payoff, groceries, travel, medical needs, family support, or future
            goals. If the payment forces you to stop saving or rely on credit for
            normal expenses, it may be too high.
          </p>
        </section>

        <section style={{ marginTop: 28, background: "linear-gradient(180deg, #effaf5 0%, #f7fffb 100%)", border: "1px solid #cdeee0", borderRadius: 18, padding: 22 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 22, fontWeight: 800 }}>
            Find a safer payment range
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#374151", fontSize: 17, lineHeight: 1.6 }}>
            The safest payment is usually not the largest one you can qualify
            for. Use the calculator to test whether a payment leaves enough room
            after existing expenses and savings needs.
          </p>
          <Link href="/" style={{ display: "inline-block", marginTop: 16, color: "#ffffff", background: "linear-gradient(135deg, #1f8a70 0%, #43b692 100%)", borderRadius: 999, padding: "12px 18px", fontSize: 16, fontWeight: 800, textDecoration: "none" }}>
            Estimate affordability
          </Link>
        </section>

        <nav style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/blog" style={{ color: "#0f766e", fontWeight: 800 }}>All blog posts</Link>
          <Link href="/guides/safe-monthly-payment" style={{ color: "#0f766e", fontWeight: 800 }}>Guide: safe monthly payment</Link>
          <Link href="/guides/should-i-finance-this" style={{ color: "#0f766e", fontWeight: 800 }}>Guide: should I finance this?</Link>
        </nav>
      </article>
    </main>
  );
}
