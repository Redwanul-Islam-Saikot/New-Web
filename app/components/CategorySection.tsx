type Category = {
  _id: string;
  name: string;
  cta: string;
  imageUrl: string;
  slug: string;
};

// প্রতিবার fresh ডেটা আনবে, cache করবে না
export const revalidate = 0;

async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetch(`${process.env.ADMIN_API_URL}/api/admin/category`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const json = await res.json();
    if (!json.success || !Array.isArray(json.data)) return [];

    return json.data;
  } catch (err) {
    console.error("Failed to fetch categories:", err);
    return [];
  }
}

export default async function CategoryGrid() {
  const categories = await getCategories();

  // admin panel-এ এখনো কোনো category না থাকলে সেকশনটাই hide থাকবে
  if (categories.length === 0) return null;

  return (
    <section className="w-full bg-white px-4 py-8 sm:px-8 sm:py-12 lg:px-16 lg:py-12">
      {/* Header */}
      <div className="mx-auto mb-8 flex max-w-[610px] flex-col items-center gap-2 text-center sm:mb-12">
        <p className="text-base capitalize text-black sm:text-lg">
          Shop By Category
        </p>
        <h2 className="text-2xl font-normal uppercase leading-tight text-black sm:text-4xl md:text-5xl">
          Find Your Perfect Style
        </h2>
      </div>

      {/* Grid — 1 column on mobile, 4 columns from desktop up */}
      <div className="mx-auto grid max-w-[1312px] grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <a
            key={cat._id}
            href={`/category/${cat.slug}`}
            className="group relative flex aspect-[320/447] w-full items-end overflow-hidden rounded-xl bg-cover bg-center"
            style={{ backgroundImage: `url(${cat.imageUrl})` }}
          >
            {/* Gradient overlay — matches Figma: transparent 60% -> black 99.95% */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/95 [background-position:0_60%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/5 to-transparent" />

            {/* Text content */}
            <div className="relative z-10 flex flex-col items-start gap-2.5 p-6">
              <h3 className="text-xl font-semibold capitalize leading-[1.27] text-white sm:text-2xl">
                {cat.name}
              </h3>
              <span className="flex items-center gap-2 text-sm capitalize text-white transition-all duration-200 group-hover:gap-3">
                {cat.cta}
                <svg
                  className="h-3.5 w-3.5 shrink-0"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.16667}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 7h10" />
                  <path d="M7.5 3.5 11 7l-3.5 3.5" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}