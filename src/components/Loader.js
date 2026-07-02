"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "./Loader.module.css";

export default function Loader({ onComplete }) {
  const [phase, setPhase] = useState(0);
  // phase 0 = appear, 1 = build ring, 2 = progress, 3 = dissolve
  const rafRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    // Phase 0 → 1: Logo appears (200ms)
    const t1 = setTimeout(() => setPhase(1), 200);
    // Phase 1 → 2: Ring builds (400ms later = 600ms total)
    const t2 = setTimeout(() => setPhase(2), 600);
    // Phase 2 → 3: Start dissolve (900ms later = 1500ms total)
    const t3 = setTimeout(() => setPhase(3), 1350);
    // Call onComplete after dissolve finishes (300ms animation)
    const t4 = setTimeout(() => {
      if (onComplete) onComplete();
    }, 1680);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  const ringDots = Array.from({ length: 12 });

  return (
    <div className={`${styles.overlay} ${phase === 3 ? styles.dissolve : ""}`}>
      {/* Ambient background glows */}
      <div className={styles.bgGlow1} />
      <div className={styles.bgGlow2} />

      {/* Grid lines (subtle medical-tech feel) */}
      <div className={styles.gridLines} />

      <div className={styles.stage}>
        {/* Particle ring */}
        <div className={`${styles.ring} ${phase >= 1 ? styles.ringVisible : ""}`}>
          {ringDots.map((_, i) => (
            <div
              key={i}
              className={styles.ringDot}
              style={{
                "--i": i,
                "--total": ringDots.length,
                animationDelay: `${i * 60}ms`,
              }}
            />
          ))}
        </div>

        {/* Outer glow halo */}
        <div className={`${styles.halo} ${phase >= 1 ? styles.haloVisible : ""}`} />

        {/* Logo */}
        <div className={`${styles.logoWrap} ${phase >= 0 ? styles.logoVisible : ""}`}>
          <Image
            src="/logo.png"
            alt="Wellcare Micro Lab"
            width={180}
            height={180}
            className={styles.logoImg}
            priority
          />
        </div>

        {/* Brand text */}
        <div className={`${styles.brandText} ${phase >= 1 ? styles.brandTextVisible : ""}`}>
          <span className={styles.brandName}>WELLCARE</span>
          <span className={styles.brandSub}>MICRO LAB</span>
        </div>
      </div>

      {/* Progress sweep bar */}
      <div className={`${styles.progressWrap} ${phase >= 2 ? styles.progressVisible : ""}`}>
        <div className={styles.progressBar} />
      </div>
    </div>
  );
}
