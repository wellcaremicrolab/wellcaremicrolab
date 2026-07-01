"use client";

import { useState, useEffect } from "react";
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

  const { scrollY } = useScroll();
  const logoRotate = useTransform(scrollY, [0, 2500], [0, 360]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(window.scrollY / totalHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Active Section Observer for homepage sections
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleLinkClick = (e, link) => {
    // If it's a subpage route (starts with /), let Next.js do full redirect navigation
    if (link.href.startsWith("/")) {
      setMobileMenuOpen(false);
      return;
    }

    // Otherwise, handle hash scroll
    e.preventDefault();
    setMobileMenuOpen(false);

    if (window.location.pathname === "/") {
      const targetElement = document.querySelector(link.href);
      if (targetElement) {
        const headerOffset = scrolled ? 70 : 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    } else {
      window.location.href = "/" + link.href;
    }
  };

  return (
    <>
      <div 
        className="scroll-progress-bar" 
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <header
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} glass-panel`}
      >
        <div className={styles.container}>
          {/* Logo with scroll-linked rotating Image */}
          <Link href="/" className={styles.logoLink}>
            <div className={styles.logoContainer}>
              <motion.div
                style={{ rotate: logoRotate }}
                className={styles.logoIcon}
              >
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

          {/* Desktop Navigation Links */}
          <nav className={styles.desktopNav}>
            {navLinks.map((link) => {
              const isHashLink = link.href.startsWith("#");
              const isSubpage = link.href.startsWith("/");
              
              // Compute active state based on route or hash
              let isActive = false;
              if (typeof window !== "undefined") {
                if (isSubpage) {
                  isActive = window.location.pathname === link.href;
                } else if (isHashLink) {
                  isActive = window.location.pathname === "/" && activeSection === link.href.substring(1);
                }
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

          {/* Desktop CTA Call Button */}
          <div className={styles.desktopActions}>
            <a href="tel:9677437151" className={`${styles.ctaButton} ${styles.glowingCTA}`}>
              <PhoneCall size={16} />
              <span>Call 96774 37151</span>
            </a>
          </div>

          {/* Hamburger button for mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.mobileMenuToggle}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`${styles.mobileDrawer} glass-panel`}
          >
            <div className={styles.mobileNavContainer}>
              <nav className={styles.mobileNav}>
                {navLinks.map((link, idx) => {
                  const isHashLink = link.href.startsWith("#");
                  const isSubpage = link.href.startsWith("/");
                  let isActive = false;
                  if (typeof window !== "undefined") {
                    if (isSubpage) {
                      isActive = window.location.pathname === link.href;
                    } else if (isHashLink) {
                      isActive = window.location.pathname === "/" && activeSection === link.href.substring(1);
                    }
                  }

                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
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

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={styles.mobileActions}
              >
                <a href="tel:9677437151" className={styles.mobileCta}>
                  <PhoneCall size={18} />
                  <span>Call 96774 37151</span>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
