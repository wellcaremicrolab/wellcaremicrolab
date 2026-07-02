"use client";

import { motion } from "framer-motion";
import { Check, Zap, Star, Crown, ArrowRight } from "lucide-react";
import styles from "./HealthPackages.module.css";
import Link from "next/link";

const featuredPackages = [
  {
    id: "basic",
    icon: Zap,
    title: "Basic Health Package",
    description: "Essential wellness screening for active individuals covering all vital health markers.",
    originalPrice: 2200,
    price: 1499,
    tests: "45+",
    badge: "Starter",
    badgeColor: "blue",
    features: [
      "CBC (Complete Blood Count)",
      "Fasting Blood Sugar & HbA1c",
      "Lipid Profile (Cholesterol)",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT)",
      "TFT (Thyroid Function)",
      "Urine Complete Analysis",
    ],
  },
  {
    id: "executive",
    icon: Star,
    title: "Executive Health Package",
    description: "Comprehensive medical screening tailored for working professionals & busy lifestyles.",
    originalPrice: 3800,
    price: 2499,
    tests: "70+",
    badge: "Most Popular",
    badgeColor: "green",
    popular: true,
    features: [
      "All Basic Package Tests",
      "Complete Liver Function (LFT)",
      "Thyroid Profile (T3, T4, TSH)",
      "HbA1c (3-month Average Glucose)",
      "Uric Acid & Serum Calcium",
      "Vitamin D3 & Vitamin B12",
      "Iron Studies Profile",
    ],
  },
  {
    id: "premium",
    icon: Crown,
    title: "Premium Health Package",
    description: "Ultra-comprehensive gold-standard full body checkup — the complete picture of your health.",
    originalPrice: 5200,
    price: 3499,
    tests: "95+",
    badge: "Best Value",
    badgeColor: "gold",
    features: [
      "All Executive Package Tests",
      "Complete Iron Deficiency Profile",
      "Serum Electrolytes (Na, K, Cl)",
      "Cardiac Risk Markers (hs-CRP)",
      "Rheumatoid Factor Profile",
      "Testosterone / Hormone Panel",
      "Complete Urine Microscopy",
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function HealthPackages() {
  const handleBook = (pkgTitle) => {
    const event = new CustomEvent("select-package", { detail: pkgTitle });
    window.dispatchEvent(event);
    const target = document.getElementById("book-test");
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    } else {
      window.location.href = "/book-test";
    }
  };

  return (
    <section id="packages" className={styles.section}>
      {/* Background ambience */}
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      <div className={styles.container}>
        {/* Section Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.tag}>Featured Packages</span>
          <h2 className={styles.title}>
            Choose Your{" "}
            <span className={styles.gradientText}>Health Package</span>
          </h2>
          <p className={styles.subtitle}>
            Preventative care packages crafted for every stage of life.
            All tests performed with hospital-grade precision at our Arachalur lab.
          </p>
        </motion.div>

        {/* Package Cards */}
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {featuredPackages.map((pkg) => {
            const Icon = pkg.icon;
            const savePercent = Math.round(
              ((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100
            );

            return (
              <motion.div
                key={pkg.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`${styles.card} ${pkg.popular ? styles.popularCard : ""}`}
              >
                {/* Gradient border glow */}
                <div className={`${styles.cardGlow} ${styles[`cardGlow_${pkg.badgeColor}`]}`} />

                {/* Badge ribbon */}
                <div className={`${styles.badge} ${styles[`badge_${pkg.badgeColor}`]}`}>
                  <span>{pkg.badge}</span>
                </div>

                {/* Card top */}
                <div className={styles.cardTop}>
                  <div className={`${styles.iconWrap} ${styles[`iconWrap_${pkg.badgeColor}`]}`}>
                    <Icon size={20} />
                  </div>

                  <h3 className={styles.pkgTitle}>{pkg.title}</h3>
                  <p className={styles.pkgDesc}>{pkg.description}</p>

                  {/* Pricing */}
                  <div className={styles.priceBlock}>
                    <div className={styles.priceRow}>
                      <span className={styles.originalPrice}>
                        ₹{pkg.originalPrice.toLocaleString("en-IN")}
                      </span>
                      <span className={styles.saveBadge}>Save {savePercent}%</span>
                    </div>
                    <div className={styles.currentPrice}>
                      <span className={styles.rupee}>₹</span>
                      <span className={styles.amount}>
                        {pkg.price.toLocaleString("en-IN")}
                      </span>
                      <span className={styles.inclusive}>/ All-Inclusive</span>
                    </div>
                  </div>

                  {/* Tests count pill */}
                  <div className={styles.testsPill}>
                    <Check size={12} />
                    <span>{pkg.tests} Tests Included</span>
                  </div>
                </div>

                {/* Divider */}
                <div className={styles.divider} />

                {/* Features */}
                <ul className={styles.features}>
                  {pkg.features.map((f, i) => (
                    <li key={i} className={styles.featureItem}>
                      <span className={`${styles.checkIcon} ${pkg.popular ? styles.checkIconGreen : ""}`}>
                        <Check size={11} strokeWidth={3} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={() => handleBook(pkg.title)}
                  className={`${styles.bookBtn} ${pkg.popular ? styles.bookBtnPrimary : styles.bookBtnSecondary}`}
                >
                  <span>Book Package</span>
                  <ArrowRight size={16} />
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          className={styles.footerCta}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className={styles.footerCtaText}>
            Looking for women's health, cardiac, or specialty profiles?
          </p>
          <Link href="/packages" className={styles.footerCtaLink}>
            View All Packages <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
