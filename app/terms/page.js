export const metadata = {
  title: "Terms of Service",
  description:
    "Review the Can I Afford This? terms of service and financial disclaimer for educational affordability estimates.",
};

export default function TermsPage() {
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
          Terms of service
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
          Terms for using Can I Afford This?
        </h1>

        <p
          style={{
            margin: "14px 0 0 0",
            color: "#6b7280",
            fontSize: 15,
            lineHeight: 1.6,
          }}
        >
          Last updated: May 18, 2026
        </p>

        {[
          [
            "Educational use only",
            "Can I Afford This? provides informational estimates to help you think through purchase decisions. It does not provide financial, legal, tax, investment, credit, lending, or accounting advice.",
          ],
          [
            "No guarantee of affordability",
            "Calculator results depend on the information you enter and simplified assumptions used by the tool. A result should not be treated as a guarantee that a lender will approve you, that a purchase is risk-free, or that your future financial situation will remain unchanged.",
          ],
          [
            "Your responsibility",
            "You are responsible for reviewing your full financial situation before making a purchase. Consider debts, irregular expenses, insurance, maintenance, taxes, emergency savings, job stability, and other obligations that may not be captured by a quick calculator.",
          ],
          [
            "Premium unlocks",
            "If you purchase a premium unlock, checkout is handled through Stripe. Premium access is intended to remove the free-session gate for this application. No subscription is created by the one-time unlock flow currently presented in the app.",
          ],
          [
            "Acceptable use",
            "Do not misuse the site, attempt to disrupt its operation, reverse engineer protected systems, or use the service for unlawful activity. We may limit access if the site is abused or used in a way that harms reliability for others.",
          ],
          [
            "Changes to the service",
            "The site may change over time as calculators, guides, monetization features, and educational resources are added or improved. These terms may also be updated as the product evolves.",
          ],
        ].map(([title, copy]) => (
          <section key={title} style={{ marginTop: 26 }}>
            <h2
              style={{
                margin: 0,
                color: "#111827",
                fontSize: 24,
                fontWeight: 800,
              }}
            >
              {title}
            </h2>
            <p
              style={{
                margin: "10px 0 0 0",
                color: "#374151",
                fontSize: 17,
                lineHeight: 1.7,
              }}
            >
              {copy}
            </p>
          </section>
        ))}
      </article>
    </main>
  );
}
