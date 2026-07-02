"use client";

import { motion } from "framer-motion";
import { Heart, Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Footer.module.css";

const quickLinks = [
  { label: "Home", href: "/#home", hash: "#home" },
  { label: "About Us", href: "/#about", hash: "#about" },
  { label: "Services", href: "/services" },
  { label: "Health Packages", href: "/packages" },
  { label: "Book a Test", href: "/book-test" },
  { label: "Contact", href: "/#contact", hash: "#contact" },
];

const popularTests = [
  "Complete Blood Count (CBC)",
  "Thyroid Function Test",
  "Diabetes Profile (HbA1c)",
  "Lipid Profile Screen",
  "Vitamin D & B12 Test",
  "Kidney Function Test",
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleScrollTo = (e, hash) => {
    if (!hash) return;
    e.preventDefault();
    if (window.location.pathname !== "/") {
      window.location.href = "/" + hash;
      return;
    }
    const target = document.querySelector(hash);
    if (target) {
      const y = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Top gradient line */}
      <div className={styles.topLine} />

      <div className={styles.container}>
        {/* Main Grid */}
        <div className={styles.grid}>
          {/* Brand Column */}
          <div className={styles.brandCol}>
            <div className={styles.logoWrap}>
              <Image src="/logo.png" alt="Wellcare Logo" width={44} height={44} className={styles.logoImg} />
              <div className={styles.logoText}>
                <span className={styles.brandName}>WELLCARE</span>
                <span className={styles.subBrand}>MICRO LAB</span>
              </div>
            </div>

            <p className={styles.brandDesc}>
              State-of-the-art diagnostic testing delivering precision, reliability,
              and compassionate care in Arachalur, Erode.
            </p>

            {/* Social Icons */}
            <div className={styles.socials}>
              <a
                href="https://wa.me/919677437151"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className={styles.socialLink}
                style={{ "--s-color": "#25d366" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/wellcare_micro_lab?igsh=MXVvbmJmZDF3ajNpdA=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialLink}
                style={{ "--s-color": "#e1306c" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/share/1BcSXutJzU/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={styles.socialLink}
                style={{ "--s-color": "#1877f2" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linksList}>
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    onClick={l.hash ? (e) => handleScrollTo(e, l.hash) : undefined}
                    className={styles.footerLink}
                  >
                    <ArrowRight size={12} className={styles.linkArrow} />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Tests */}
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Popular Tests</h4>
            <ul className={styles.linksList}>
              {popularTests.map((t) => (
                <li key={t}>
                  <Link href="/services" className={styles.footerLink}>
                    <ArrowRight size={12} className={styles.linkArrow} />
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Contact Us</h4>
            <div className={styles.contactList}>
              <a href="tel:9677437151" className={styles.contactItem}>
                <Phone size={15} className={styles.contactIcon} />
                <span>96774 37151</span>
              </a>
              <a href="mailto:wellcaremicrolab@gmail.com" className={styles.contactItem}>
                <Mail size={15} className={styles.contactIcon} />
                <span>wellcaremicrolab@gmail.com</span>
              </a>
              <div className={styles.contactItem}>
                <MapPin size={15} className={styles.contactIcon} />
                <span>Ulavu Vaniga Valagam, First Floor, Kangeyam Road, Arachalur – 638 101</span>
              </div>
              <div className={styles.contactItem}>
                <Clock size={15} className={styles.contactIcon} />
                <span>Mon – Sat: 6:00 AM – 8:00 PM</span>
              </div>
              <div className={styles.contactItem}>
                <Clock size={15} className={styles.contactIcon} />
                <span>Sunday: 7:00 AM – 2:30 PM</span>
              </div>
            </div>

            <div className={styles.accredBadge}>
              <span className={styles.accredDot} />
              <span>ISO Compliant · CMC Vellore EQAS</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottomBar}>
          <p className={styles.copy}>
            © {year} Wellcare Micro Lab. All rights reserved.
          </p>
          <p className={styles.credit}>
            Made with <Heart size={12} className={styles.heartIcon} /> for Health & Diagnostics
          </p>
        </div>
      </div>
    </footer>
  );
}
