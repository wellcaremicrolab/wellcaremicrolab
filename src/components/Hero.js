"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Home, Phone, ShieldCheck, Award, FlaskConical, Activity, Heart } from "lucide-react";
import styles from "./Hero.module.css";

// Smooth Counter Component using requestAnimationFrame
function Counter({ value, duration = 1800 }) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.1 }
    );
    
    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }
    
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;

    const numericString = value.replace(/[^0-9]/g, "");
    const end = parseInt(numericString, 10);
    if (isNaN(end)) {
      setCount(value);
      return;
    }

    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic ease-out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * end);
      
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasAnimated, value, duration]);

  const suffix = value.replace(/[0-9]/g, "");

  return (
    <span ref={nodeRef} className={styles.counterValue}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Hero() {
  const canvasRef = useRef(null);

  // Expanded Canvas Animation (DNA Helix + Floating Molecular Particles)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = 520);

    const handleResize = () => {
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = 520;
      }
    };
    window.addEventListener("resize", handleResize);

    // Dynamic molecule structures
    const molecules = [];
    for (let i = 0; i < 8; i++) {
      molecules.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: 3 + Math.random() * 4,
        connections: [],
      });
    }

    const numNodes = 18;
    const spacing = width / (numNodes - 0.8);
    let angle = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Gradient background glow
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "rgba(255,255,255,0)");
      gradient.addColorStop(0.5, "rgba(92,184,42,0.02)");
      gradient.addColorStop(1, "rgba(52,116,197,0.02)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // 1. Draw floating molecular patterns
      molecules.forEach((mol, idx) => {
        mol.x += mol.vx;
        mol.y += mol.vy;

        // boundary checks
        if (mol.x < 0 || mol.x > width) mol.vx *= -1;
        if (mol.y < 0 || mol.y > height) mol.vy *= -1;

        // draw nodes
        ctx.beginPath();
        ctx.arc(mol.x, mol.y, mol.radius, 0, Math.PI * 2);
        ctx.fillStyle = idx % 2 === 0 ? "rgba(92, 184, 42, 0.15)" : "rgba(52, 116, 197, 0.15)";
        ctx.fill();

        // draw lines to nearest molecule nodes
        for (let j = idx + 1; j < molecules.length; j++) {
          const target = molecules[j];
          const dist = Math.hypot(mol.x - target.x, mol.y - target.y);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(mol.x, mol.y);
            ctx.lineTo(target.x, target.y);
            ctx.strokeStyle = `rgba(148, 163, 184, ${0.1 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      // 2. Draw rotating DNA Helix
      angle += 0.012;
      const strand1 = [];
      const strand2 = [];
      const amplitude = 70;
      const yOffset = height / 2;

      for (let i = 0; i < numNodes; i++) {
        const x = i * spacing;
        const currentAngle = angle + (i * 0.45);
        
        // Strand 1
        const y1 = yOffset + Math.sin(currentAngle) * amplitude;
        const size1 = 4 + Math.cos(currentAngle) * 3;
        const alpha1 = 0.35 + (Math.cos(currentAngle) + 1) * 0.35;
        strand1.push({ x, y: y1, size: size1, alpha: alpha1 });

        // Strand 2
        const y2 = yOffset + Math.sin(currentAngle + Math.PI) * amplitude;
        const size2 = 4 + Math.cos(currentAngle + Math.PI) * 3;
        const alpha2 = 0.35 + (Math.cos(currentAngle + Math.PI) + 1) * 0.35;
        strand2.push({ x, y: y2, size: size2, alpha: alpha2 });
      }

      // Draw connects
      for (let i = 0; i < numNodes; i++) {
        const p1 = strand1[i];
        const p2 = strand2[i];
        const avgAlpha = (p1.alpha + p2.alpha) / 2;

        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        const rungGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        rungGrad.addColorStop(0, `rgba(92, 184, 42, ${avgAlpha * 0.45})`);
        rungGrad.addColorStop(1, `rgba(52, 116, 197, ${avgAlpha * 0.45})`);
        ctx.strokeStyle = rungGrad;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      // Strand lines
      ctx.beginPath();
      for (let i = 0; i < numNodes; i++) {
        const p = strand1[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "rgba(92, 184, 42, 0.45)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      for (let i = 0; i < numNodes; i++) {
        const p = strand1[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(92, 184, 42, ${p.alpha})`;
        ctx.fill();
        if (p.size > 5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(92, 184, 42, ${p.alpha * 0.25})`;
          ctx.fill();
        }
      }

      ctx.beginPath();
      for (let i = 0; i < numNodes; i++) {
        const p = strand2[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "rgba(52, 116, 197, 0.45)";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      for (let i = 0; i < numNodes; i++) {
        const p = strand2[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 116, 197, ${p.alpha})`;
        ctx.fill();
        if (p.size > 5) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 1.8, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(52, 116, 197, ${p.alpha * 0.25})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleScrollTo = (id) => {
    const target = document.querySelector(id);
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
    <section id="home" className={styles.heroSection}>
      {/* Background Soft Glows */}
      <div className="glow-bg" style={{ top: "10%", left: "15%", width: "400px", height: "400px", background: "rgba(92, 184, 42, 0.15)" }} />
      <div className="glow-bg" style={{ top: "30%", right: "10%", width: "500px", height: "500px", background: "rgba(52, 116, 197, 0.15)" }} />

      <div className={styles.container}>
        <div className={styles.contentGrid}>
          {/* Hero Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={styles.heroContent}
          >
            {/* Tagline Badges */}
            <div className={styles.badgeRow}>
              <div className={styles.taglineWrapper}>
                <FlaskConical size={14} className={styles.tagIcon} />
                <span className={styles.taglineText}>External Quality Assurance By - CMC Vellore</span>
              </div>
              
              <div className={`${styles.premiumBadge} float-element`}>
                <ShieldCheck size={14} color="var(--primary-green)" />
                <span>Quality Assured Laboratory</span>
              </div>

              <div className={`${styles.premiumBadgeBlue} float-element-reverse`}>
                <Award size={14} color="var(--primary-blue)" />
                <span>Trusted Diagnostic Centre</span>
              </div>
            </div>

            {/* Main Heading */}
            <h1 className={styles.mainTitle}>
              Precision Diagnostics. <br />
              <span className={styles.gradientText}>Compassionate Care.</span>
            </h1>

            {/* Slogan */}
            <div className={styles.sloganContainer}>
              <h3 className={styles.sloganHeading}>Quality Assured Laboratory</h3>
              <p className={styles.sloganText}>Your Health is Our Priority.</p>
            </div>

            {/* Description */}
            <p className={styles.description}>
              Wellcare Micro Lab delivers hospital-grade diagnostic accuracy with state-of-the-art laboratory testing. Visit our clinic in Arachalur, Erode, or enjoy safe, hygienic home sample collection.
            </p>

            {/* CTAs */}
            <div className={styles.ctaWrapper}>
              <button onClick={() => handleScrollTo("#book-test")} className={styles.primaryCta}>
                <Calendar size={18} />
                <span>Book Appointment</span>
              </button>
              
              <button onClick={() => handleScrollTo("#book-test")} className={styles.secondaryCta}>
                <Home size={18} />
                <span>Home Sample Collection</span>
              </button>

              <a href="tel:9677437151" className={styles.tertiaryCta}>
                <Phone size={16} />
                <span>Call Now</span>
              </a>
            </div>

            {/* Trust Indicators */}
            <div className={styles.trustBadges}>
              <div className={styles.badgeItem}>
                <ShieldCheck className={styles.badgeIcon} />
                <span>100% Confidential</span>
              </div>
              <div className={styles.badgeItem}>
                <Award className={styles.badgeIcon} />
                <span>Certified Pathologists</span>
              </div>
              <div className={styles.badgeItem}>
                <Activity className={styles.badgeIcon} />
                <span>Advanced Automation</span>
              </div>
            </div>
          </motion.div>

          {/* Hero Right Visuals - Canvas & overlays */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className={styles.visualWrapper}
          >
            <div className={`${styles.glassGraphicContainer} glass-panel float-element`}>
              <div className={styles.canvasContainer}>
                <canvas ref={canvasRef} className={styles.dnaCanvas} />
              </div>
              
              {/* Dynamic Overlays */}
              <div className={`${styles.miniOverlayCard} glass-panel float-element-reverse`}>
                <div className={styles.iconCircle}>
                  <ShieldCheck size={20} color="var(--primary-green)" />
                </div>
                <div>
                  <h4 className={styles.overlayCardTitle}>CMC Vellore EQAS</h4>
                  <p className={styles.overlayCardDesc}>Quality Certified Pathology</p>
                </div>
              </div>

              <div className={`${styles.miniOverlayCard2} glass-panel float-element`}>
                <div className={styles.iconCircleBlue}>
                  <Activity size={20} color="var(--primary-blue)" />
                </div>
                <div>
                  <h4 className={styles.overlayCardTitle}>Fast Results</h4>
                  <p className={styles.overlayCardDesc}>Delivered within 24 Hours</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Statistics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`${styles.statsGrid} glass-panel`}
        >
          <div className={styles.statBox}>
            <Counter value="1500+" />
            <p className={styles.statLabel}>Happy Patients</p>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statBox}>
            <Counter value="3600+" />
            <p className={styles.statLabel}>Tests Confirmed</p>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statBox}>
            <Counter value="5+" />
            <p className={styles.statLabel}>Years of Experience</p>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statBox}>
            <Counter value="5000+" />
            <p className={styles.statLabel}>Reports Delivered</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
