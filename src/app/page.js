import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import HealthPackages from "@/components/HealthPackages";
import SpecialTestProfiles from "@/components/SpecialTestProfiles";
import BookAppointment from "@/components/BookAppointment";
import ContactMap from "@/components/ContactMap";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <HealthPackages />
        <SpecialTestProfiles />
        <BookAppointment />
        <ContactMap />
      </main>
      <Footer />
      <FloatingSocials />
    </>
  );
}
