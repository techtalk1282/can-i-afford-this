import Link from "next/link";

export const metadata = {
  title: "Signs a Purchase Is Too Expensive",
  description:
    "Learn warning signs that a purchase may be too expensive, even if the monthly payment appears possible.",
};

export default function SignsAPurchaseIsTooExpensivePage() {
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
        <p style={{ margin: 0, color: "#0f766e", fontSize: 14, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Purchase warning signs
        </p>

        <h1 style={{ margin: "10px 0 0 0", color: "#111827", fontSize: 42, lineHeight: 1.1, fontWeight: 800 }}>
          Signs a purchase is too expensive.
        </h1>

        <p style={{ margin: "18px 0 0 0", color: "#374151", fontSize: 18, lineHeight: 1.7 }}>
          A purchase can be too expensive before it becomes impossible. The
          early warning signs often show up as tight cash flow, reduced savings,
          dependence on future income, or a feeling that one surprise bill would
          make the purchase stressful.
        </p>

        <section style={{ marginTop: 28 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 26, fontWeight: 800 }}>
            Warning signs to take seriously
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 16 }}>
            {[
              ["Savings drop too low", "The purchase uses so much cash that you would have little protection against emergencies or repairs."],
              ["Monthly room disappears", "The payment fits only if every other expense stays perfectly predictable."],
              ["You need future money", "The purchase depends on a raise, bonus, overtime, or income that is not guaranteed yet."],
              ["You are rushing", "Urgency can make a risky purchase feel necessary before the numbers are fully clear."],
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
            A safer alternative is usually a smaller commitment
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#374151", fontSize: 17, lineHeight: 1.7 }}>
            If the purchase feels close to the edge, the answer may not be a
            hard no forever. It may be a lower price, more time to save, a less
            expensive version, or waiting until your monthly budget has more room.
          </p>
        </section>

        <section style={{ marginTop: 28, background: "linear-gradient(180deg, #effaf5 0%, #f7fffb 100%)", border: "1px solid #cdeee0", borderRadius: 18, padding: 22 }}>
          <h2 style={{ margin: 0, color: "#111827", fontSize: 22, fontWeight: 800 }}>
            Check the purchase against your budget
          </h2>
          <p style={{ margin: "10px 0 0 0", color: "#374151", fontSize: 17, lineHeight: 1.6 }}>
            Run the numbers before you buy. A clearer affordability result can
            help you decide whether to proceed, lower the target price, or wait.
          </p>
          <Link href="/" style={{ display: "inline-block", marginTop: 16, color: "#ffffff", background: "linear-gradient(135deg, #1f8a70 0%, #43b692 100%)", borderRadius: 999, padding: "12px 18px", fontSize: 16, fontWeight: 800, textDecoration: "none" }}>
            Open the calculator
          </Link>
        </section>

        <nav style={{ marginTop: 28, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/blog" style={{ color: "#0f766e", fontWeight: 800 }}>All blog posts</Link>
          <Link href="/guides/can-i-afford-this" style={{ color: "#0f766e", fontWeight: 800 }}>Guide: can I afford this?</Link>
          <Link href="/blog/emergency-savings-before-a-big-purchase" style={{ color: "#0f766e", fontWeight: 800 }}>Emergency savings article</Link>
        </nav>
      </article>
    </main>
  );
}
