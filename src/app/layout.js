import { Inter, Outfit } from "next/font/google";
import ClientWrapper from "@/components/ClientWrapper";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata = {
  title: "Wellcare Micro Lab - Premium Diagnostic Centre in Arachalur, Erode",
  description: "Wellcare Micro Lab provides accurate, reliable, and timely diagnostic laboratory testing services in Arachalur, Erode. Book blood tests, hormone tests, lipid profiles, and full body checkups with home sample collection.",
  keywords: "Wellcare Micro Lab, diagnostic laboratory, Erode, Arachalur, blood test, home sample collection, medical lab, clinical lab, health packages, full body checkup",
  authors: [{ name: "Wellcare Micro Lab" }],
  metadataBase: new URL("https://www.wellcaremicrolab.com"),
  alternates: {
    canonical: "https://www.wellcaremicrolab.com/",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Wellcare Micro Lab | Premium Diagnostics in Erode",
    description: "Accurate, reliable, and timely laboratory testing services with modern technology in Arachalur, Erode.",
    url: "https://www.wellcaremicrolab.com",
    siteName: "Wellcare Micro Lab",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Wellcare Micro Lab DNA Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wellcare Micro Lab | Premium Diagnostics in Erode",
    description: "Accurate, reliable, and timely laboratory testing services in Arachalur, Erode.",
    images: ["/logo.png"],
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "name": "Wellcare Micro Lab",
  "image": "https://www.wellcaremicrolab.com/logo.png",
  "@id": "https://www.wellcaremicrolab.com/#business",
  "url": "https://www.wellcaremicrolab.com",
  "telephone": "+919677437151",
  "priceRange": "₹₹",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Ulavu Vaniga Valagam, First Floor, Kangeyam Road",
    "addressLocality": "Arachalur",
    "addressRegion": "Tamil Nadu",
    "postalCode": "638101",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 11.159071246149862,
    "longitude": 77.70040957180305
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "06:00",
      "closes": "20:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Sunday"],
      "opens": "07:00",
      "closes": "14:30"
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
