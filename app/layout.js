import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: {
    default: "Can I Afford This? | Smarter Purchase Decisions",
    template: "%s | Can I Afford This?",
  },
  description:
    "A practical affordability decision tool that helps you evaluate purchases, monthly payments, savings impact, and financial breathing room before you commit.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#f5f7fb" }}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
