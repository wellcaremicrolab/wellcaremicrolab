"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "./Loader";

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  // Skip loader if session has already loaded once (improves subpage navigation)
  useEffect(() => {
    const hasLoaded = sessionStorage.getItem("wellcare-loaded");
    if (hasLoaded) {
      setLoading(false);
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("wellcare-loaded", "true");
    setLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <Loader key="loader" onComplete={handleComplete} />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ width: "100%", minHeight: "100vh" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
