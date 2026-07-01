"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Droplet, Heart, Dna, Activity, ShieldAlert, ClipboardCheck, Home, Eye } from "lucide-react";
import styles from "./Services.module.css";

const servicesList = [
  {
    title: "Blood Tests",
    description: "Complete blood count, blood typing, hematology, and cellular analysis using automated analyzers.",
    icon: Droplet,
    color: "rgba(239, 68, 68, 0.18)",
    iconColor: "#ef4444",
  },
  {
    title: "Urine Analysis",
    description: "Urinalysis and biochemistry screening to monitor kidney health, infections, and metabolic levels.",
    icon: ClipboardCheck,
    color: "rgba(245, 158, 11, 0.18)",
    iconColor: "#f59e0b",
  },
  {
    title: "Hormone Tests",
    description: "Endocrine profile screening including thyroid, estrogen, testosterone, cortisol, and growth hormones.",
    icon: Dna,
    color: "rgba(139, 92, 246, 0.18)",
    iconColor: "#8b5cf6",
  },
  {
    title: "Diabetes Profile",
    description: "HbA1c testing, fasting and post-prandial blood sugar levels, and glucose tolerance tracking.",
    icon: Activity,
    color: "rgba(52, 116, 197, 0.18)",
    iconColor: "var(--primary-blue)",
  },
  {
    title: "Thyroid Profile",
    description: "Comprehensive thyroid function evaluation measuring T3, T4, and ultra-sensitive TSH levels.",
    icon: ShieldAlert,
    color: "rgba(92, 184, 42, 0.18)",
    iconColor: "var(--primary-green)",
  },
  {
    title: "Lipid Profile",
    description: "Detailed cholesterol screening including HDL, LDL, VLDL, triglycerides, and risk ratio analysis.",
    icon: Heart,
    color: "rgba(236, 72, 153, 0.18)",
    iconColor: "#ec4899",
  },
  {
    title: "Full Body Checkup",
    description: "All-inclusive health check covering liver, kidney, thyroid, heart, blood sugar, and complete pathology.",
    icon: Eye,
    color: "rgba(6, 182, 212, 0.18)",
    iconColor: "#06b6d4",
  },
  {
    title: "Home Sample Collection",
    description: "Get blood and urine collections done from the absolute comfort of your home by certified phlebotomists.",
    icon: Home,
    color: "rgba(16, 185, 129, 0.18)",
    iconColor: "#10b981",
  },
];

// Interactive Tilt Card Component using Framer Motion
function TiltCard({ service }) {
  const Icon = service.icon;

  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map mouse position to degree rotation
  const rotateX = useTransform(y, [-100, 100], [8, -8]);
  const rotateY = useTransform(x, [-100, 100], [-8, 8]);

  // Spring animations for 60 FPS smoothness
  const springConfig = { damping: 20, stiffness: 150 };
  const rX = useSpring(rotateX, springConfig);
  const rY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Position of cursor relative to center of card
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX);
    y.set(mouseY);

    // CSS Custom variables for glow location
    const glowX = e.clientX - rect.left;
    const glowY = e.clientY - rect.top;
    card.style.setProperty("--x", `${glowX}px`);
    card.style.setProperty("--y", `${glowY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      className={`${styles.card} glass-panel-interactive`}
    >
      {/* Radial Card Glow */}
      <div 
        className={styles.cardGlow} 
        style={{ 
          background: `radial-gradient(180px circle at var(--x, 80px) var(--y, 80px), ${service.color}, transparent 60%)` 
        }}
      />

      {/* Floating Icon Wrapper */}
      <div 
        className={styles.iconWrapper} 
        style={{ 
          backgroundColor: service.color, 
          color: service.iconColor,
          transform: "translateZ(30px)" // 3D depth pop-out
        }}
      >
        <Icon size={24} className={styles.icon} />
      </div>

      {/* Card Content with 3D Pop Out */}
      <h3 className={styles.cardTitle} style={{ transform: "translateZ(20px)" }}>
        {service.title}
      </h3>
      
      <p className={styles.cardDescription} style={{ transform: "translateZ(10px)" }}>
        {service.description}
      </p>
      
      {/* Arrow footer */}
      <div className={styles.cardFooter} style={{ transform: "translateZ(15px)" }}>
        <a href="#book-test" className={styles.cardLink}>
          <span>Book this test</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.arrowIcon}>
            <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </motion.div>
  );
}

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="services" className={styles.servicesSection}>
      <div className="glow-bg" style={{ bottom: "10%", left: "5%", width: "450px", height: "450px", background: "rgba(52, 116, 197, 0.08)" }} />
      <div className="glow-bg" style={{ top: "15%", right: "5%", width: "450px", height: "450px", background: "rgba(92, 184, 42, 0.08)" }} />

      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.sectionTag}>Diagnostic Services</span>
          <h2 className={styles.sectionTitle}>
            Comprehensive <span className={styles.gradientText}>Clinical Testing</span>
          </h2>
          <p className={styles.sectionSub}>
            We provide a wide array of laboratory diagnostics with extreme precision, utilizing automated advanced machines and experienced pathology experts.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className={styles.grid}
        >
          {servicesList.map((service) => (
            <TiltCard key={service.title} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
