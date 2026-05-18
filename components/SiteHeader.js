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
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        boxShadow: "0 8px 24px rgba(15, 23, 42, 0.04)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1180,
          margin: "0 auto",
          padding: "16px 20px",
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
            color: "#111827",
            fontSize: 20,
            fontWeight: 800,
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          Can I Afford This?
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
                fontWeight: 700,
                textDecoration: "none",
                padding: "8px 10px",
                borderRadius: 999,
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
