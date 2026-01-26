import React from 'react';
import { Button } from './Button';
import { Mic } from 'lucide-react';
interface HeroSectionProps {
  onStartChat: () => void;
}
export function HeroSection({ onStartChat }: HeroSectionProps) {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-gray-50 overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <div className="mb-8 p-1 px-3 bg-white border border-gray-200 rounded-full shadow-sm inline-flex items-center space-x-2 animate-fade-in-up">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-gray-600">
            AI Voice Agent Online
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 max-w-4xl">
          Connect with <span className="text-[#DC2626]">Bonsu</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
          Get real-time guidance, insights, and leadership through an
          intelligent, AI-powered voice conversation.
        </p>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            onClick={onStartChat}
            size="lg"
            className="w-full sm:w-auto text-lg px-10 py-6 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

            <Mic className="w-5 h-5 mr-2" />
            Talk to Bonsu Now
          </Button>

          <button className="text-gray-600 hover:text-gray-900 font-medium px-6 py-3 transition-colors">
            Learn more ↓
          </button>
        </div>
      </div>
    </section>);

}