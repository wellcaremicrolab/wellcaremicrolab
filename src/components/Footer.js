"use client";

import { motion } from "framer-motion";
import { Heart, ExternalLink } from "lucide-react";
import styles from "./Footer.module.css";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e, id) => {
    e.preventDefault();
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
    <footer className={`${styles.footer} glass-panel`}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Col */}
          <div className={styles.brandCol}>
            <div className={styles.logoContainer}>
              <div className={styles.logoIcon}>
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.dnaLogoSvg}
                >
                  <circle cx="50" cy="15" r="5" fill="var(--primary-blue)" />
                  <circle cx="75" cy="25" r="5" fill="var(--primary-green)" />
                  <circle cx="85" cy="50" r="5" fill="var(--primary-blue)" />
                  <circle cx="75" cy="75" r="5" fill="var(--primary-green)" />
                  <circle cx="50" cy="85" r="5" fill="var(--primary-blue)" />
                  <circle cx="25" cy="75" r="5" fill="var(--primary-green)" />
                  <circle cx="15" cy="50" r="5" fill="var(--primary-blue)" />
                  <circle cx="25" cy="25" r="5" fill="var(--primary-green)" />
                  <path
                    d="M 50 15 Q 65 30 75 25 Q 85 40 85 50 Q 80 65 75 75 Q 60 85 50 85 Q 35 75 25 75 Q 15 60 15 50 Q 20 35 25 25 Z"
                    stroke="var(--primary-blue)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                  <path d="M 50 15 C 30 30 30 70 50 85" stroke="var(--primary-green)" strokeWidth="3" fill="none" />
                  <path d="M 50 15 C 70 30 70 70 50 85" stroke="var(--primary-blue)" strokeWidth="3" fill="none" />
                  <circle cx="50" cy="50" r="8" fill="var(--primary-green)" opacity="0.8" />
                </svg>
              </div>
              <div className={styles.logoText}>
                <span className={styles.brandName}>WELLCARE</span>
                <span className={styles.subBrand}>MICRO LAB</span>
              </div>
            </div>
            <p className={styles.brandDesc}>
              State-of-the-art diagnostic testing solutions delivering precision, reliability, and compassion in Arachalur, Erode.
            </p>
            <div className={styles.socials}>
              <a href="#" aria-label="Facebook" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" aria-label="Twitter" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
              </a>
              <a href="#" aria-label="Instagram" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn" className={styles.socialLink}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className={styles.link}>
                  Services
                </a>
              </li>
              <li>
                <a href="#packages" onClick={(e) => handleScrollTo(e, "#packages")} className={styles.link}>
                  Health Packages
                </a>
              </li>
              <li>
                <a href="#book-test" onClick={(e) => handleScrollTo(e, "#book-test")} className={styles.link}>
                  Book Test
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")} className={styles.link}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services Quicklist */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Popular Profiles</h4>
            <ul className={styles.linksList}>
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className={styles.link}>
                  Diabetes Profile
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className={styles.link}>
                  Thyroid Function Test
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className={styles.link}>
                  Lipid Profile Screen
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleScrollTo(e, "#services")} className={styles.link}>
                  Full Body Pathology
                </a>
              </li>
            </ul>
          </div>

          {/* Accreditations / Certifications */}
          <div className={styles.infoCol}>
            <h4 className={styles.colTitle}>Accreditation</h4>
            <p className={styles.accredText}>
              All testing procedures at Wellcare Micro Lab follow NABL quality guidelines, ensuring highly certified precision reports.
            </p>
            <div className={styles.accredBadge}>
              <span className={styles.accredDot} />
              <span>Standard Laboratory ISO Compliant</span>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className={styles.bottomBar}>
          <p className={styles.copyText}>
            &copy; {currentYear} Wellcare Micro Lab. All rights reserved.
          </p>
          <p className={styles.creditText}>
            Designed with <Heart size={12} className={styles.heartIcon} /> for Health & Diagnostics.
          </p>
        </div>
      </div>
    </footer>
  );
}
