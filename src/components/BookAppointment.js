"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Phone, Mail, MapPin, ClipboardList, Package, Clock, MessageSquare, CheckCircle, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";
import styles from "./BookAppointment.module.css";

const testsOptions = [
  "None",
  "Blood Tests",
  "Urine Analysis",
  "Hormone Tests",
  "Diabetes Profile",
  "Thyroid Profile",
  "Lipid Profile",
  "Full Body Checkup",
  "Cancer Care",
  "Women's Health",
  "Men's Health",
  "Hair Loss",
  "Autoimmune",
  "Bone Health",
  "Neurology",
  "Fever Profiles",
  "Allergy Profiles",
  "Fertility",
  "Thrombophilia",
  "Digestive Health",
];

const packagesOptions = [
  "None",
  "Basic Health Package (₹1499)",
  "Executive Health Package (₹2499)",
  "Premium Health Package (₹3499)",
  "Women's Wellness Plus (₹2799)",
  "Women's Wellness Basic (₹1499)",
  "Heart Health Plus (₹3600)",
  "The Basic Essentials (₹799)",
];

export default function BookAppointment() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Male",
    phone: "",
    email: "",
    address: "",
    test: "None",
    package: "None",
    date: "",
    time: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  // Set up listeners for package/test select events from other sections
  useEffect(() => {
    const handleSelectPackage = (e) => {
      const pkgName = e.detail;
      const matchedOption = packagesOptions.find((opt) => opt.includes(pkgName)) || "None";
      setFormData((prev) => ({ ...prev, package: matchedOption }));
    };

    const handleSelectTest = (e) => {
      const testName = e.detail;
      const matchedOption = testsOptions.find((opt) => opt === testName) || "None";
      setFormData((prev) => ({ ...prev, test: matchedOption }));
    };

    window.addEventListener("select-package", handleSelectPackage);
    window.addEventListener("select-test", handleSelectTest);

    return () => {
      window.removeEventListener("select-package", handleSelectPackage);
      window.removeEventListener("select-test", handleSelectTest);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const cleanValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: cleanValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField("");
  };

  const isFloating = (fieldName) => {
    return focusedField === fieldName || formData[fieldName] !== "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/wellcaremicrolab@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...formData,
          _cc: "jeevaenzo@gmail.com",
          _subject: `New Appointment Booking - ${formData.name}`,
        }),
      });

      if (response.ok) {
        setLoading(false);
        setSubmitted(true);
        
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ["#5cb82a", "#3474c5", "#ffffff"],
        });

        const whatsappMessage = `*Wellcare Micro Lab - Appointment Booking*
----------------------------------------
*Patient Name:* ${formData.name}
*Age / Gender:* ${formData.age} yrs / ${formData.gender}
*Phone:* ${formData.phone}
*Email:* ${formData.email || "N/A"}
*Address:* ${formData.address}
*Selected Test:* ${formData.test}
*Selected Package:* ${formData.package}
*Date / Time:* ${formData.date} at ${formData.time}
*Special Notes:* ${formData.notes || "None"}
----------------------------------------
_Please confirm my appointment. Thank you!_`;

        setTimeout(() => {
          window.open(
            `https://wa.me/919677437151?text=${encodeURIComponent(whatsappMessage)}`,
            "_blank"
          );
        }, 1500);
      } else {
        alert("Something went wrong. Please try again or call us directly.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Submission error:", err);
      alert("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section id="book-test" className={styles.section}>
      <div className="glow-bg" style={{ top: "20%", left: "10%", width: "450px", height: "450px", background: "rgba(92,184,42,0.06)" }} />
      <div className="glow-bg" style={{ bottom: "20%", right: "10%", width: "450px", height: "450px", background: "rgba(52,116,197,0.06)" }} />

      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Info Card Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.infoCol}
          >
            <span className={styles.tag}>Hassle-Free Booking</span>
            <h2 className={styles.title}>
              Schedule Your <span className={styles.gradientText}>Lab Test</span>
            </h2>
            <p className={styles.desc}>
              Fill out our secure booking form. Your request is emailed to our clinical coordinators and copy-forwarded to our management team instantly.
            </p>

            <div className={styles.benefitList}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h4 className={styles.benefitTitle}>Instant Confirmation</h4>
                  <p className={styles.benefitDesc}>Auto-opens WhatsApp to immediately secure your scheduling slot.</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h4 className={styles.benefitTitle}>Safe Home Collection</h4>
                  <p className={styles.benefitDesc}>Certified technicians wearing full sanitization kits visit your location.</p>
                </div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <CheckCircle size={18} />
                </div>
                <div>
                  <h4 className={styles.benefitTitle}>Fast Digital Reports</h4>
                  <p className={styles.benefitDesc}>PDF copies delivered via Email & WhatsApp within 24 hours of collection.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form Container Right */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`${styles.formContainer} glass-panel`}
          >
            {submitted ? (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={styles.successScreen}
              >
                <div className={styles.successGlow}>
                  <CheckCircle size={64} className={styles.successCheck} />
                </div>
                <h3 className={styles.successTitle}>Booking Submitted!</h3>
                <p className={styles.successDesc}>
                  We have received your appointment details. Opening WhatsApp to connect with our coordinator...
                </p>
                <div className={styles.loadingDots}>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                  <span className={styles.dot}></span>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <h3 className={styles.formTitle}>Appointment Details</h3>
                <p className={styles.formSub}>All diagnostics are handled in a sterile environment.</p>

                <div className={styles.formGrid}>
                  {/* Name */}
                  <div className={`${styles.fieldGroup} ${isFloating("name") ? styles.isFloating : ""}`}>
                    <div className={styles.inputWrapper}>
                      <User size={16} className={styles.inputIcon} />
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        onFocus={() => handleFocus("name")}
                        onBlur={handleBlur}
                        required
                        placeholder=" "
                        className={styles.input}
                      />
                      <label htmlFor="name" className={styles.label}>Patient Name</label>
                    </div>
                  </div>

                  {/* Age & Gender */}
                  <div className={styles.dualField}>
                    <div className={`${styles.fieldGroup} ${isFloating("age") ? styles.isFloating : ""}`}>
                      <div className={styles.inputWrapperSimple}>
                        <input
                          type="number"
                          id="age"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          onFocus={() => handleFocus("age")}
                          onBlur={handleBlur}
                          required
                          placeholder=" "
                          className={styles.inputSimple}
                        />
                        <label htmlFor="age" className={styles.labelSimple}>Age</label>
                      </div>
                    </div>
                    
                    <div className={styles.fieldGroup}>
                      <div className={styles.selectWrapper}>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className={styles.select}
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className={`${styles.fieldGroup} ${isFloating("phone") ? styles.isFloating : ""}`}>
                    <div className={styles.inputWrapper}>
                      <Phone size={16} className={styles.inputIcon} />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => handleFocus("phone")}
                        onBlur={handleBlur}
                        required
                        placeholder=" "
                        className={styles.input}
                      />
                      <label htmlFor="phone" className={styles.label}>Phone Number</label>
                    </div>
                  </div>

                  {/* Email */}
                  <div className={`${styles.fieldGroup} ${isFloating("email") ? styles.isFloating : ""}`}>
                    <div className={styles.inputWrapper}>
                      <Mail size={16} className={styles.inputIcon} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => handleFocus("email")}
                        onBlur={handleBlur}
                        placeholder=" "
                        className={styles.input}
                      />
                      <label htmlFor="email" className={styles.label}>Email (Optional)</label>
                    </div>
                  </div>

                  {/* Address */}
                  <div className={`${styles.fieldGroupFull} ${isFloating("address") ? styles.isFloating : ""}`}>
                    <div className={styles.inputWrapper}>
                      <MapPin size={16} className={styles.inputIcon} />
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        onFocus={() => handleFocus("address")}
                        onBlur={handleBlur}
                        required
                        placeholder=" "
                        className={styles.input}
                      />
                      <label htmlFor="address" className={styles.label}>Full Address (for Home Collection)</label>
                    </div>
                  </div>

                  {/* Test Selector */}
                  <div className={styles.fieldGroup}>
                    <div className={styles.inputWrapper}>
                      <ClipboardList size={16} className={styles.inputIcon} />
                      <select
                        id="test"
                        name="test"
                        value={formData.test}
                        onChange={handleChange}
                        className={styles.selectWithIcon}
                      >
                        {testsOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Package Selector */}
                  <div className={styles.fieldGroup}>
                    <div className={styles.inputWrapper}>
                      <Package size={16} className={styles.inputIcon} />
                      <select
                        id="package"
                        name="package"
                        value={formData.package}
                        onChange={handleChange}
                        className={styles.selectWithIcon}
                      >
                        {packagesOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className={styles.dualField}>
                    <div className={styles.fieldGroup}>
                      <div className={styles.inputWrapperSimple}>
                        <Calendar size={16} className={styles.fieldGroupIcon} />
                        <input
                          type="date"
                          id="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          required
                          className={styles.dateInput}
                        />
                      </div>
                    </div>
                    
                    <div className={styles.fieldGroup}>
                      <div className={styles.inputWrapperSimple}>
                        <Clock size={16} className={styles.fieldGroupIcon} />
                        <input
                          type="time"
                          id="time"
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className={styles.dateInput}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Special Notes */}
                  <div className={`${styles.fieldGroupFull} ${isFloating("notes") ? styles.isFloating : ""}`}>
                    <div className={styles.textareaWrapper}>
                      <MessageSquare size={16} className={styles.textareaIcon} />
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        onFocus={() => handleFocus("notes")}
                        onBlur={handleBlur}
                        placeholder=" "
                        className={styles.textarea}
                        rows="3"
                      />
                      <label htmlFor="notes" className={styles.labelArea}>Special Notes / Instructions</label>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitBtn}
                >
                  {loading ? (
                    <div className={styles.spinner} />
                  ) : (
                    <>
                      <span>Submit Appointment</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
