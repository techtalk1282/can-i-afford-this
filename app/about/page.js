export const metadata = {
  title: "About",
  description:
    "Learn how Can I Afford This? helps people make calmer, clearer purchase decisions before committing money.",
};

export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "70vh",
        background: "#f5f7fb",
        padding: "48px 20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <section
        style={{
          maxWidth: 920,
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
          About the project
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
          A calmer way to decide if a purchase fits your life.
        </h1>

        <p
          style={{
            margin: "18px 0 0 0",
            color: "#374151",
            fontSize: 18,
            lineHeight: 1.7,
          }}
        >
          Can I Afford This? was created to help people pause before a major
          purchase and look beyond the sticker price. A payment can feel
          manageable in isolation, but the safer question is whether the purchase
          still leaves room for savings, normal bills, emergencies, and peace of
          mind.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginTop: 26,
          }}
        >
          {[
            [
              "Practical estimates",
              "The calculator compares income, expenses, savings, down payment, and purchase price so the result reflects more than one number.",
            ],
            [
              "Safety-first thinking",
              "The goal is to highlight financial breathing room, not to encourage the largest possible purchase.",
            ],
            [
              "Plain-language guidance",
              "Results are designed to be understandable so people can make decisions without finance jargon.",
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
              <h2
                style={{
                  margin: 0,
                  color: "#111827",
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                {title}
              </h2>
              <p
                style={{
                  margin: "10px 0 0 0",
                  color: "#6b7280",
                  fontSize: 16,
                  lineHeight: 1.6,
                }}
              >
                {copy}
              </p>
            </div>
          ))}
        </div>

        <p
          style={{
            margin: "26px 0 0 0",
            color: "#374151",
            fontSize: 17,
            lineHeight: 1.7,
          }}
        >
          This tool is educational and should not replace advice from a qualified
          financial professional. It is best used as a decision checkpoint before
          you finance, buy, or commit to a recurring payment.
        </p>
      </section>
    </main>
  );
}
