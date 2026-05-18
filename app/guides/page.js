import Link from "next/link";

export const metadata = {
  title: "Affordability Guides",
  description:
    "Educational guides that help you decide what you can safely afford, how to compare payments, and when financing creates risk.",
};

const guides = [
  {
    href: "/guides/can-i-afford-this",
    title: "Can I afford this?",
    description:
      "A practical decision framework for evaluating purchases before you spend or finance.",
  },
  {
    href: "/guides/how-much-car-can-i-afford",
    title: "How much car can I afford?",
    description:
      "Understand car affordability beyond the monthly payment, including savings, insurance, and maintenance.",
  },
  {
    href: "/guides/should-i-finance-this",
    title: "Should I finance this?",
    description:
      "Learn when financing may be reasonable and when it can turn a purchase into long-term pressure.",
  },
  {
    href: "/guides/safe-monthly-payment",
    title: "Safe monthly payment",
    description:
      "Build a safer monthly payment range that leaves room for bills, savings, and emergencies.",
  },
];

export default function GuidesPage() {
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
          maxWidth: 980,
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
          Affordability education
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
          Guides for calmer money decisions.
        </h1>

        <p
          style={{
            margin: "18px 0 0 0",
            color: "#374151",
            fontSize: 18,
            lineHeight: 1.7,
          }}
        >
          These guides explain the thinking behind safer purchase decisions. Use
          them with the calculator to compare income, expenses, savings, down
          payments, financing pressure, and the breathing room a purchase leaves
          behind.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginTop: 28,
          }}
        >
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              style={{
                display: "block",
                background: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: 16,
                padding: 18,
                textDecoration: "none",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#111827",
                  fontSize: 21,
                  fontWeight: 800,
                }}
              >
                {guide.title}
              </h2>
              <p
                style={{
                  margin: "10px 0 0 0",
                  color: "#6b7280",
                  fontSize: 16,
                  lineHeight: 1.6,
                }}
              >
                {guide.description}
              </p>
              <p
                style={{
                  margin: "14px 0 0 0",
                  color: "#0f766e",
                  fontSize: 15,
                  fontWeight: 800,
                }}
              >
                Read guide →
              </p>
            </Link>
          ))}
        </div>

        <div
          style={{
            marginTop: 28,
            background: "linear-gradient(180deg, #effaf5 0%, #f7fffb 100%)",
            border: "1px solid #cdeee0",
            borderRadius: 18,
            padding: 22,
          }}
        >
          <h2
            style={{
              margin: 0,
              color: "#111827",
              fontSize: 22,
              fontWeight: 800,
            }}
          >
            Start with your own numbers
          </h2>
          <p
            style={{
              margin: "10px 0 0 0",
              color: "#374151",
              fontSize: 17,
              lineHeight: 1.6,
            }}
          >
            Reading helps, but the clearest answer comes from comparing a
            purchase against your actual income, expenses, savings, and down
            payment.
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
        </div>
      </section>
    </main>
  );
}
