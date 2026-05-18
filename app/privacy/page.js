export const metadata = {
  title: "Privacy Policy",
  description:
    "Read the Can I Afford This? privacy policy, including how calculator inputs, local storage, cookies, and payment processing are handled.",
};

export default function PrivacyPage() {
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
          Privacy policy
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
          How we handle information.
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
            "Calculator inputs",
            "The affordability calculator uses the numbers you enter to generate an estimate. Those inputs are sent to the application server to calculate your result. Do not enter account numbers, Social Security numbers, or other sensitive personal identifiers into the calculator fields.",
          ],
          [
            "Local storage and cookies",
            "The site may use browser local storage to remember whether a free calculator session has been used and whether premium access has been unlocked on that browser. When premium access is verified, the site may also set a cookie used to recognize that unlock state.",
          ],
          [
            "Payments",
            "Paid premium unlocks are processed through Stripe. Payment card details are handled by Stripe and are not stored directly by this application. Stripe may process payment-related information according to its own privacy and security practices.",
          ],
          [
            "Operational data",
            "Like many web applications, the site may receive basic technical information such as browser type, device information, pages visited, and error logs. This information helps maintain reliability, diagnose problems, and improve the experience.",
          ],
          [
            "Advertising and analytics",
            "If advertising or analytics tools are added, they may use cookies or similar technologies to measure visits, improve content, and support monetization. Any future advertising integrations should be configured with appropriate disclosure and consent requirements where applicable.",
          ],
          [
            "Contact",
            "For privacy questions or requests, contact support@caniaffordthis.app. We may need enough information to understand and respond to your request.",
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
