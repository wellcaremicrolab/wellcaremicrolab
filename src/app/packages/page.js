"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Flame, Award, Heart, Search, Filter, ShieldCheck, ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./PackagesPage.module.css";

const initialPackages = [
  {
    title: "The Basic Essentials",
    price: "₹799",
    strikePrice: "₹1,131",
    tagline: "Primary health profile for routine screening",
    parameters: "39 Tests",
    popular: false,
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
    title: "Women's Wellness Basic",
    price: "₹1,499",
    strikePrice: "₹2,718",
    tagline: "Essential testing parameters for women",
    parameters: "35 Tests",
    popular: false,
    category: "Women",
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
    parameters: "73 Tests",
    popular: true,
    category: "Women",
    features: [
      "Complete Blood Count (CBC)",
      "Fasting Blood Sugar",
      "HbA1c Level",
      "Liver Function Test",
      "Kidney Function Test",
      "Lipid Profile",
      "Iron Deficiency Profile",
      "Thyroid Profile",
      "Vitamin D",
      "ESR",
      "Rheumatoid Factor",
      "Complete Urine Analysis",
    ],
  },
  {
    title: "Heart Health Plus",
    price: "₹3,600",
    strikePrice: "₹4,327",
    tagline: "Targeted cardiovascular & lipid diagnostic checkup",
    parameters: "41 Tests",
    popular: false,
    category: "Cardiac",
    features: [
      "Complete Blood Count (CBC)",
      "Fasting Blood Sugar",
      "HbA1c Level",
      "Lipid Profile",
      "Kidney Function Test",
      "Estimated GFR (eGFR)",
      "Liver Function Test",
      "hs-CRP (Cardiac Inflammation)",
      "Lipoprotein A & Apolipoprotein B",
      "TSH (Thyroid)",
    ],
  },
  {
    title: "Basic Health Package",
    price: "₹1,499",
    tagline: "Essential wellness screen for active individuals",
    parameters: "45+ Tests",
    popular: false,
    category: "General",
    features: [
      "CBC (Complete Blood Count)",
      "Fasting Blood Sugar",
      "HbA1C (3 Months Average)",
      "Lipid Profile",
      "Liver Function Test",
      "Kidney Function Test",
      "TFT (Thyroid Function)",
      "Urine Complete",
    ],
  },
  {
    title: "Executive Health Package",
    price: "₹2,499",
    tagline: "Thorough medical screening for working professionals",
    parameters: "70+ Tests",
    popular: false,
    category: "General",
    features: [
      "All Basic Package Tests",
      "Complete Liver Function (LFT)",
      "Thyroid Profile (T3, T4, TSH)",
      "HbA1c (Average Glucose)",
      "Uric Acid & Calcium",
      "Vitamin D3 & Vitamin B12",
    ],
  },
  {
    title: "Premium Health Package",
    price: "₹3,499",
    tagline: "Ultra-comprehensive gold-standard checkup",
    parameters: "95+ Tests",
    popular: true,
    category: "General",
    features: [
      "All Executive Package Tests",
      "Vitamin D3 & Vitamin B12",
      "Complete Iron Profile",
      "Serum Electrolytes",
      "Cardiac Risk Markers",
      "Rheumatoid Factor Profile",
      "Complete Urine Screen",
    ],
  },
];

const comparisonTests = [
  { name: "Complete Blood Count (CBC)", basic: true, womenB: true, womenP: true, heart: true, prem: true },
  { name: "Fasting Blood Sugar (FBS)", basic: true, womenB: true, womenP: true, heart: true, prem: true },
  { name: "HbA1c (Average Sugar)", basic: false, womenB: false, womenP: true, heart: true, prem: true },
  { name: "Thyroid Profile (T3/T4/TSH)", basic: false, womenB: true, womenP: true, heart: true, prem: true },
  { name: "Lipid Profile (Cholesterol)", basic: true, womenB: false, womenP: true, heart: true, prem: true },
  { name: "Liver Function Test (LFT)", basic: true, womenB: false, womenP: true, heart: true, prem: true },
  { name: "Kidney Function Test (KFT)", basic: true, womenB: false, womenP: true, heart: true, prem: true },
  { name: "Iron Deficiency Profile", basic: false, womenB: true, womenP: true, heart: false, prem: true },
  { name: "Vitamin D & Vitamin B12", basic: false, womenB: true, womenP: true, heart: false, prem: true },
  { name: "Urine Complete Analysis", basic: false, womenB: false, womenP: true, heart: false, prem: true },
  { name: "Cardiac Inflammation (hs-CRP)", basic: false, womenB: false, womenP: false, heart: true, prem: true },
  { name: "Apolipoproteins A/B", basic: false, womenB: false, womenP: false, heart: true, prem: true },
];

