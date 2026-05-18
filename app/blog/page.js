import Link from "next/link";

export const metadata = {
  title: "Affordability Blog",
  description:
    "Practical articles about financing decisions, monthly payments, emergency savings, and safer purchase planning.",
};

const posts = [
  {
    href: "/blog/before-you-finance-a-purchase",
    title: "Before you finance a purchase",
    description:
      "Questions to ask before turning a purchase into a monthly obligation.",
  },
  {
    href: "/blog/signs-a-purchase-is-too-expensive",
    title: "Signs a purchase is too expensive",
    description:
      "Common warning signs that a purchase may create more pressure than it is worth.",
  },
  {
    href: "/blog/how-to-think-about-monthly-payments",
    title: "How to think about monthly payments",
    description:
      "A calmer way to compare payment size, loan length, total cost, and budget flexibility.",
  },
  {
    href: "/blog/emergency-savings-before-a-big-purchase",
    title: "Emergency savings before a big purchase",
    description:
      "Why your savings cushion matters before you buy, finance, or commit to a large expense.",
  },
];

export default function BlogPage() {
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
          Affordability blog
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
          Practical reading for better purchase decisions.
        </h1>

        <p
          style={{
            margin: "18px 0 0 0",
            color: "#374151",
            fontSize: 18,
            lineHeight: 1.7,
          }}
        >
          The blog expands on the day-to-day money questions behind the
          calculator: when financing is worth considering, when a purchase is too
          expensive, how monthly payments can mislead you, and why emergency
          savings should stay part of the decision.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
            marginTop: 28,
          }}
        >
          {posts.map((post) => (
            <Link
              key={post.href}
              href={post.href}
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
                  lineHeight: 1.25,
                }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  margin: "10px 0 0 0",
                  color: "#6b7280",
                  fontSize: 16,
                  lineHeight: 1.6,
                }}
              >
                {post.description}
              </p>
              <p
                style={{
                  margin: "14px 0 0 0",
                  color: "#0f766e",
                  fontSize: 15,
                  fontWeight: 800,
                }}
              >
                Read article →
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
            Want a number-based answer?
          </h2>
          <p
            style={{
              margin: "10px 0 0 0",
              color: "#374151",
              fontSize: 17,
              lineHeight: 1.6,
            }}
          >
            Articles can help you think clearly, but the calculator can test a
            purchase against your actual income, expenses, savings, down payment,
            and estimated payment.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
            <Link
              href="/"
              style={{
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
            <Link
              href="/guides"
              style={{
                color: "#0f766e",
                background: "#ffffff",
                border: "1px solid #cdeee0",
                borderRadius: 999,
                padding: "12px 18px",
                fontSize: 16,
                fontWeight: 800,
                textDecoration: "none",
              }}
            >
              Browse guides
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
