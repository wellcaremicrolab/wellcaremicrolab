"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Navigation, Clock, Shield } from "lucide-react";
import styles from "./ContactMap.module.css";

export default function ContactMap() {
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=11.159071246149862,77.70040957180305&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="contact" className={styles.section}>
      {/* Background Glows */}
      <div className="glow-bg" style={{ bottom: "5%", right: "5%", width: "400px", height: "400px", background: "rgba(92,184,42,0.06)" }} />
      <div className="glow-bg" style={{ top: "10%", left: "5%", width: "450px", height: "450px", background: "rgba(52,116,197,0.06)" }} />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Contact Details Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.detailsCol}
          >
            <span className={styles.tag}>Get In Touch</span>
            <h2 className={styles.title}>
              Wellcare <span className={styles.gradientText}>Micro Lab</span>
            </h2>
            <p className={styles.desc}>
              Have queries about a specific test profile or need to arrange home sample collection? Connect with our path lab coordinator directly.
            </p>

            {/* Contact cards */}
            <div className={styles.contactList}>
              {/* Address */}
              <div className={`${styles.contactCard} glass-panel`}>
                <div className={styles.iconCircle}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className={styles.cardTitle}>Our Address</h4>
                  <p className={styles.cardText}>
                    Ulavu Vaniga Valagam, First Floor, Kangeyam Road, Arachalur, Erode 638101
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className={`${styles.contactCard} glass-panel`}>
                <div className={styles.iconCircleBlue}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className={styles.cardTitle}>Phone Number</h4>
                  <div className={styles.phoneGroup}>
                    <a href="tel:9677437151" className={styles.phoneLink}>96774 37151</a>
                    <span className={styles.phoneDivider}>|</span>
                    <a href="tel:9698737151" className={styles.phoneLink}>96987 37151</a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className={`${styles.contactCard} glass-panel`}>
                <div className={styles.iconCircle}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className={styles.cardTitle}>Email Address</h4>
                  <a href="mailto:wellcaremicrolab@gmail.com" className={styles.emailLink}>
                    wellcaremicrolab@gmail.com
                  </a>
                </div>
              </div>

              {/* Timing */}
              <div className={`${styles.contactCard} glass-panel`}>
                <div className={styles.iconCircleBlue}>
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className={styles.cardTitle}>Laboratory Hours</h4>
                  <p className={styles.cardText}>Monday - Sunday: 07:00 AM - 09:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Google Map Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.mapCol}
          >
            {/* Map wrapping glass frame */}
            <div className={`${styles.mapFrame} glass-panel`}>
              <div className={styles.mapWrapper}>
                <iframe
                  title="Wellcare Micro Lab Google Map"
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className={styles.iframe}
                />

                {/* Floating Animated Location Pin Indicator */}
                <div className={`${styles.mapFloatingPin} glass-panel float-element`}>
                  <div className={styles.pinCircle}>
                    <Shield size={16} color="var(--bg-pure)" fill="var(--bg-pure)" />
                  </div>
                  <div className={styles.pinInfo}>
                    <h5 className={styles.pinName}>Wellcare Micro Lab</h5>
                    <p className={styles.pinDesc}>First Floor, Kangeyam Rd</p>
                  </div>
                  <div className={styles.pulsePinRing} />
                </div>
              </div>

              <div className={styles.mapBanner}>
                <div className={styles.bannerInfo}>
                  <h4 className={styles.bannerTitle}>Find Us in Arachalur</h4>
                  <p className={styles.bannerSub}>Kangeyam Road Branch</p>
                </div>
                <a
                  href="https://maps.app.goo.gl/CApxxwjXXjXNKfcP6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.directionsBtn}
                >
                  <Navigation size={16} />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
