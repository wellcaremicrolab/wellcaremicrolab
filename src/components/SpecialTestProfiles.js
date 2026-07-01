"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, ClipboardList, HelpCircle } from "lucide-react";
import styles from "./SpecialTestProfiles.module.css";

const categories = [
  {
    name: "Cancer Care",
    description: "Oncology tumor markers and screenings for early cancer risk detection.",
    tests: ["CA-125 (Ovarian Cancer Marker)", "PSA (Prostate Specific Antigen)", "CEA (Carcinoembryonic Antigen)", "AFP (Alpha-Fetoprotein)", "CA 19-9 (Pancreatic Marker)"],
  },
  {
    name: "Women's Health",
    description: "Hormonal screening, PCOD management, and comprehensive prenatal checks.",
    tests: ["LH (Luteinizing Hormone)", "FSH (Follicle Stimulating Hormone)", "Prolactin Level", "PCOD Screening Panel", "AMH (Anti-Mullerian Hormone)", "Beta-HCG"],
  },
  {
    name: "Men's Health",
    description: "Prostate screening, vitality checks, and androgen hormone profiling.",
    tests: ["Free & Total Testosterone", "PSA Screen", "DHT (Dihydrotestosterone)", "Semen Analysis (Computer-Aided)"],
  },
  {
    name: "Diabetic Profiles",
    description: "Complete glucose tracking, insulin resistance markers, and renal risk screens.",
    tests: ["HbA1c (Glycated Hemoglobin)", "Fasting & Post-Prandial Sugar", "Urine Microalbumin", "Fasting Insulin Level"],
  },
  {
    name: "Cardiac Profiles",
    description: "High-sensitivity cardiac markers, cholesterol ratios, and vascular risks.",
    tests: ["hs-CRP (High-Sensitivity CRP)", "Apolipoprotein A1 & B", "NT-proBNP", "Troponin-I (High Sensitivity)"],
  },
  {
    name: "Hair Loss",
    description: "Identify nutritional and hormonal deficiencies causing hair thinning.",
    tests: ["Serum Zinc & Copper", "Iron Studies (Ferritin, Transferrin)", "Thyroid Profile", "Biotin Level"],
  },
  {
    name: "Autoimmune",
    description: "Comprehensive antinuclear antibodies and connective tissue panels.",
    tests: ["ANA (Antinuclear Antibody - IFA)", "Rheumatoid Factor (RA) Quantitative", "Anti-CCP Antibody", "ESR & C-Reactive Protein"],
  },
  {
    name: "Bone Health",
    description: "Minerals and vitamin levels crucial for skeletal density and joints.",
    tests: ["Vitamin D3 (25-Hydroxy)", "Serum Calcium & Phosphorus", "Alkaline Phosphatase (ALP)", "Serum Uric Acid"],
  },
  {
    name: "Neurology",
    description: "Nerve function vitamins, neurotransmitter screening, and CSF panels.",
    tests: ["Vitamin B12 Level", "Serum Folate", "Acetylcholine Receptor Antibody", "CSF Analysis Panel"],
  },
  {
    name: "Fever Profiles",
    description: "Rapid screens for infectious tropical fevers and systemic inflammation.",
    tests: ["Dengue NS1 Antigen & IgG/IgM", "Malaria Smear (QBC)", "Typhoid Widal & Typhidot Test", "Complete Blood Count (CBC)", "CRP"],
  },
  {
    name: "Allergy Profiles",
    description: "Identify food, pollen, dust, or environmental trigger reactions.",
    tests: ["Total IgE Level", "Comprehensive Food Allergy (36 allergens)", "Inhalant Dust/Pollen Panel"],
  },
  {
    name: "Fertility",
    description: "Reproductive health assessments for couples planning a family.",
    tests: ["FSH & LH Ratio", "Prolactin & Progesterone", "AMH Fertility Screen", "Free Androgen Index"],
  },
  {
    name: "Thrombophilia",
    description: "Coagulation panels and blood clotting tendency markers.",
    tests: ["Protein C & Protein S Activity", "Lupus Anticoagulant Screen", "Antithrombin III", "D-Dimer Level"],
  },
  {
    name: "Digestive Health",
    description: "Liver enzymes, pancreatic profiles, and gastrointestinal flora checks.",
    tests: ["Complete Liver Profile", "H. Pylori Antibody (IgG)", "Stool Occult Blood", "Serum Amylase & Lipase"],
  },
];

export default function SpecialTestProfiles() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleBook = (categoryName) => {
    // Send event to auto-select this category in the booking form
    const selectEvent = new CustomEvent("select-test", { detail: categoryName });
    window.dispatchEvent(selectEvent);

    // Scroll to booking form
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
    }
  };

  return (
    <section className={styles.section}>
      {/* Background soft lighting */}
      <div className="glow-bg" style={{ top: "30%", left: "10%", width: "400px", height: "400px", background: "rgba(52,116,197,0.06)" }} />
      <div className="glow-bg" style={{ bottom: "20%", right: "15%", width: "400px", height: "400px", background: "rgba(92,184,42,0.06)" }} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>Specialized Profiles</span>
          <h2 className={styles.title}>
            Specialized <span className={styles.gradientText}>Test Categories</span>
          </h2>
          <p className={styles.sub}>
            Rather than wading through lists, choose from our premium organized testing categories. Expand any sector below to inspect available parameters.
          </p>
        </div>

        {/* Expandable Accordion Grid */}
        <div className={styles.accordionList}>
          {categories.map((category, index) => {
            const isExpanded = expandedIndex === index;
            return (
              <div
                key={category.name}
                className={`${styles.item} ${isExpanded ? styles.itemExpanded : ""} glass-panel`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleExpand(index)}
                  className={styles.triggerButton}
                  aria-expanded={isExpanded}
                >
                  <div className={styles.triggerContent}>
                    <div className={`${styles.iconWrapper} ${isExpanded ? styles.iconActive : ""}`}>
                      <ClipboardList size={20} />
                    </div>
                    <div className={styles.categoryMeta}>
                      <h3 className={styles.categoryName}>{category.name}</h3>
                      <p className={styles.categoryDesc}>{category.description}</p>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={styles.chevronWrapper}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className={styles.collapseWrapper}
                    >
                      <div className={styles.detailsContent}>
                        <div className={styles.testListContainer}>
                          <h4 className={styles.listTitle}>Diagnostic Parameters Available:</h4>
                          <div className={styles.testBadgeGrid}>
                            {category.tests.map((test, idx) => (
                              <motion.span
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.04 }}
                                className={styles.testBadge}
                              >
                                <Sparkles size={12} className={styles.badgeSparkle} />
                                <span>{test}</span>
                              </motion.span>
                            ))}
                          </div>
                        </div>

                        <div className={styles.actionPanel}>
                          <div className={styles.actionText}>
                            <HelpCircle size={16} />
                            <span>Need to book tests under this profile?</span>
                          </div>
                          <button
                            onClick={() => handleBook(category.name)}
                            className={styles.bookProfileButton}
                          >
                            <span>Select & Book Profile</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
