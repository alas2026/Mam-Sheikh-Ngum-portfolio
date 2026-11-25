import { useState } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { CvModal } from './components/CvModal';
import { ExperienceEducation } from './components/ExperienceEducation';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { ProductionGallery } from './components/ProductionGallery';
import { ShowcaseSection } from './components/ShowcaseSection';

export default function App() {
  const [cvModalOpen, setCvModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07080a] text-zinc-100">
      <Navbar onOpenCv={() => setCvModalOpen(true)} />
      <main>
        <Hero />
        <AboutSection />
        <ExperienceEducation />
        <ProductionGallery />
        <ShowcaseSection />
        <ContactSection />
      </main>
      <Footer />
      <CvModal open={cvModalOpen} onClose={() => setCvModalOpen(false)} />
    </div>
  );
}
