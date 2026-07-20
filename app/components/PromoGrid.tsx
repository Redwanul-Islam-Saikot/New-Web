import React from 'react';

interface PromoCardProps {
  imageSrc: string;
  category: string;
  title: string;
  buttonText: string;
  isLarge?: boolean;
}

const PromoCard: React.FC<PromoCardProps> = ({
  imageSrc,
  category,
  title,
  buttonText,
  isLarge = false,
}) => {
  return (
    <div className="relative group overflow-hidden w-full h-full min-h-[350px] sm:min-h-[400px] lg:min-h-0">
      {/* Background Image */}
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Seamless Dark Gradient Overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 text-white z-10">
        <span className="text-xs font-semibold tracking-widest uppercase opacity-75 mb-2">
          {category}
        </span>
        <h2 className={`${
          isLarge ? 'text-2xl sm:text-3xl md:text-5xl' : 'text-lg sm:text-xl md:text-2xl'
        } font-serif font-bold leading-tight max-w-md mb-5`}>
          {title}
        </h2>
        <div>
          <button className="bg-white text-black font-semibold text-xs md:text-sm px-6 py-3 rounded-full shadow-md hover:bg-neutral-200 transition-colors duration-200">
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function FullScreenPromoGrid() {
  // Placeholder images matching the aesthetic themes in the screenshot
  const cardsData = [
    {
      id: 1,
      imageSrc: "Flash6.png",
      category: "Festive Exclusive",
      title: "Timeless Elegance. Modern Comfort.",
      buttonText: "Discover Now",
    },
    {
      id: 2,
      imageSrc: "Flash9.png",
      category: "Bridal Wear",
      title: "Timeless Wedding Fashion For Every Woman.",
      buttonText: "Discover More",
    },
    {
      id: 3,
      imageSrc: "Flash10.png",
      category: "Bridal Wear",
      title: "Timeless Wedding Fashion For Every Woman.",
      buttonText: "Discover More",
    },
    {
      id: 4,
      imageSrc: "Flash11.png",
      category: "Bridal Wear",
      title: "Timeless Wedding Fashion For Every Woman.",
      buttonText: "Discover More",
    },
    {
      id: 5,
      imageSrc: "Flash5.png",
      category: "Lehenga",
      title: "Timeless Wedding Fashion For Every Woman.",
      buttonText: "Discover More",
    },
  ];

  return (
    <section className="w-full min-h-screen bg-black overflow-hidden">
      {/* 
        - grid-cols-1 on mobile, lg:grid-cols-2 on desktop 
        - gap-0 ensures no spaces or borders show between images
        - lg:h-screen locks the height to the viewport height on large displays
      */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full lg:h-screen">
        
        {/* Left Side: Full-height Hero Card on Desktop */}
        <div className="w-full h-[50vh] lg:h-full">
          <PromoCard
            imageSrc={cardsData[0].imageSrc}
            category={cardsData[0].category}
            title={cardsData[0].title}
            buttonText={cardsData[0].buttonText}
            isLarge={true}
          />
        </div>

        {/* Right Side: Seamless 2x2 Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 h-full">
          {cardsData.slice(1).map((card) => (
            <PromoCard
              key={card.id}
              imageSrc={card.imageSrc}
              category={card.category}
              title={card.title}
              buttonText={card.buttonText}
            />
          ))}
        </div>

      </div>
    </section>
  );
}