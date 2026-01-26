import React from 'react';
import { MousePointerClick, Mic, MessageCircle } from 'lucide-react';
export function HowItWorksSection() {
  const steps = [
  {
    icon: MousePointerClick,
    title: 'Start the Chat',
    description:
    "Click the 'Talk to Bonsu Now' button to initialize the secure connection."
  },
  {
    icon: Mic,
    title: 'Enable Audio',
    description:
    'Allow microphone access so the AI agent can hear your questions clearly.'
  },
  {
    icon: MessageCircle,
    title: 'Conversate',
    description:
    'Speak naturally and receive real-time, intelligent responses from Bonsu.'
  }];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connecting with Bonsu is simple, seamless, and instant.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) =>
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">

              <div className="w-14 h-14 bg-red-50 rounded-lg flex items-center justify-center mb-6 text-[#DC2626]">
                <step.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>);

}