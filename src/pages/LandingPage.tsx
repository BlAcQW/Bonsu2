import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { AboutSection } from '../components/AboutSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { TrustSection } from '../components/TrustSection';
import { VapiModal } from '../components/VapiModal';
export function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleStartChat = () => {
    setIsModalOpen(true);
  };
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <main>
        <HeroSection onStartChat={handleStartChat} />
        <AboutSection />
        <HowItWorksSection />
        <TrustSection />
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} Bonsu. All rights reserved.
          </p>
        </div>
      </footer>

      <VapiModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>);

}