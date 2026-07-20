import React from 'react';
// Importing lightweight, clean line icons to match the screenshot design
import { Truck, CreditCard, Headphones, RotateCcw } from 'lucide-react';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-4">
      {/* Icon Wrapper */}
      <div className="text-neutral-800 mb-4 transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      {/* Feature Title */}
      <h3 className="text-base sm:text-lg font-bold text-neutral-900 mb-1.5 font-sans">
        {title}
      </h3>
      {/* Feature Description */}
      <p className="text-xs sm:text-sm text-neutral-500 font-normal max-w-[240px] leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default function FeaturesBanner() {
  const features = [
    {
      icon: <Truck className="w-8 h-8 stroke-[1.5]" />,
      title: "Fast Delivery",
      description: "Free shipping on all US orders",
    },
    {
      icon: <CreditCard className="w-8 h-8 stroke-[1.5]" />,
      title: "Safe Payment",
      description: "We ensure secure payment with PEV",
    },
    {
      icon: <Headphones className="w-8 h-8 stroke-[1.5]" />,
      title: "24/7 Online Support",
      description: "24 hours a day, 7 days a week",
    },
    {
      icon: <RotateCcw className="w-8 h-8 stroke-[1.5]" />,
      title: "Free Returns",
      description: "Simply return it within 30 days",
    },
  ];

  return (
    /* w-full ensures it stretches edge-to-edge on large screens */
    <section className="w-full bg-white border-t border-b border-neutral-100 py-12 md:py-16 px-6 lg:px-12">
      <div className="w-full max-w-7xl mx-auto">
        {/* 
          Responsive Grid Stack Matrix:
          - 1 column on tiny screens
          - 2 columns on mobile/tablets (sm:)
          - 4 columns flat on large desktop screens (lg:)
        */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 lg:gap-4">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}