import CountdownTimer from "./CountdownTimer";

function formatBDT(amount: number) {
  return "BDT " + amount.toLocaleString("en-BD", { minimumFractionDigits: 2 });
}

type Campaign = {
  _id: string;
  title: string;
  subtitle?: string;
  endTime: string;
  imageUrl?: string;
  createdAt: string;
};

type Product = {
  _id: string;
  name: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  isFeatured: boolean;
  createdAt: string;
};

export const revalidate = 0;

async function getActiveCampaign(): Promise<Campaign | null> {
  try {
    const res = await fetch(`${process.env.ADMIN_API_URL}/api/admin/flash-sale`, {
      cache: "no-store",
      headers: { "Pragma": "no-cache" }
    });
    if (!res.ok) return null;

    const json = await res.json();
    if (!json.success || !Array.isArray(json.data)) return null;

    const now = new Date();
    const active = json.data
      .filter((c: Campaign) => new Date(c.endTime) > now)
      .sort(
        (a: Campaign, b: Campaign) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return active[0] || null;
  } catch (err) {
    console.error("Failed to fetch flash sale campaign:", err);
    return null;
  }
}

async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.ADMIN_API_URL}/api/admin/products`, {
      cache: "no-store",
      headers: { "Pragma": "no-cache" }
    });
    if (!res.ok) return [];

    const json = await res.json();
    if (!json.success || !Array.isArray(json.data)) return [];

    const allProducts = json.data;

    // ১. প্রথমে Featured প্রোডাক্ট ফিল্টার করা
    let featured = allProducts.filter((p: Product) => p.isFeatured);

    // ২. যদি Featured প্রোডাক্ট ৪টার কম থাকে, তবে নরমাল প্রোডাক্ট দিয়ে পুরন করা
    if (featured.length < 4) {
      const nonFeatured = allProducts.filter((p: Product) => !p.isFeatured);
      featured = [...featured, ...nonFeatured];
    }

    // ৩. নতুন থেকে পুরাতন সর্টিং করে প্রথম ৪টি রিটার্ন করা
    return featured
      .sort(
        (a: Product, b: Product) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 4);
  } catch (err) {
    console.error("Failed to fetch featured products:", err);
    return [];
  }
}

function getDiscountPercent(price: number, oldPrice?: number) {
  if (!oldPrice || oldPrice <= price) return 0;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

export default async function FlashDeals() {
  const [campaign, products] = await Promise.all([
    getActiveCampaign(),
    getFeaturedProducts(),
  ]);

  const subtitle =
    campaign?.subtitle ||
    "Because Every Woman Deserves To Shine. Grab It Before It's Gone!";
  const endsAt = campaign?.endTime
    ? new Date(campaign.endTime).toISOString()
    : new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString();

  const bannerImage = campaign?.imageUrl || "/flash-deal-banner.jpg";

  return (
    <section className="flex flex-col">
      {/* Top Banner */}
      <div className="relative flex flex-col items-center justify-center gap-3 overflow-hidden px-4 py-14 text-center sm:py-20">
        <img
          src={bannerImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex flex-col items-center gap-3 sm:gap-4">
          <h2 className="flex items-center gap-2 text-2xl font-bold uppercase tracking-wide text-white sm:text-4xl">
            Flash
            <span className="border-2 border-white px-3 py-0.5 italic">
              Deals
            </span>
            Live Now
          </h2>

          <CountdownTimer endsAt={endsAt} />

          <p className="text-base font-semibold uppercase tracking-wide text-white sm:text-xl">
            Up To <span className="text-amber-400">50% Off</span>
          </p>
          <p className="max-w-xs text-xs text-white/90 sm:text-sm">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Product Cards Grid */}
      {products.length > 0 && (
        <div className="flex flex-col items-center gap-6 bg-white px-4 py-10 sm:gap-8 sm:px-6 sm:py-12 md:px-16">
          <div className="grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {products.map(function (p) {
              const discountPercent = getDiscountPercent(p.price, p.oldPrice);

              return (
                <article
                  key={p._id}
                  className="group flex w-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-100">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {discountPercent > 0 && (
                      <span className="absolute left-2 top-2 rounded-md bg-red-600 px-2 py-0.5 text-xs font-bold text-white shadow">
                        -{discountPercent}%
                      </span>
                    )}

                    <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-800 shadow-md transition hover:bg-slate-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                        />
                      </svg>
                    </button>

                    <div className="absolute bottom-3 left-3 right-3">
                      <button className="w-full rounded-lg bg-white/95 py-2.5 text-xs font-bold text-slate-900 shadow transition hover:bg-white">
                        Select Options
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 pt-3">
                    <h3 className="line-clamp-1 text-xs font-semibold text-slate-800 sm:text-sm">
                      {p.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-extrabold text-slate-900">
                        {formatBDT(p.price)}
                      </span>
                      {p.oldPrice && p.oldPrice > p.price && (
                        <span className="text-xs font-medium text-slate-400 line-through">
                          {formatBDT(p.oldPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}