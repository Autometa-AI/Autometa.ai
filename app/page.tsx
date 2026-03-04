import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustSection from "@/components/TrustSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import TechStackSection from "@/components/TechStackSection";
import WhyAutometaSection from "@/components/WhyAutometaSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import GlobalCanvas from "@/components/GlobalCanvas";
import AuroraBackground from "@/components/AuroraBackground";

export default function Home() {
    return (
        <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", overflowX: "hidden", position: "relative" }}>
            {/* Desktop-only: interactive particle network + aurora gradient */}
            <GlobalCanvas />
            <AuroraBackground />

            {/* All content */}
            <div style={{ position: "relative", zIndex: 1 }}>
                <Navbar />
                <HeroSection />
                <TrustSection />
                <ServicesSection />
                <ProcessSection />
                <CaseStudiesSection />
                <TechStackSection />
                <WhyAutometaSection />
                <CTASection />
                <Footer />
            </div>
        </main>
    );
}
