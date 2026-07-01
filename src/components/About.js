"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Target, Eye, Microscope } from "lucide-react";
import styles from "./About.module.css";

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className="glow-bg" style={{ top: "20%", right: "5%", width: "400px", height: "400px", background: "rgba(92,184,42,0.06)" }} />
      <div className="glow-bg" style={{ bottom: "10%", left: "5%", width: "400px", height: "400px", background: "rgba(52,116,197,0.06)" }} />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Left Side: Microscope graphic & highlights */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.graphicCol}
          >
            <div className={`${styles.graphicFrame} glass-panel float-element`}>
              {/* Premium Animated Microscope & Lab Tubes SVG */}
              <svg
                viewBox="0 0 300 300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.labIllustrationSvg}
              >
                {/* Background glowing circle */}
                <circle cx="150" cy="150" r="80" fill="url(#circleGlow)" opacity="0.3" />

                {/* Floating Molecule node links in background */}
                <g opacity="0.4" className={styles.floatingMoleculesGroup}>
                  <line x1="60" y1="80" x2="110" y2="60" stroke="var(--primary-green)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="110" y1="60" x2="160" y2="80" stroke="var(--primary-blue)" strokeWidth="1" />
                  <circle cx="60" cy="80" r="4" fill="var(--primary-green)" />
                  <circle cx="110" cy="60" r="5" fill="var(--primary-blue)" />
                  <circle cx="160" cy="80" r="4" fill="var(--primary-green)" />
                </g>

                {/* SVG DNA strand floating */}
                <g className={styles.dnaFloatingStrand} opacity="0.3">
                  <path d="M 60 210 Q 75 195 90 210 T 120 210 T 150 210" stroke="var(--primary-blue)" strokeWidth="2" fill="none" />
                  <path d="M 60 210 Q 75 225 90 210 T 120 210 T 150 210" stroke="var(--primary-green)" strokeWidth="2" fill="none" />
                  <line x1="75" y1="202" x2="75" y2="218" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" />
                  <line x1="105" y1="202" x2="105" y2="218" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" />
                  <line x1="135" y1="202" x2="135" y2="218" stroke="rgba(148,163,184,0.5)" strokeWidth="1.5" />
                </g>

                {/* Lab Test Tube 1 */}
                <g className={styles.labTubeLeft} transform="translate(60, 110)">
                  <rect x="0" y="0" width="16" height="60" rx="8" fill="rgba(255,255,255,0.7)" stroke="var(--border-light)" strokeWidth="2" />
                  <path d="M 2 30 Q 8 28 14 30 L 14 52 A 6 6 0 0 1 2 52 Z" fill="var(--primary-green)" opacity="0.8" />
                  <line x1="-4" y1="0" x2="20" y2="0" stroke="var(--border-light)" strokeWidth="2" strokeLinecap="round" />
                  {/* Liquid Bubbles */}
                  <circle cx="5" cy="40" r="1.5" fill="white" className={styles.bubbleAnimation1} />
                  <circle cx="11" cy="46" r="1" fill="white" className={styles.bubbleAnimation2} />
                </g>

                {/* Lab Test Tube 2 */}
                <g className={styles.labTubeRight} transform="translate(220, 110)">
                  <rect x="0" y="0" width="16" height="60" rx="8" fill="rgba(255,255,255,0.7)" stroke="var(--border-light)" strokeWidth="2" />
                  <path d="M 2 20 Q 8 18 14 20 L 14 52 A 6 6 0 0 1 2 52 Z" fill="var(--primary-blue)" opacity="0.8" />
                  <line x1="-4" y1="0" x2="20" y2="0" stroke="var(--border-light)" strokeWidth="2" strokeLinecap="round" />
                  {/* Liquid Bubbles */}
                  <circle cx="6" cy="30" r="1.5" fill="white" className={styles.bubbleAnimation2} />
                  <circle cx="10" cy="42" r="1.5" fill="white" className={styles.bubbleAnimation1} />
                </g>

                {/* Microscope Illustration */}
                <g className={styles.microscopeIllustration} transform="translate(100, 75)">
                  {/* Stand / Base */}
                  <path d="M 20 120 L 80 120 A 4 4 0 0 0 84 116 L 84 110 L 16 110 L 16 116 A 4 4 0 0 0 20 120 Z" fill="#64748b" />
                  <path d="M 32 110 L 40 40 Q 42 30 52 30 L 60 30" stroke="#64748b" strokeWidth="6" strokeLinecap="round" fill="none" />
                  
                  {/* Adjustment Knob */}
                  <circle cx="36" cy="75" r="7" fill="#475569" stroke="#cbd5e1" strokeWidth="1.5" />

                  {/* Stage */}
                  <rect x="42" y="80" width="40" height="4" rx="2" fill="#334155" />
                  
                  {/* Eyepiece / Tube */}
                  <g transform="rotate(-20 50 35)">
                    <rect x="48" y="10" width="12" height="45" rx="2" fill="#475569" />
                    <rect x="45" y="5" width="18" height="6" rx="1" fill="#1e293b" />
                    <rect x="52" y="55" width="4" height="15" fill="#94a3b8" />
                    <circle cx="54" cy="70" r="2" fill="var(--primary-green)" />
                  </g>
                  
                  {/* Light Source */}
                  <path d="M 46 100 Q 50 90 54 100" stroke="#475569" strokeWidth="3" fill="none" />
                  <line x1="50" y1="92" x2="50" y2="82" stroke="var(--primary-green)" strokeWidth="2" strokeDasharray="3 3" opacity="0.7" />
                </g>

                {/* Definitions */}
                <defs>
                  <radialGradient id="circleGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--primary-green)" />
                    <stop offset="50%" stopColor="var(--primary-blue)" />
                    <stop offset="100%" stopColor="transparent" />
                  </radialGradient>
                </defs>
              </svg>
              
              <div className={`${styles.badgeOverlay} glass-panel float-element-reverse`}>
                <ShieldCheck size={24} color="var(--primary-green)" />
                <div>
                  <h4 className={styles.badgeTitle}>CMC Vellore EQAS</h4>
                  <p className={styles.badgeDesc}>ISO Quality Standards</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Welcome text and Mission/Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.textCol}
          >
            <span className={styles.tag}>About Our Laboratory</span>
            <h2 className={styles.title}>
              Wellcare <span className={styles.gradientText}>Micro Lab</span>
            </h2>
            
            <p className={styles.welcomeText}>
              Welcome to Wellcare Micro Lab – your trusted diagnostic centre in Arachalur, Erode.
            </p>
            <p className={styles.bodyText}>
              We are committed to providing accurate, reliable, and timely laboratory testing services with modern technology and experienced professionals. Your health is our prime priority.
            </p>

            {/* Mission & Vision cards */}
            <div className={styles.visionGrid}>
              {/* Mission */}
              <div className={`${styles.visionCard} glass-panel`}>
                <div className={styles.iconCircle}>
                  <Target size={20} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Our Mission</h3>
                  <p className={styles.cardDesc}>Deliver accurate diagnostics with compassion.</p>
                </div>
              </div>

              {/* Vision */}
              <div className={`${styles.visionCard} glass-panel`}>
                <div className={styles.iconCircleBlue}>
                  <Eye size={20} />
                </div>
                <div>
                  <h3 className={styles.cardTitle}>Our Vision</h3>
                  <p className={styles.cardDesc}>To become the most trusted diagnostic laboratory in the region.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
