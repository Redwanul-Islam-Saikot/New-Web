"use client";

import { useEffect, useState } from "react";

type Slide = {
  _id: string;
  tagline: string;
  title: string;
  badgeText: string;
  imageUrl: string;
  status: string;
};

const FALLBACK_SLIDES: Slide[] = [
  {
    _id: "fallback-1",
    tagline: "Super Saving Fest",
    title: "Discover Luxury Designer Handloom Sarees",
    badgeText: "",
    imageUrl: "https://placehold.co/1440x525/3a2530/eeeeee?text=Hero+Banner",
    status: "active",
  },
];

export default function Hero() {
  const [slides, setSlides] = useState<Slide[]>(FALLBACK_SLIDES);
  const [active, setActive] = useState(0);

  // ১. ডাটা ফেচিং (একবারই রান হবে)
  useEffect(() => {
    let isMounted = true;

    async function fetchSlides() {
      try {
        const baseUrl = (process.env.NEXT_PUBLIC_ADMIN_API_URL || "").replace(/\/$/, "");
        const endpoint = baseUrl ? `${baseUrl}/api/admin/hero` : "/api/admin/hero";

        const res = await fetch(endpoint, {
          cache: "no-store",
        });

        if (!res.ok) return;

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const json = await res.json();
          if (json.success && json.data && isMounted) {
            const activeSlides = json.data.filter(
              (s: Slide) => s.status === "active"
            );
            if (activeSlides.length > 0) {
              setSlides(activeSlides);
            }
          }
        }
      } catch (err) {
        console.error("Connection Error from Admin Port:", err);
      }
    }

    fetchSlides();

    return () => {
      isMounted = false;
    };
  }, []);

  // ২. স্লাইডার অটো-প্লে (লুপ ছাড়া নিরাপদ টাইমার)
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [slides]);

  const slide = slides[active] || FALLBACK_SLIDES[0];

  return (
    <section
      className="relative flex h-[280px] w-full items-center overflow-hidden bg-cover bg-top px-4 transition-all duration-500 sm:h-[380px] sm:px-6 md:h-[525px] md:px-16"
      style={{ backgroundImage: `url(${slide.imageUrl})` }}
    >
      <div className="max-w-xs text-white sm:max-w-md">
        {slide.badgeText && (
          <span className="mb-2 inline-block rounded bg-[#E38B4B] px-2 py-1 text-[10px] font-bold uppercase tracking-wider sm:text-xs">
            {slide.badgeText}
          </span>
        )}
        <p className="text-xl font-medium sm:text-2xl md:text-3xl">{slide.tagline}</p>
        <p className="mt-2 text-[10px] leading-relaxed tracking-wide sm:text-xs md:text-sm">
          {slide.title}
        </p>
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={() => setActive((active - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/50 sm:left-4 sm:h-10 sm:w-10 cursor-pointer"
          >
            {"<"}
          </button>

          <button
            onClick={() => setActive((active + 1) % slides.length)}
            aria-label="Next slide"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-white hover:bg-white/50 sm:right-4 sm:h-10 sm:w-10 cursor-pointer"
          >
            {">"}
          </button>

          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 sm:gap-2.5">
            {slides.map((s, i) => (
              <button
                key={s._id}
                onClick={() => setActive(i)}
                aria-label={"Go to slide " + (i + 1)}
                className={
                  i === active
                    ? "h-1 w-16 rounded-full bg-white transition-all duration-300 sm:w-[180px] cursor-pointer"
                    : "h-1 w-6 rounded-full bg-white/60 transition-all duration-300 hover:bg-white/80 sm:w-[50px] cursor-pointer"
                }
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}