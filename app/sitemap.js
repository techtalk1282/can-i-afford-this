import { getSiteUrl } from "./site-url";

const routes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/about", changeFrequency: "yearly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
  { path: "/privacy", changeFrequency: "yearly", priority: 0.4 },
  { path: "/terms", changeFrequency: "yearly", priority: 0.4 },
  { path: "/guides", changeFrequency: "monthly", priority: 0.8 },
  {
    path: "/guides/can-i-afford-this",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    path: "/guides/how-much-car-can-i-afford",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: "/guides/should-i-finance-this",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  {
    path: "/guides/safe-monthly-payment",
    changeFrequency: "monthly",
    priority: 0.75,
  },
  { path: "/blog", changeFrequency: "weekly", priority: 0.75 },
  {
    path: "/blog/before-you-finance-a-purchase",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/blog/signs-a-purchase-is-too-expensive",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/blog/how-to-think-about-monthly-payments",
    changeFrequency: "monthly",
    priority: 0.7,
  },
  {
    path: "/blog/emergency-savings-before-a-big-purchase",
    changeFrequency: "monthly",
    priority: 0.7,
  },
];

export default function sitemap() {
  const siteUrl = getSiteUrl();
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
