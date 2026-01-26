import React from 'react';
export function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl bg-gray-100 overflow-hidden shadow-2xl">
              {/* Placeholder for Bonsu's image */}
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-400">
                <span className="text-lg font-medium">Bonsu Portrait</span>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#DC2626] rounded-full opacity-10"></div>
          </div>

          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-gray-900">Who is Bonsu?</h2>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Bonsu is a visionary leader dedicated to bridging the gap
                between complex challenges and actionable solutions. With a
                focus on accessibility and transparency, he has spent years
                guiding individuals and organizations toward sustainable growth.
              </p>
              <p>
                Believing that true leadership requires constant availability,
                Bonsu has embraced cutting-edge AI technology to ensure his
                guidance is accessible to everyone, anywhere, at any time.
              </p>
              <p>
                Whether you're seeking professional advice, insights on current
                trends, or just a meaningful conversation, Bonsu's digital
                presence is here to listen and respond with the same wisdom and
                care he brings to every interaction.
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) =>
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-white bg-gray-200">
                  </div>
                  )}
                </div>
                <p className="text-sm text-gray-500 font-medium">
                  Trusted by 10,000+ community members
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}