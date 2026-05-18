import Link from "next/link";

const footerLinks = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
];

export default function SiteFooter() {
  return (
    <footer
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "28px 20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 18,
          boxSizing: "border-box",
        }}
      >
        <div>
          <p
            style={{
              margin: 0,
              color: "#111827",
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            Can I Afford This?
          </p>
          <p
            style={{
              margin: "8px 0 0 0",
              color: "#6b7280",
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            A practical affordability tool for thinking through purchases before
            you commit to them.
          </p>
        </div>

        <div>
          <p
            style={{
              margin: 0,
              color: "#374151",
              fontSize: 14,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Site links
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginTop: 10,
            }}
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  color: "#0f766e",
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p
            style={{
              margin: 0,
              color: "#374151",
              fontSize: 14,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Financial disclaimer
          </p>
          <p
            style={{
              margin: "8px 0 0 0",
              color: "#6b7280",
              fontSize: 14,
              lineHeight: 1.6,
            }}
          >
            This site provides educational estimates only and is not financial,
            legal, tax, or lending advice. Consider your full financial picture
            before making a purchase.
          </p>
        </div>
      </div>
    </footer>
  );
}
