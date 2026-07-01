"use client";

import { motion } from "framer-motion";
import { 
  Droplet, ClipboardCheck, Dna, Activity, Heart, ShieldAlert, 
  FlaskConical, ClipboardList, Sun, Zap, Users, Home, UserCheck, 
  User, CheckCircle, Clock, Calendar, ArrowRight, HeartPulse
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./ServicesPage.module.css";

const detailedServices = [
  {
    title: "Blood Tests",
    icon: Droplet,
    color: "rgba(239, 68, 68, 0.15)",
    iconColor: "#ef4444",
    description: "Complete blood diagnostics covering cell counts, blood typing, hematology, and dynamic cellular profiling.",
    benefits: "Essential for catching anemia, immune deficiencies, blood cancers, and tracking general organ response.",
    who: "Recommended for annual wellness checks, individuals experiencing chronic fatigue, or tracking current blood conditions.",
    tat: "Within 6 Hours",
  },
  {
    title: "Urine Analysis",
    icon: ClipboardCheck,
    color: "rgba(245, 158, 11, 0.15)",
    iconColor: "#f59e0b",
    description: "Microscopic and chemical testing to review chemical composition, kidney output, and track infections.",
    benefits: "Identifies early urinary tract infections (UTIs), kidney disease, and diabetic markers.",
    who: "Those experiencing lower abdominal discomfort, kidney pain, frequent urination, or during maternity screens.",
    tat: "Within 4 Hours",
  },
  {
    title: "Hormone Testing",
    icon: Dna,
    color: "rgba(139, 92, 246, 0.15)",
    iconColor: "#8b5cf6",
    description: "Endocrine profiles tracking thyroid hormones, growth factors, stress markers (cortisol), and reproductive health.",
    benefits: "Detects hormonal imbalances, thyroid malfunctions, adrenal exhaustion, and fertility parameters.",
    who: "Women with irregular cycles, individuals undergoing stress, fertility trackers, or those experiencing rapid weight changes.",
    tat: "24 Hours",
  },
  {
    title: "Diabetes Profile",
    icon: Activity,
    color: "rgba(52, 116, 197, 0.15)",
    iconColor: "var(--primary-blue)",
    description: "Measures blood glucose levels (Fasting & Post-Prandial) alongside HbA1c to evaluate a 3-month sugar average.",
    benefits: "Essential for diagnosing pre-diabetes and active type-1/type-2 diabetes, and evaluating therapy compliance.",
    who: "Anyone with a family history of diabetes, high blood pressure, excessive thirst, or sudden vision fluctuations.",
    tat: "6 Hours",
  },
  {
    title: "Lipid Profile",
    icon: Heart,
    color: "rgba(236, 72, 153, 0.15)",
    iconColor: "#ec4899",
    description: "Comprehensive panel checking Total Cholesterol, Triglycerides, HDL, LDL, and VLDL cholesterol types.",
    benefits: "Directly calculates cardiovascular stroke risk ratios and tracks arterial plaque tendencies.",
    who: "Adults over 25, individuals with high cardiovascular family history, sedentary lifestyles, or weight concerns.",
    tat: "6 Hours",
  },
  {
    title: "Thyroid Profile",
    icon: ShieldAlert,
    color: "rgba(92, 184, 42, 0.15)",
    iconColor: "var(--primary-green)",
    description: "High-sensitivity screening of T3, T4, and TSH levels to analyze thyroid gland production velocity.",
    benefits: "Highlights hyperthyroidism or hypothyroidism tendencies, which govern systemic energy levels.",
    who: "Individuals suffering from unexplained hair thinning, cold sensitivity, hyper-fatigue, or sleep fluctuations.",
    tat: "8 Hours",
  },
  {
    title: "Complete Blood Count (CBC)",
    icon: FlaskConical,
    color: "rgba(6, 182, 212, 0.15)",
    iconColor: "#06b6d4",
    description: "Measures 24+ cellular parameters including Hemoglobin, White Blood Cell differential, Red Blood Cells, and Platelets.",
    benefits: "The fundamental baseline diagnostic check to review immune status and acute infections.",
    who: "Part of basic healthcare checkups, or when experiencing fevers, bruising, or weakness.",
    tat: "4 Hours",
  },
  {
    title: "Kidney Function Test (KFT)",
    icon: ClipboardList,
    color: "rgba(16, 185, 129, 0.15)",
    iconColor: "#10b981",
    description: "Measures key kidney indicators like Urea, Serum Creatinine, Uric Acid, and calculates eGFR.",
    benefits: "Monitors waste filtration rates and catches kidney injury or stones early.",
    who: "Diabetics, heart patients, those taking heavy long-term medications, or experiencing back aches.",
    tat: "6 Hours",
  },
  {
    title: "Liver Function Test (LFT)",
    icon: UserCheck,
    color: "rgba(236, 72, 153, 0.15)",
    iconColor: "#ec4899",
    description: "Measures key proteins and enzymes (Bilirubin, SGOT, SGPT, Alkaline Phosphatase) produced by the liver.",
    benefits: "Identifies fatty liver disease, hepatitis, toxin damage, and gallbladder blockages.",
    who: "Chronic alcohol consumers, individuals experiencing jaundice, abdominal swelling, or appetite loss.",
    tat: "6 Hours",
  },
  {
    title: "Heart Tests",
    icon: HeartPulse,
    color: "rgba(239, 68, 68, 0.15)",
    iconColor: "#ef4444",
    description: "Specialized cardiac markers including hs-CRP, Lipoprotein A, and Apolipoprotein A1/B cholesterol risks.",
    benefits: "Forecasts long-term arterial blockages and coronary risk years before clinical symptoms emerge.",
    who: "High-risk cardiac patients, active smoke users, or people undergoing preventative heart checks.",
    tat: "12 Hours",
  },
  {
    title: "Vitamin Tests",
    icon: Sun,
    color: "rgba(245, 158, 11, 0.15)",
    iconColor: "#f59e0b",
    description: "Fractions of Vitamin D3 (bone absorption) and Vitamin B12 (neural function & red blood cell synthesis).",
    benefits: "Pinpoints nutritional deficits that lead to chronic nerve pain, bone loss, or anemia.",
    who: "Vegans, senior citizens, people with joint/muscle pains, or neurological numbness.",
    tat: "12 Hours",
  },
  {
    title: "Allergy Testing",
    icon: Zap,
    color: "rgba(139, 92, 246, 0.15)",
    iconColor: "#8b5cf6",
    description: "Screening of IgE levels against food allergens, dust mites, inhalants, and environmental triggers.",
    benefits: "Identifies concrete triggers causing skin rashes, sinus congestion, or breathing issues.",
    who: "People with chronic asthma, frequent hives, or persistent food-related digestion problems.",
    tat: "48 Hours",
  },
  {
    title: "Women's Health Profiles",
    icon: UserCheck,
    color: "rgba(16, 185, 129, 0.15)",
    iconColor: "#10b981",
    description: "Custom panels covering iron levels, thyroid hormones, calcium, and reproductive cycles.",
    benefits: "Tailored to evaluate hormonal stages, prevent osteoporosis, and optimize gynecological wellness.",
    who: "Women tracking cycles, expecting mothers, or undergoing menopausal changes.",
    tat: "12 Hours",
  },
  {
    title: "Men's Health Profiles",
    icon: User,
    color: "rgba(52, 116, 197, 0.15)",
    iconColor: "var(--primary-blue)",
    description: "Panels mapping testosterone levels, prostate health (PSA), and cardiac/lipid fitness profiles.",
    benefits: "Measures energy markers, prostate cancer risks, and vascular risk levels for active men.",
    who: "Men over 30 tracking hormone ratios, muscle recovery, or screening prostate health.",
    tat: "12 Hours",
  },
  {
    title: "Senior Citizen Packages",
    icon: Users,
    color: "rgba(6, 182, 212, 0.15)",
    iconColor: "#06b6d4",
    description: "Comprehensive geriatric screening checking bone density, organ function, joint parameters, and anemia status.",
    benefits: "Identifies silent age-related issues (gout, kidney slowing, Vitamin deficiency) early.",
    who: "Geriatric patients (60+) seeking comfortable annual health baselines.",
    tat: "12 Hours",
  },
  {
    title: "Home Sample Collection",
    icon: Home,
    color: "rgba(92, 184, 42, 0.15)",
    iconColor: "var(--primary-green)",
    description: "Convenient pathology test blood and urine sampling at your home or office space.",
    benefits: "Saves time, eliminates traffic, and ensures fully sanitized sterile sample handling.",
    who: "Elderly patients, busy professionals, or individuals preferring safety and convenience.",
    tat: "Scheduled Booking",
  },
];

export default function ServicesPage() {
  const handleBook = (serviceName) => {
    // Save selected test category and route to booking page
    if (typeof window !== "undefined") {
      const selectEvent = new CustomEvent("select-test", { detail: serviceName });
      window.dispatchEvent(selectEvent);
      window.location.href = "/book-test";
    }
  };

  return (
    <>
      <Header />
      
      <main className={styles.main}>
        {/* Glow backgrounds */}
        <div className="glow-bg" style={{ top: "10%", left: "10%", width: "500px", height: "500px", background: "rgba(92,184,42,0.07)" }} />
        <div className="glow-bg" style={{ top: "30%", right: "10%", width: "500px", height: "500px", background: "rgba(52,116,197,0.07)" }} />

        {/* Hero Section */}
        <section className={styles.heroSection}>
          <div className={styles.heroContainer}>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={styles.heroContent}
            >
              <span className={styles.heroTag}>Advanced Diagnostics</span>
              <h1 className={styles.heroTitle}>
                Detailed <span className={styles.gradientText}>Clinical Services</span>
              </h1>
              <p className={styles.heroSub}>
                Explore the complete scope of diagnostic testing at Wellcare Micro Lab. We provide clinical accuracy, state-of-the-art automation, and same-day report deliveries.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className={styles.gridSection}>
          <div className={styles.gridContainer}>
            <div className={styles.grid}>
              {detailedServices.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={service.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                    className={`${styles.card} glass-panel`}
                  >
                    {/* Icon circle */}
                    <div 
                      className={styles.iconCircle}
                      style={{ backgroundColor: service.color, color: service.iconColor }}
                    >
                      <Icon size={28} />
                    </div>

                    <h2 className={styles.cardTitle}>{service.title}</h2>
                    <p className={styles.cardDesc}>{service.description}</p>

                    <div className={styles.detailsDivider} />

                    {/* Metadata blocks */}
                    <div className={styles.metaSection}>
                      <div className={styles.metaRow}>
                        <CheckCircle size={16} className={styles.checkIcon} />
                        <div className={styles.metaText}>
                          <strong>Clinical Benefits:</strong> {service.benefits}
                        </div>
                      </div>
                      <div className={styles.metaRow}>
                        <Users size={16} className={styles.userIcon} />
                        <div className={styles.metaText}>
                          <strong>Target Audience:</strong> {service.who}
                        </div>
                      </div>
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.tatBlock}>
                        <Clock size={16} className={styles.clockIcon} />
                        <span>TAT: <strong>{service.tat}</strong></span>
                      </div>
                      
                      <button
                        onClick={() => handleBook(service.title)}
                        className={styles.bookBtn}
                      >
                        <span>Book Test</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </motion.div>
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
