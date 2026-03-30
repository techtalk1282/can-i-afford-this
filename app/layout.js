export const metadata = {
  title: "Can I Afford This",
  description: "Financial decision tool",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
