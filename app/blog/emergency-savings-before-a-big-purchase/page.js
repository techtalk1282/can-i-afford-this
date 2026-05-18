import Link from "next/link";

export const metadata = {
  title: "Emergency Savings Before a Big Purchase",
  description:
    "Learn why emergency savings matter before a major purchase and how a savings cushion changes affordability risk.",
};

export default function EmergencySavingsBeforeABigPurchasePage() {
  return (
    <main style={{ minHeight: "70vh", background: "#f5f7fb", padding: "48px 20px", fontFamily: "Arial, sans-serif" }}>
      <article style={{ maxWidth: 900, margin: "0 auto", background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 22, padding: "32px 28px", boxShadow: "0 16px 40px rgba(15, 23, 42, 0.08)" }}>
        <p style={{ margin: 0, color: "#0f766e", fontSize: 14, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Savings cushion
        </p>

        <h1 style={{ margin: "10px 0 0 0", color: "#111827", fontSize: 42, lineHeight: 1.1, fontWeight: 800 }}>
          Emergency savings before a big purchase.
        </h1>

        <p style={{ margin: "18px 0 0 0", color: "#374151", fontSize: 18, lineHeight: 1.7 }}>
          Savings change the meaning of affordability. A purchase that looks
          manageable on paper can become stressful if it leaves no cushion for
          repairs, medical costs, income changes, deductibles, or ordinary life
          surprises.
        </p>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 26, fontWeight: 800 }}>
            Why savings matter after the purchase
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#374151", fontSize: 17, lineHeight: 1.7 }}>
            A down payment can make a purchase easier to approve and lower the
            payment, but it should not leave you exposed. The money left after a
            purchase is what helps you absorb the first unexpected cost without
            turning the purchase into credit card debt or missed bills.
          </p>
        </section>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 26, fontWeight: 800 }}>
            Signs your savings cushion may be too thin
          </h2>
          <ul style={{ margin: "12px 0 0 20px", color: "#374151", fontSize: 17, lineHeight: 1.7 }}>
            <li>You would have little cash left after the down payment or purchase.</li>
            <li>You would need credit to handle a repair, deductible, or emergency.</li>
            <li>You are postponing essential bills or savings goals to make the purchase work.</li>
            <li>You feel comfortable only if no unexpected expense happens soon.</li>
          </ul>
        </section>

        <section style={{ marginTop: 28, background: "linear-gradient(180deg, #effaf5 0%, #f7fffb 100%)", border: "1px solid #cdeee0", borderRadius: 18, padding: 22 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 22, fontWeight: 800 }}>
            Compare savings before and after buying
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#374151", fontSize: 17, lineHeight: 1.6 }}>
            Use the calculator to see how much savings may remain after a down
            payment or purchase. If the remaining cushion feels too thin, a lower
            price or more time to save may be the calmer choice.
          </p>
          <Link href="/" style={{ display: "inline-block", marginTop: 16, color: "#ffffff", background: "linear-gradient(135deg, #1f8a70 0%, #43b692 100%)", borderRadius: 999, padding: "12px 18px", fontSize: 16, fontWeight: 800, textDecoration: "none" }}>
            Check savings impact
          </Link>
        </section>

        <nav style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/blog" style={{ color: "#0f766e", fontWeight: 800 }}>All blog posts</Link>
          <Link href="/guides/can-i-afford-this" style={{ color: "#0f766e", fontWeight: 800 }}>Guide: can I afford this?</Link>
          <Link href="/guides/how-much-car-can-i-afford" style={{ color: "#0f766e", fontWeight: 800 }}>Guide: car affordability</Link>
        </nav>
      </article>
    </main>
  );
}
