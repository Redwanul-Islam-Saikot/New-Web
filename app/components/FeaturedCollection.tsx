type Product = {
  id: string;
  name: string;
  image: string;
};

const FEATURED_PRODUCTS: Product[] = [
  {
    id: "f1",
    name: "Organza Saree Showcase",
    image: "/Flash7.png",
  },
  {
    id: "f2",
    name: "Anarkali Suit Showcase",
    image: "/Flash2.png",
  },
  {
    id: "f3",
    name: "Co-ord Showcase",
    image: "/Flash8.png",
  },
];

export default function FeaturedCollection() {
  return (
    <section className="flex flex-col items-center gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-12 md:gap-10 md:px-16">
      <div className="flex max-w-2xl flex-col items-center gap-2 text-center">
        <p className="text-sm sm:text-base md:text-lg">Most Loved Collection</p>
        <h2 className="text-2xl font-normal uppercase leading-tight sm:text-3xl md:text-5xl md:leading-[60px]">
          Shop The Styles Our Customers Can&apos;t Get Enough Of.
        </h2>
      </div>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {FEATURED_PRODUCTS.map(function (p) {
          return (
            <div
              key={p.id}
              className="group relative h-[280px] overflow-hidden rounded-xl sm:h-[360px] md:h-[650px]"
            >
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <button
                aria-label={"Add " + p.name + " to bag"}
                className="absolute bottom-4 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border border-black/10 bg-white shadow-md transition duration-300 hover:scale-110 hover:bg-slate-50 sm:bottom-6 sm:h-14 sm:w-14"
              >
                {/* Shopping Bag Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119.993z"
                  />
                </svg>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}