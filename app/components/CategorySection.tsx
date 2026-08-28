import Link from "next/link";

type Category = {
  _id: string;
  name: string;
  cta: string;
  imageUrl: string;
};

// প্রতিবার fresh ডেটা আনবে, cache করবে না
export const revalidate = 0;

// ডায়নামিক API URL কনফিগারেশন (Client ও Server সাইড উভয়ের জন্য নিরাপদ)
const getApiUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL || process.env.ADMIN_API_URL || "";
  return envUrl.replace(/\/$/, "");
};

async function getCategories(): Promise<Category[]> {
  try {
    const baseUrl = getApiUrl();
    const endpoint = baseUrl ? `${baseUrl}/api/admin/category` : "/api/admin/category";

    const res = await fetch(endpoint, {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
      },
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
      <div className="mx-auto grid max-w-[1312px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/shop?category=${encodeURIComponent(cat.name)}`}
            className="group relative flex aspect-[320/447] w-full flex-col justify-end overflow-hidden rounded-2xl bg-slate-100"
          >
            {/* Category Background Image */}
            <img
              src={cat.imageUrl}
              alt={cat.name}
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            />

            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            {/* Text Content & CTA Button UI */}
            <div className="relative z-10 flex flex-col items-start gap-1 p-5 sm:p-6">
              <h3 className="text-lg font-bold tracking-wide text-white sm:text-xl">
                {cat.name}
              </h3>

              <div className="flex items-center gap-1.5 text-xs font-medium tracking-normal text-slate-200 transition-all duration-300 group-hover:gap-2.5 group-hover:text-white">
                <span>{cat.cta || "Explore Collection"}</span>
                <svg
                  className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 7h10" />
                  <path d="M7.5 3.5 11 7l-3.5 3.5" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}