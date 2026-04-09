import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import SolutionSection from "@/components/SolutionSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import ResultsSection from "@/components/ResultsSection";
import ResourceHubTeaser from "@/components/ResourceHubTeaser";
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
                <ProblemSection />
                <SolutionSection />
                <ServicesSection />
                <ProcessSection />
                <ResultsSection />
                <ResourceHubTeaser />
                <CTASection />
                <Footer />
            </div>
        </main>
    );
}
