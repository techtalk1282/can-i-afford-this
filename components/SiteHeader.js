import Link from "next/link";

const navLinks = [
  { href: "/", label: "Calculator" },
  { href: "/guides", label: "Guides" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header
      style={{
        background: "rgba(255, 255, 255, 0.96)",
        borderBottom: "1px solid #e6eaf0",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "18px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 18,
          flexWrap: "wrap",
          boxSizing: "border-box",
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#111827",
            fontSize: 20,
            fontWeight: 900,
            textDecoration: "none",
            letterSpacing: "-0.03em",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 34,
              height: 34,
              borderRadius: 12,
              background: "linear-gradient(135deg, #1f8a70 0%, #43b692 100%)",
              color: "#ffffff",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 15,
              fontWeight: 900,
              letterSpacing: "-0.04em",
              boxShadow: "0 10px 22px rgba(31, 138, 112, 0.22)",
            }}
          >
            CI
          </span>
          <span>Can I Afford This?</span>
        </Link>

        <nav
          aria-label="Main navigation"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: "#374151",
                fontSize: 15,
                fontWeight: 800,
                textDecoration: "none",
                padding: "9px 12px",
                borderRadius: 999,
                background: "#f8fafc",
                border: "1px solid #edf1f5",
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
