export default function sitemap() {
  const baseUrl = "https://www.wellcaremicrolab.com";
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/packages`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/book-test`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    },
  ];
}
