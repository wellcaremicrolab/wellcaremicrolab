"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check, Flame, Award, Heart, Search, ChevronDown, ChevronUp,
  HelpCircle, Zap, Star, Crown, Sparkles, Activity, Users, ArrowRight
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials";
import styles from "./PackagesPage.module.css";

/* ──────────────────────────────────────────────────────────────────
   FEATURED 3 — shown prominently at top
────────────────────────────────────────────────────────────────── */
const featuredPackages = [
  {
    id: "basic",
    icon: Zap,
    title: "Basic Health Package",
    description: "Essential wellness screening covering all vital health markers for active individuals.",
    originalPrice: 2200,
    price: 1499,
    tests: "45+",
    ribbon: "Starter",
    ribbonColor: "blue",
    category: "General",
    features: [
      "CBC (Complete Blood Count)",
      "Fasting Blood Sugar & HbA1c",
      "Lipid Profile (Cholesterol)",
      "Liver Function Test (LFT)",
      "Kidney Function Test (KFT)",
      "TFT (Thyroid Function)",
      "Urine Complete Analysis",
      "ESR (Inflammation Marker)",
    ],
  },
  {
    id: "executive",
    icon: Star,
    title: "Executive Health Package",
    description: "Comprehensive medical screening for working professionals & busy lifestyles.",
    originalPrice: 3800,
    price: 2499,
    tests: "70+",
    ribbon: "Most Popular",
    ribbonColor: "green",
    popular: true,
    category: "General",
    features: [
      "All Basic Package Tests",
      "Complete Liver Function (LFT)",
      "Thyroid Profile (T3, T4, TSH)",
      "HbA1c (3-Month Avg. Glucose)",
      "Uric Acid & Serum Calcium",
      "Vitamin D3 & Vitamin B12",
      "Iron Studies Profile",
      "Blood Group Typing",
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
    ribbon: "Best Value",
    ribbonColor: "gold",
    category: "General",
    features: [
      "All Executive Package Tests",
      "Complete Iron Deficiency Profile",
      "Serum Electrolytes (Na, K, Cl)",
      "Cardiac Risk Markers (hs-CRP)",
      "Rheumatoid Factor Profile",
      "Testosterone / Hormone Panel",
      "Complete Urine Microscopy",
      "Peripheral Smear Examination",
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────
   ADDITIONAL PACKAGES
────────────────────────────────────────────────────────────────── */
const additionalPackages = [
  {
    id: "essentials",
    title: "The Basic Essentials",
    originalPrice: 1131,
    price: 799,
    tests: "39",
    tagline: "Primary health profile for routine screening",
    ribbon: "Preventive",
    ribbonColor: "blue",
    category: "General",
    features: [
      "Complete Blood Count (CBC)",
      "Diabetic Profile (FBS)",
      "Cholesterol Screen",
      "Kidney Function Test",
      "Liver Function Test",
    ],
  },
  {
    id: "womens-basic",
    title: "Women's Wellness Basic",
    originalPrice: 2718,
    price: 1499,
    tests: "35",
    tagline: "Essential testing parameters for women",
    ribbon: "Women's Care",
    ribbonColor: "pink",
    category: "Women",
    features: [
      "Complete Blood Count (CBC)",
      "Thyroid Profile (TSH)",
      "Vitamin D Level",
      "Serum Calcium",
      "Fasting Blood Sugar",
      "ESR",
      "Iron Deficiency Profile",
    ],
  },
  {
    id: "womens-plus",
    title: "Women's Wellness Plus",
    originalPrice: 4737,
    price: 2799,
    tests: "73",
    tagline: "Advanced preventative wellness for women",
    ribbon: "Best for Women",
    ribbonColor: "green",
    popular: true,
    category: "Women",
    features: [
      "Complete Blood Count (CBC)",
      "Fasting Blood Sugar & HbA1c",
      "Liver & Kidney Function Tests",
      "Lipid & Thyroid Profiles",
      "Vitamin D & Iron Tests",
      "Rheumatoid Factor",
      "Complete Urine Analysis",
    ],
  },
  {
    id: "heart",
    title: "Heart Health Plus",
    originalPrice: 4327,
    price: 3600,
    tests: "41",
    tagline: "Targeted cardiovascular & lipid diagnostic checkup",
    ribbon: "Cardiac",
    ribbonColor: "red",
    category: "Cardiac",
    features: [
      "Complete Blood Count (CBC)",
      "Fasting Blood Sugar & HbA1c",
      "Full Lipid Profile",
      "Kidney & Liver Functions",
      "Estimated GFR (eGFR)",
      "hs-CRP (Cardiac Inflammation)",
      "TSH (Thyroid)",
    ],
  },
];

/* ──────────────────────────────────────────────────────────────────
   FAQs
────────────────────────────────────────────────────────────────── */
const faqs = [
  {
    q: "Do I need to fast before health package sample collection?",
    a: "Yes — for packages containing Lipid Profiles, Blood Sugar, or Iron checks, a 10–12 hour overnight fast is required. You may drink plain water, but avoid coffee, tea, juices, and food.",
  },
  {
    q: "Can I book home sample collection?",
    a: "Absolutely. We provide safe, hygienic home collection across Arachalur and surrounding areas. Our trained technicians arrive with fully sterile kits.",
  },
  {
    q: "How will I receive my test reports?",
    a: "PDF reports are sent to your registered email and WhatsApp number once verified by our pathologists. Hard copies can also be collected from our clinic.",
  },
  {
    q: "How long does it take to receive my report?",
    a: "Most package parameters are processed same day. Digital reports are delivered within 12–24 hours of sample collection.",
  },
  {
    q: "Can I add individual tests to a package?",
    a: "Yes. You can add any additional tests to your selected package at the time of booking. Just mention it in the Special Notes field or inform our coordinator.",
  },
];

/* ──────────────────────────────────────────────────────────────────
   COMPONENT
────────────────────────────────────────────────────────────────── */
const categories = ["All", "General", "Women", "Cardiac"];

const cardVariants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25 } },
};

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const filteredAdditional = additionalPackages.filter((pkg) => {
    const q = searchTerm.toLowerCase();
    const matchSearch = !q || pkg.title.toLowerCase().includes(q) || pkg.tagline.toLowerCase().includes(q);
    const matchCat = activeCategory === "All" || pkg.category === activeCategory;
    return matchSearch && matchCat;
  });

  const filteredFeatured = featuredPackages.filter((pkg) => {
    const q = searchTerm.toLowerCase();
    const matchSearch = !q || pkg.title.toLowerCase().includes(q) || pkg.description.toLowerCase().includes(q);
    const matchCat = activeCategory === "All" || pkg.category === activeCategory;
    return matchSearch && matchCat;
  });

  const handleBook = (pkgTitle) => {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("select-package", { detail: pkgTitle });
      window.dispatchEvent(event);
      window.location.href = "/book-test";
    }
  };

  return (
    <>
      <Header />

      <main className={styles.main}>
        {/* Background ambience */}
        <div className={styles.bgGlow1} />
        <div className={styles.bgGlow2} />

        {/* ── Hero Banner ── */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.heroTag}>Preventative Health</span>
              <h1 className={styles.heroTitle}>
                Wellness & Checkup{" "}
                <span className={styles.gradientText}>Packages</span>
              </h1>
              <p className={styles.heroSub}>
                Hospital-grade diagnostic packages designed for every stage of life. Book at our Arachalur clinic or opt for convenient home sample collection.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Search & Filter ── */}
        <section className={styles.controlsSection}>
          <div className={styles.controlsContainer}>
            <div className={styles.searchWrap}>
              <Search size={17} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search packages (e.g. Women, Heart, Premium)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className={styles.clearBtn}>
                  ✕
                </button>
              )}
            </div>
            <div className={styles.filterPills}>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`${styles.filterPill} ${activeCategory === cat ? styles.filterPillActive : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Packages Section ── */}
        {filteredFeatured.length > 0 && (
          <section className={styles.featuredSection}>
            <div className={styles.sectionContainer}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>
                  <Star size={12} /> Featured Packages
                </span>
                <h2 className={styles.sectionTitle}>Our Signature Health Packages</h2>
                <p className={styles.sectionSub}>
                  Most comprehensive diagnostic coverage at unbeatable value
                </p>
              </div>

              <div className={styles.featuredGrid}>
                {filteredFeatured.map((pkg, i) => {
                  const Icon = pkg.icon;
                  const savePercent = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);
                  return (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
                      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -8 }}
                      className={`${styles.featCard} ${pkg.popular ? styles.featCardPopular : ""}`}
                    >
                      {/* Glow border */}
                      <div className={`${styles.featGlow} ${styles[`featGlow_${pkg.ribbonColor}`]}`} />

                      {/* Ribbon */}
                      <div className={`${styles.ribbon} ${styles[`ribbon_${pkg.ribbonColor}`]}`}>
                        {pkg.ribbon}
                      </div>

                      <div className={`${styles.featIconWrap} ${styles[`featIconWrap_${pkg.ribbonColor}`]}`}>
                        <Icon size={22} />
                      </div>

                      <h3 className={styles.featTitle}>{pkg.title}</h3>
                      <p className={styles.featDesc}>{pkg.description}</p>

                      {/* Price */}
                      <div className={styles.priceBlock}>
                        <div className={styles.priceRow}>
                          <span className={styles.strikePrice}>₹{pkg.originalPrice.toLocaleString("en-IN")}</span>
                          <span className={styles.saveBadge}>Save {savePercent}%</span>
                        </div>
                        <div className={styles.currentPrice}>
                          <span className={styles.rupee}>₹</span>
                          <span className={styles.amount}>{pkg.price.toLocaleString("en-IN")}</span>
                          <span className={styles.allIn}>/ All-Inclusive</span>
                        </div>
                      </div>

                      {/* Tests pill */}
                      <div className={styles.testsPill}>
                        <Check size={12} /> {pkg.tests} Tests Included
                      </div>

                      <div className={styles.featDivider} />

                      {/* Features */}
                      <ul className={styles.featFeatures}>
                        {pkg.features.map((f, fi) => (
                          <li key={fi} className={styles.featFeatureItem}>
                            <span className={`${styles.check} ${pkg.popular ? styles.checkGreen : ""}`}>
                              <Check size={10} strokeWidth={3} />
                            </span>
                            {f}
                          </li>
                        ))}
                      </ul>

                      <button
                        onClick={() => handleBook(pkg.title)}
                        className={`${styles.featBtn} ${pkg.popular ? styles.featBtnPrimary : styles.featBtnSecondary}`}
                      >
                        <span>Book Package</span>
                        <ArrowRight size={16} />
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── Additional Packages Section ── */}
        {filteredAdditional.length > 0 && (
          <section className={styles.additionalSection}>
            <div className={styles.sectionContainer}>
              <div className={styles.sectionHeader}>
                <span className={styles.sectionTag}>
                  <Sparkles size={12} /> Specialty Packages
                </span>
                <h2 className={styles.sectionTitle}>Specialty & Wellness Profiles</h2>
                <p className={styles.sectionSub}>
                  Targeted diagnostic packages for specific health needs and lifestyles
                </p>
              </div>

              <div className={styles.additionalGrid}>
                <AnimatePresence mode="popLayout">
                  {filteredAdditional.map((pkg) => {
                    const savePercent = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);
                    return (
                      <motion.div
                        key={pkg.id}
                        variants={cardVariants}
                        initial="hidden"
                        whileInView="visible"
                        exit="exit"
                        viewport={{ once: true, margin: "-40px" }}
                        whileHover={{ y: -6 }}
                        className={`${styles.addCard} ${pkg.popular ? styles.addCardPopular : ""}`}
                      >
                        {/* Ribbon */}
                        {pkg.ribbon && (
                          <div className={`${styles.addRibbon} ${styles[`ribbon_${pkg.ribbonColor}`]}`}>
                            {pkg.ribbon}
                          </div>
                        )}

                        <h3 className={styles.addTitle}>{pkg.title}</h3>
                        <p className={styles.addTagline}>{pkg.tagline}</p>

                        <div className={styles.addPriceBlock}>
                          <span className={styles.addStrike}>₹{pkg.originalPrice.toLocaleString("en-IN")}</span>
                          <span className={styles.addSave}>Save {savePercent}%</span>
                          <div className={styles.addCurrentPrice}>
                            <span className={styles.addRupee}>₹</span>
                            <span className={styles.addAmount}>{pkg.price.toLocaleString("en-IN")}</span>
                          </div>
                          <span className={styles.addAllIn}>All-Inclusive</span>
                        </div>

                        <div className={styles.addTestsPill}>
                          <Award size={12} /> {pkg.tests} Tests
                        </div>

                        <div className={styles.addDivider} />

                        <ul className={styles.addFeatures}>
                          {pkg.features.map((f, fi) => (
                            <li key={fi} className={styles.addFeatureItem}>
                              <Check size={11} className={`${styles.addCheck} ${pkg.popular ? styles.addCheckGreen : ""}`} />
                              {f}
                            </li>
                          ))}
                        </ul>

                        <button
                          onClick={() => handleBook(pkg.title)}
                          className={`${styles.addBtn} ${pkg.popular ? styles.addBtnPrimary : styles.addBtnSecondary}`}
                        >
                          <Heart size={15} />
                          <span>Book Package</span>
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>
          </section>
        )}

        {/* ── No results ── */}
        {filteredFeatured.length === 0 && filteredAdditional.length === 0 && (
          <div className={styles.noResults}>
            <Search size={36} className={styles.noResultsIcon} />
            <h3>No packages found</h3>
            <p>Try a different search term or select "All" category.</p>
            <button onClick={() => { setSearchTerm(""); setActiveCategory("All"); }} className={styles.resetBtn}>
              Reset Filters
            </button>
          </div>
        )}

        {/* ── FAQ Section ── */}
        <section className={styles.faqSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionTag}>
                <HelpCircle size={12} /> FAQ
              </span>
              <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            </div>

            <div className={styles.faqList}>
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}
                    onClick={() => setExpandedFaq(isOpen ? null : idx)}
                  >
                    <button className={styles.faqQuestion}>
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className={styles.faqAnswer}
                        >
                          <p>{faq.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingSocials />
    </>
  );
}
