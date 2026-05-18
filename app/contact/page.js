export const metadata = {
  title: "Contact",
  description:
    "Contact Can I Afford This? with feedback, support questions, or partnership inquiries.",
};

export default function ContactPage() {
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
          maxWidth: 860,
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
          Contact
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
          Questions, feedback, or support?
        </h1>

        <p
          style={{
            margin: "18px 0 0 0",
            color: "#374151",
            fontSize: 18,
            lineHeight: 1.7,
          }}
        >
          We want Can I Afford This? to be clear, useful, and trustworthy. If
          something looks confusing, if you find a bug, or if you have an idea
          for a future affordability guide, please reach out.
        </p>

        <div
          style={{
            background: "linear-gradient(180deg, #effaf5 0%, #f7fffb 100%)",
            border: "1px solid #cdeee0",
            borderRadius: 18,
            padding: 22,
            marginTop: 24,
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
            Email
          </h2>
          <p
            style={{
              margin: "10px 0 0 0",
              color: "#374151",
              fontSize: 17,
              lineHeight: 1.6,
            }}
          >
            Send messages to{" "}
            <a
              href="mailto:support@caniaffordthis.app"
              style={{ color: "#0f766e", fontWeight: 800 }}
            >
              support@caniaffordthis.app
            </a>
            . Include the page you were using and a short description of what
            happened so we can review it efficiently.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
            marginTop: 20,
          }}
        >
          {[
            [
              "Product feedback",
              "Tell us where the calculator or explanation could be clearer.",
            ],
            [
              "Support questions",
              "Ask about checkout, premium unlock status, or site access issues.",
            ],
            [
              "Partnerships",
              "Share relevant finance, lending, or educational partnership opportunities.",
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
      </section>
    </main>
  );
}
