"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import styles from "./Loader.module.css";

export default function Loader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [stage, setStage] = useState("assembling"); // assembling, living, outro
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Total loader duration: Strictly 2.8 seconds maximum
  useEffect(() => {
    const duration = 2800;
    const startTime = performance.now();

    const updatePercent = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(easeProgress * 100);
      setPercent(current);

      // Transitions
      if (elapsed > 1000 && stage === "assembling") {
        setStage("living");
      }

      if (progress < 1) {
        requestAnimationFrame(updatePercent);
      } else {
        setPercent(100);
        setStage("outro");
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1200); // Wait for flight-to-navbar animation
      }
    };

    requestAnimationFrame(updatePercent);
  }, [onComplete, stage]);

  // Generate 180 microscopic DOM particles for the rapid cinematic assembly
  const particles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 180; i++) {
      const angle = Math.random() * Math.PI * 2;
      const distance = 80 + Math.random() * 500;
      arr.push({
        id: i,
        startX: Math.cos(angle) * distance,
        startY: Math.sin(angle) * distance,
        color: i % 2 === 0 ? "rgba(114, 198, 61, 1)" : "rgba(79, 142, 219, 1)",
        size: Math.random() * 2.5 + 1.5,
        delay: Math.random() * 0.3,
      });
    }
    return arr;
  }, []);

  return (
    <div className={`${styles.loaderOverlay} ${stage === "outro" ? styles.outroFadeOut : ""}`}>
      
      {/* Cinematic Camera Push-In Wrapper */}
      <motion.div 
        className={styles.cameraPush}
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.08 }}
        transition={{ duration: 4.5, ease: "linear" }}
      >
        
        {/* Volumetric Fog & Soft Blooms */}
        <div className={styles.ambientVolumetricGlow} />
        <div className={styles.premiumBloom} />

        {/* Floating dust/particles in background */}
        {mounted && (
          <div className={styles.bgDustSwarm}>
            {particles.slice(0, 20).map((p) => (
              <motion.div
                key={`bg-${p.id}`}
                className={styles.dustParticle}
                initial={{ x: p.startX, y: p.startY, opacity: 0.15 }}
                animate={{ 
                  x: p.startX + (Math.random() * 80 - 40), 
                  y: p.startY + (Math.random() * 80 - 40), 
                }}
                transition={{ duration: 4, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                style={{ width: p.size * 2, height: p.size * 2, backgroundColor: p.color }}
              />
            ))}
          </div>
        )}

        <div className={styles.contentContainer}>
          
          {/* Logo Stage Container */}
          <div className={`${styles.logoStage} ${stage === "outro" ? styles.flightToNavbar : ""}`}>
            
            {/* 3D Floating & Shadow Wrapper */}
            <div className={styles.floating3DContainer}>
              <div className={styles.logoWrapper}>
                
                {/* 40% Larger Living DNA Logo */}
                <motion.div
                  initial={{ opacity: 0, filter: "blur(20px)", scale: 0.7 }}
                  animate={{ 
                    opacity: stage !== "assembling" ? 1 : 0.05, 
                    filter: stage !== "assembling" ? "blur(0px)" : "blur(8px)",
                    scale: stage !== "assembling" ? 1.0 : 0.85 
                  }}
                  transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className={`${styles.logoImageFrame} ${stage !== "assembling" ? styles.livingDNAWave : ""}`}
                >
                  {/* Energy Pulses (Blue & Green) behind the logo */}
                  <div className={styles.energyPulseBlue} />
                  <div className={styles.energyPulseGreen} />
                  
                  <Image
                    src="/logo.png"
                    alt="Wellcare Micro Lab"
                    width={220} // 40% larger than 150px
                    height={220}
                    className={styles.logoImage}
                    priority
                  />
                  
                  {/* Cinematic Light Sweep Overlay */}
                  {stage !== "assembling" && <div className={styles.glassHighlightSweep} />}
                </motion.div>

                {/* Particle Assembly Swarm */}
                <AnimatePresence>
                  {mounted && stage === "assembling" && (
                    <div className={styles.particleSwarm}>
                      {particles.map((p) => (
                        <motion.div
                          key={p.id}
                          className={styles.particle}
                          initial={{ x: p.startX, y: p.startY, opacity: 0, scale: 0 }}
                          animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          transition={{ 
                            duration: 0.8, 
                            delay: p.delay, 
                            ease: [0.22, 1, 0.36, 1] 
                          }}
                          style={{
                            width: p.size,
                            height: p.size,
                            backgroundColor: p.color,
                            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </AnimatePresence>
                
              </div>
            </div>
          </div>

          {/* Premium Typography & Loading Bar Frame */}
          <AnimatePresence>
            {stage !== "outro" && (
              <motion.div
                className={styles.typographyFrame}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                
                {stage !== "assembling" && (
                  <div className={styles.textStack}>
                    <motion.h2 
                      className={styles.brandTitle}
                      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.8 }}
                    >
                      WELLCARE MICRO LAB
                    </motion.h2>
                    <motion.h3 
                      className={styles.brandSub}
                      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.15, duration: 0.8 }}
                    >
                      QUALITY ASSURED LABORATORY
                    </motion.h3>
                    <motion.p 
                      className={styles.accreditationText}
                      initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.3, duration: 0.8 }}
                    >
                      External Quality Assurance By – CMC Vellore
                    </motion.p>
                  </div>
                )}

                {/* Ultra-Thin 2px Premium Loading Line */}
                <div className={styles.progressTrack}>
                  <motion.div
                    className={styles.progressFill}
                    style={{ width: `${percent}%` }}
                    transition={{ ease: "linear", duration: 0.1 }}
                  />
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </motion.div>
    </div>
  );
}
