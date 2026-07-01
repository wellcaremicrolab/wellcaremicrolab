"use client";

import { motion } from "framer-motion";
import { Check, Flame, Award, Heart } from "lucide-react";
import styles from "./HealthPackages.module.css";

const homePackages = [
  {
    title: "The Basic Essentials",
    price: "₹799",
    strikePrice: "₹1,131",
    tagline: "Primary health profile for routine screening",
    parameters: "39 Tests Included",
    popular: false,
    badgeText: "Preventive",
    color: "var(--primary-blue)",
    features: [
      "Complete Blood Count (CBC)",
      "Diabetic Profile (FBS)",
      "Cholesterol Screen",
      "Kidney Function Test",
      "Liver Function Test",
    ],
  },
  {
    title: "Women's Wellness Basic",
    price: "₹1,499",
    strikePrice: "₹2,718",
    tagline: "Essential testing parameters for women",
    parameters: "35 Tests Included",
    popular: false,
    badgeText: "Women's Care",
    color: "var(--primary-blue)",
    features: [
      "Complete Blood Count (CBC)",
      "Thyroid Profile",
      "Vitamin D Level",
      "Serum Calcium",
      "Fasting Blood Sugar",
      "ESR",
      "Iron Deficiency Profile",
    ],
  },
  {
    title: "Women's Wellness Plus",
    price: "₹2,799",
    strikePrice: "₹4,737",
    tagline: "Advanced preventative wellness package for women",
    parameters: "73 Tests Included",
    popular: true,
    badgeText: "Best Value",
    color: "var(--primary-green)",
    features: [
      "Complete Blood Count (CBC)",
      "Fasting Blood Sugar & HbA1c",
      "Liver & Kidney Function Tests",
      "Lipid & Thyroid Profiles",
      "Vitamin D & ESR Tests",
      "Rheumatoid Factor Profile",
      "Complete Urine Analysis",
    ],
  },
  {
    title: "Heart Health Plus",
    price: "₹3,600",
    strikePrice: "₹4,327",
    tagline: "Targeted cardiovascular & lipid diagnostic checkup",
    parameters: "41 Tests Included",
    popular: false,
    badgeText: "Popular",
    color: "var(--primary-blue)",
    features: [
      "Complete Blood Count (CBC)",
      "Fasting Blood Sugar & HbA1c",
      "Full Lipid Profile",
      "Kidney & Liver Function Checks",
      "Estimated GFR (eGFR)",
      "hs-CRP & Cardiac Risk Markers",
      "TSH (Thyroid Function)",
    ],
  },
];

export default function HealthPackages() {
  const handleBook = (pkgName) => {
    // Send event to auto-select this package in the booking form
    const selectEvent = new CustomEvent("select-package", { detail: pkgName });
    window.dispatchEvent(selectEvent);

    // Scroll to booking form on Home page, or redirect to /book-test
    const target = document.getElementById("book-test");
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const targetRect = target.getBoundingClientRect().top;
      const offsetPosition = targetRect - bodyRect - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    } else {
      window.location.href = "/book-test";
    }
  };

  return (
    <section id="packages" className={styles.section}>
      {/* Background blobs */}
      <div className="glow-bg" style={{ top: "10%", right: "20%", width: "400px", height: "400px", background: "rgba(92,184,42,0.06)" }} />
      <div className="glow-bg" style={{ bottom: "10%", left: "10%", width: "450px", height: "450px", background: "rgba(52,116,197,0.06)" }} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>Health Packages</span>
          <h2 className={styles.title}>
            Preventative <span className={styles.gradientText}>Checkup Packages</span>
          </h2>
          <p className={styles.sub}>
            Early detection saves lives. Choose one of our health packages tailored for your specific lifestyle.
          </p>
        </div>

        {/* Pricing Layout */}
        <div className={styles.pricingGrid}>
          {homePackages.map((pkg) => (
            <motion.div
              key={pkg.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring", stiffness: 85 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`${styles.card} ${pkg.popular ? styles.popularCard : ""} glass-panel`}
            >
              {/* Badge Ribbons */}
              <div className={`${styles.popularBadge} ${pkg.popular ? styles.badgeGreen : styles.badgeBlue}`}>
                <Flame size={12} className={styles.badgeIcon} />
                <span>{pkg.badgeText}</span>
              </div>

              <div className={styles.cardHeader}>
                <h3 className={styles.pkgTitle}>{pkg.title}</h3>
                <p className={styles.pkgTagline}>{pkg.tagline}</p>
                <div className={styles.priceSection}>
                  {pkg.strikePrice && (
                    <span className={styles.strikePrice}>{pkg.strikePrice}</span>
                  )}
                  <div className={styles.priceContainer}>
                    <span className={styles.currency}>₹</span>
                    <span className={styles.price}>{pkg.price.replace("₹", "")}</span>
                    <span className={styles.duration}>/ All-Inclusive</span>
                  </div>
                </div>
                <div className={styles.parametersBadge} style={{ borderColor: pkg.popular ? "var(--primary-green)" : "var(--border-light)" }}>
                  <Award size={14} style={{ color: pkg.popular ? "var(--primary-green)" : "var(--primary-blue)" }} />
                  <span>{pkg.parameters}</span>
                </div>
              </div>

              <div className={styles.cardBody}>
                <h4 className={styles.featureTitle}>Included Tests:</h4>
                <ul className={styles.featuresList}>
                  {pkg.features.map((feature, i) => (
                    <li key={i} className={styles.featureItem}>
                      <div className={`${styles.checkWrapper} ${pkg.popular ? styles.checkPopular : ""}`}>
                        <Check size={14} />
                      </div>
                      <span className={styles.featureText}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.cardFooter}>
                <button
                  onClick={() => handleBook(pkg.title)}
                  className={`${styles.bookButton} ${pkg.popular ? styles.popularButton : ""}`}
                >
                  <Heart size={16} />
                  <span>Book Package</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
