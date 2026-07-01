"use client";

import { motion } from "framer-motion";
import { CheckCircle, Coins, Users, Cpu, Zap, Sparkles, Home, HeartHandshake } from "lucide-react";
import styles from "./WhyChooseUs.module.css";

const features = [
  {
    title: "Accurate Reports",
    description: "Multi-level quality checks and strict adherence to clinical lab standards ensure 100% precise reports.",
    icon: CheckCircle,
    color: "#5cb82a",
  },
  {
    title: "Affordable Pricing",
    description: "Quality diagnostic services priced reasonably, making premium healthcare diagnostics accessible to all.",
    icon: Coins,
    color: "#3474c5",
  },
  {
    title: "Experienced Professionals",
    description: "Our team consists of highly qualified pathologists, biochemists, and expert senior lab technicians.",
    icon: Users,
    color: "#5cb82a",
  },
  {
    title: "Modern Lab Equipment",
    description: "Fully automated biochemistry and hematology analyzers from industry-leading medical brands.",
    icon: Cpu,
    color: "#3474c5",
  },
  {
    title: "Fast Reports",
    description: "Efficient testing workflows enable us to deliver most pathology results within the same day.",
    icon: Zap,
    color: "#3474c5",
  },
  {
    title: "Clean & Hygienic",
    description: "Strict sanitation protocols, sterile sample kits, and a fully hygienic clinic environment.",
    icon: Sparkles,
    color: "#5cb82a",
  },
  {
    title: "Home Sample Collection",
    description: "Book home collection and have our certified technician visit your doorstep with sterile gear.",
    icon: Home,
    color: "#5cb82a",
  },
  {
    title: "Excellent Patient Support",
    description: "Our patient care executives are always ready to assist you with booking, reports, and questions.",
    icon: HeartHandshake,
    color: "#3474c5",
  },
];

export default function WhyChooseUs() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.tag}>Why Choose Wellcare</span>
          <h2 className={styles.title}>
            Excellence in <span className={styles.gradientText}>Diagnostic Pathology</span>
          </h2>
          <p className={styles.sub}>
            We combine high-end technology with patient-centric values to offer the region's most reliable and professional testing experience.
          </p>
        </div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className={styles.grid}
        >
          {features.map((feat) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={feat.title}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.04, 
                  rotate: 0.8, // subtle rotation
                  transition: { duration: 0.2, ease: "easeOut" } 
                }}
                className={`${styles.card} glass-panel`}
              >
                <div 
                  className={styles.iconCircle}
                  style={{ backgroundColor: `${feat.color}10`, color: feat.color }}
                >
                  <Icon size={24} />
                </div>
                <h3 className={styles.cardTitle}>{feat.title}</h3>
                <p className={styles.cardDesc}>{feat.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
