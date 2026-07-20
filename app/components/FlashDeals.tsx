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

// Featured product গুলো থেকেই Flash Deals-এর কার্ড বানানো হবে —
// আলাদা কোনো FlashProduct model লাগবে না, existing Product API-ই যথেষ্ট।
async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${process.env.ADMIN_API_URL}/api/admin/products`, {
      cache: "no-store",
    });
    if (!res.ok) return [];

    const json = await res.json();
    if (!json.success || !Array.isArray(json.data)) return [];

    return json.data
      .filter((p: Product) => p.isFeatured)
      .sort(
        (a: Product, b: Product) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 4); // Flash Deals-এ সবসময় সর্বোচ্চ ৪টা কার্ড দেখাবে
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
  // banner image na thakle default fallback banner
  const bannerImage = campaign?.imageUrl || "/flash-deal-banner.jpg";

  return (
    <section className="flex flex-col">
      {/* ===== Top banner (image background + overlay text) ===== */}
      <div className="relative flex flex-col items-center justify-center gap-3 overflow-hidden px-4 py-14 text-center sm:py-20">
        {/* background photo */}
        <img
          src={bannerImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* dark tint so white text stays readable over any photo */}
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

      {/* ===== Product cards (white background) ===== */}
      {products.length > 0 && (
        <div className="flex flex-col items-center gap-6 bg-white px-4 py-10 sm:gap-8 sm:px-6 sm:py-12 md:px-16">
          <div className="grid w-full max-w-7xl grid-cols-2 gap-3 md:grid-cols-4">
            {products.map(function (p) {
              const discountPercent = getDiscountPercent(p.price, p.oldPrice);

              return (
                <article
                  key={p._id}
                  className="group flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-sm"
                >
                  <div className="relative h-[280px] w-full overflow-hidden rounded-t-xl sm:h-[300px] md:h-[380px]">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    {discountPercent > 0 && (
                      <span className="absolute left-0 top-0 rounded-br-md bg-red-600 px-2 py-1 text-xs font-bold text-white sm:px-3 sm:text-sm">
                        -{discountPercent}%
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 p-2 sm:p-3">
                    <p className="line-clamp-1 text-xs sm:text-base">{p.name}</p>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-3">
                      <span className="text-sm font-semibold sm:text-lg">
                        {formatBDT(p.price)}
                      </span>
                      {p.oldPrice && p.oldPrice > p.price && (
                        <span className="text-xs text-black/50 line-through sm:text-sm">
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