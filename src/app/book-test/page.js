"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BookAppointment from "@/components/BookAppointment";
import styles from "./BookTestPage.module.css";

export default function BookTestPage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* We reuse the upgraded BookAppointment component which already contains the premium 2-col split grid */}
        <BookAppointment />
      </main>
      <Footer />
    </>
  );
}
