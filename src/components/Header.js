"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, PhoneCall } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useScroll, useTransform } from "framer-motion";
import styles from "./Header.module.css";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "/services" },
  { name: "Health Packages", href: "/packages" },
  { name: "Book Test", href: "/book-test" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navVisible, setNavVisible] = useState(true);

  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();
  const logoRotate = useTransform(scrollY, [0, 2500], [0, 360]);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      // Show/hide on scroll direction
      if (currentY < 60) {
        setNavVisible(true);
      } else if (delta > 8 && !mobileMenuOpen) {
        setNavVisible(false);
      } else if (delta < -5) {
        setNavVisible(true);
      }

      lastScrollY.current = currentY;
      setScrolled(currentY > 20);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) setScrollProgress(currentY / totalHeight);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((s) => observer.observe(s));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((s) => observer.unobserve(s));
    };
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e, link) => {
    setMobileMenuOpen(false);
    if (link.href.startsWith("/")) return;

    e.preventDefault();
    if (window.location.pathname === "/") {
      const target = document.querySelector(link.href);
      if (target) {
        const offset = 80;
        const y = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    } else {
      window.location.href = "/" + link.href;
    }
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress-bar"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${!navVisible ? styles.hidden : ""}`}
      >
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoContainer}>
              <motion.div style={{ rotate: logoRotate }} className={styles.logoIcon}>
                <Image
                  src="/logo.png"
                  alt="Wellcare Logo"
                  width={46}
                  height={46}
                  className={styles.logoImg}
                  loading="eager"
                />
              </motion.div>
              <div className={styles.logoText}>
                <span className={styles.brandName}>WELLCARE</span>
                <span className={styles.subBrand}>MICRO LAB</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => {
              const isHashLink = link.href.startsWith("#");
              const isSubpage = link.href.startsWith("/");
              let isActive = false;
              if (typeof window !== "undefined") {
                if (isSubpage) isActive = window.location.pathname === link.href;
                else if (isHashLink) isActive = window.location.pathname === "/" && activeSection === link.href.substring(1);
              }
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link)}
                  className={`${styles.navLink} ${isActive ? styles.activeLink : ""}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeUnderline"
                      className={styles.activeUnderline}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className={styles.desktopActions}>
            <a href="tel:9677437151" className={styles.ctaButton}>
              <PhoneCall size={16} />
              <span>96774 37151</span>
            </a>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.mobileMenuToggle}
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            <motion.div
              animate={mobileMenuOpen ? "open" : "closed"}
              className={styles.hamburgerIcon}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={styles.backdrop}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={styles.mobileDrawer}
            >
              {/* Drawer Header */}
              <div className={styles.drawerHeader}>
                <div className={styles.drawerLogo}>
                  <Image src="/logo.png" alt="Wellcare" width={36} height={36} />
                  <div>
                    <div className={styles.drawerBrandName}>WELLCARE</div>
                    <div className={styles.drawerSubBrand}>MICRO LAB</div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className={styles.drawerClose}
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav Links */}
              <nav className={styles.mobileNav}>
                {navLinks.map((link, idx) => {
                  const isHashLink = link.href.startsWith("#");
                  const isSubpage = link.href.startsWith("/");
                  let isActive = false;
                  if (typeof window !== "undefined") {
                    if (isSubpage) isActive = window.location.pathname === link.href;
                    else if (isHashLink) isActive = window.location.pathname === "/" && activeSection === link.href.substring(1);
                  }
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.06, duration: 0.3 }}
                    >
                      <Link
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link)}
                        className={`${styles.mobileNavLink} ${isActive ? styles.mobileActiveLink : ""}`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* CTA in drawer */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className={styles.drawerCta}
              >
                <a href="tel:9677437151" className={styles.drawerCtaBtn}>
                  <PhoneCall size={18} />
                  <span>Call 96774 37151</span>
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