const faqs = [
  {
    q: "Do I need to fast before my health package sample collection?",
    a: "Yes. For health packages containing Lipid Profiles, Blood Sugar, or Iron checks, a 10-12 hour overnight fasting state is strictly required. You may drink plain water, but avoid coffee, tea, juices, and food.",
  },
  {
    q: "Can I book home sample collection for these health packages?",
    a: "Absolutely! We provide fully safe and hygienic home collection across Arachalur and surrounding areas. Our technician will bring sterile collection kits and follow all sanitization procedures.",
  },
  {
    q: "How will I receive my pathology test reports?",
    a: "Once compiled and verified by our pathologists, PDF report files are sent automatically to your registered Email Address and WhatsApp number. Hard copies can also be collected from our clinic.",
  },
  {
    q: "How long does it take to compile health package reports?",
    a: "Most package parameters are processed on the same day. You will receive digital reports within 12 to 24 hours of sample collection.",
  },
];

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedFaq, setExpandedFaq] = useState(null);

  const filteredPackages = initialPackages.filter((pkg) => {
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pkg.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || pkg.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBook = (pkgName) => {
    if (typeof window !== "undefined") {
      const selectEvent = new CustomEvent("select-package", { detail: pkgName });
      window.dispatchEvent(selectEvent);
      window.location.href = "/book-test";
    }
  };

  const toggleFaq = (idx) => {
    setExpandedFaq(expandedFaq === idx ? null : idx);
  };

  return (
    <>
      <Header />
      
      <main className={styles.main}>
        {/* Glow backgrounds */}
        <div className="glow-bg" style={{ top: "10%", right: "10%", width: "500px", height: "500px", background: "rgba(52,116,197,0.06)" }} />
        <div className="glow-bg" style={{ bottom: "20%", left: "5%", width: "450px", height: "450px", background: "rgba(92,184,42,0.06)" }} />

        {/* Hero Banner */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <span className={styles.heroTag}>Preventative Health</span>
            <h1 className={styles.heroTitle}>
              Wellness & Checkup <span className={styles.gradientText}>Packages</span>
            </h1>
            <p className={styles.heroSub}>
              Select a preventative care package designed to review vital metrics. Search options, compare parameters, and book home collection comfortably.
            </p>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className={styles.controlsSection}>
          <div className={styles.controlsContainer}>
            <div className={`${styles.searchBarWrapper} glass-panel`}>
              <Search size={18} className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search packages (e.g. Women, Heart, Essentials)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            
            <div className={styles.categoryFilters}>
              {["All", "General", "Women", "Cardiac"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`${styles.filterBtn} ${activeCategory === cat ? styles.filterBtnActive : ""}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Package Pricing Cards Grid */}
        <section className={styles.gridSection}>
          <div className={styles.gridContainer}>
            <div className={styles.grid}>
              <AnimatePresence>
                {filteredPackages.map((pkg) => (
                  <motion.div
                    key={pkg.title}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className={`${styles.card} ${pkg.popular ? styles.popularCard : ""} glass-panel`}
                  >
                    {pkg.popular && (
                      <div className={styles.popularBadge}>
                        <Flame size={14} className={styles.badgeIcon} />
                        <span>Best Value</span>
                      </div>
                    )}

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
                        <span>{pkg.parameters} Included</span>
                      </div>
                    </div>

                    <div className={styles.cardBody}>
                      <ul className={styles.featuresList}>
                        {pkg.features.map((feature, i) => (
                          <li key={i} className={styles.featureItem}>
                            <div className={`${styles.checkWrapper} ${pkg.popular ? styles.checkPopular : ""}`}>
                              <Check size={12} />
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
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className={styles.compareSection}>
          <div className={styles.compareContainer}>
            <div className={styles.compareHeader}>
              <span className={styles.compareTag}>Compare Parameters</span>
              <h2 className={styles.compareTitle}>Core Package Matrix</h2>
              <p className={styles.compareSub}>Review how the popular packages scale up side-by-side.</p>
            </div>

            <div className={`${styles.tableWrapper} glass-panel`}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Test Parameter</th>
                    <th>Essentials</th>
                    <th>Women Basic</th>
                    <th>Women Plus</th>
                    <th>Heart Plus</th>
                    <th>Premium Profile</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonTests.map((test, index) => (
                    <tr key={index}>
                      <td className={styles.testName}>{test.name}</td>
                      <td>{test.basic ? <Check size={18} className={styles.tableCheck} /> : <span className={styles.tableDash}>-</span>}</td>
                      <td>{test.womenB ? <Check size={18} className={styles.tableCheck} /> : <span className={styles.tableDash}>-</span>}</td>
                      <td>{test.womenP ? <Check size={18} className={styles.tableCheck} /> : <span className={styles.tableDash}>-</span>}</td>
                      <td>{test.heart ? <Check size={18} className={styles.tableCheck} /> : <span className={styles.tableDash}>-</span>}</td>
                      <td>{test.prem ? <Check size={18} className={styles.tableCheck} /> : <span className={styles.tableDash}>-</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <div className={styles.faqContainer}>
            <div className={styles.faqHeader}>
              <HelpCircle size={32} className={styles.faqIcon} />
              <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
            </div>
            
            <div className={styles.faqList}>
              {faqs.map((faq, idx) => {
                const isExpanded = expandedFaq === idx;
                return (
                  <div key={idx} className={`${styles.faqItem} glass-panel`} onClick={() => toggleFaq(idx)}>
                    <button className={styles.faqQuestion}>
                      <span>{faq.q}</span>
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
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
    </>
  );
}
