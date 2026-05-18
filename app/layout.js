import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { getSiteUrl } from "./site-url";

const siteUrl = getSiteUrl();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Can I Afford This? | Smarter Purchase Decisions",
    template: "%s | Can I Afford This?",
  },
  description:
    "A practical affordability decision tool that helps you evaluate purchases, monthly payments, savings impact, and financial breathing room before you commit.",
  openGraph: {
    title: "Can I Afford This? | Smarter Purchase Decisions",
    description:
      "Evaluate purchases, monthly payments, savings impact, and financial breathing room before you commit.",
    url: "/",
    siteName: "Can I Afford This?",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Can I Afford This? | Smarter Purchase Decisions",
    description:
      "Evaluate purchases, monthly payments, savings impact, and financial breathing room before you commit.",
  },
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
