import React from 'react';
import { Award, Shield, Clock } from 'lucide-react';
export function TrustSection() {
  const signals = [
  {
    icon: Award,
    title: 'Years of Experience',
    description: 'Decades of leadership and industry expertise.'
  },
  {
    icon: Shield,
    title: 'Transparent & Reliable',
    description: 'Honest guidance you can count on, every time.'
  },
  {
    icon: Clock,
    title: 'Always Accessible',
    description: '24/7 availability through AI-powered interaction.'
  }];

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Trust Bonsu?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-12 text-center">
          {signals.map((signal, index) =>
          <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 bg-[#10B981]/10 rounded-full flex items-center justify-center mb-6 text-[#10B981]">
                <signal.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {signal.title}
              </h3>
              <p className="text-gray-600 max-w-xs mx-auto">
                {signal.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

}