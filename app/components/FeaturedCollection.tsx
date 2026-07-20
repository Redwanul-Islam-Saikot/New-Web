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
                className="absolute bottom-4 left-1/2 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full border-2 border-black/20 bg-white text-xs sm:bottom-6 sm:h-16 sm:w-16 sm:text-sm"
              >
                Bag
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
