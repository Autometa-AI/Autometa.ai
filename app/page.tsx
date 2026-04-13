import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ProcessSection from "@/components/ProcessSection";
import ServicesSection from "@/components/ServicesSection";
import ResultsSection from "@/components/ResultsSection";
import ResourceHubTeaser from "@/components/ResourceHubTeaser";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import LeadCapturePopup from "@/components/LeadCapturePopup";

export default function Home() {
    return (
        <main style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)", overflowX: "hidden", position: "relative" }}>
            {/* All content */}
            <div style={{ position: "relative", zIndex: 1 }}>
                <Navbar />
                <HeroSection />
                <ProblemSection />
                <ProcessSection />
                <ServicesSection />
                <ResultsSection />
                <ResourceHubTeaser />
                <CTASection />
                <Footer />
            </div>
            <FloatingContact />
            <LeadCapturePopup />
        </main>
    );
}
