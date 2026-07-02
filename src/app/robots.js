export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://www.wellcaremicrolab.com/sitemap.xml",
    host: "https://www.wellcaremicrolab.com",
  };
}
