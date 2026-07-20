type SplitBannerData = {
  _id: string;
  title: string;
  subtitle: string;
  linkUrl: string;
  imageUrl: string;
  position: number; // 1 = left, 2 = right
};

// প্রতিবার fresh ডেটা আনবে, cache করবে না
export const revalidate = 0;

async function getSplitBanners(): Promise<SplitBannerData[]> {
  try {
    const res = await fetch(
      `${process.env.ADMIN_API_URL}/api/admin/split-banners`,
      { cache: "no-store" }
    );

    if (!res.ok) return [];

    const json = await res.json();
    if (!json.success || !Array.isArray(json.data)) return [];

    return json.data;
  } catch (err) {
    console.error("Failed to fetch split banners:", err);
    return [];
  }
}

export default async function TwoColumnCallout() {
  const banners = await getSplitBanners();

  // admin panel-এ কোনো ব্যানার সেট না থাকলে সেকশনটাই hide থাকবে
  if (banners.length === 0) return null;

  // position 1 বামে, position 2 ডানে বসবে
  const sorted = [...banners].sort((a, b) => a.position - b.position);

  return (
    <section className="flex w-full flex-col bg-white sm:flex-row">
      {sorted.map((col) => (
        <a
          key={col._id}
          href={col.linkUrl || "#"}
          className="group relative flex h-[440px] w-full items-end overflow-hidden bg-cover bg-center p-6 sm:h-[480px] sm:w-1/2 sm:p-8 lg:h-[600px] lg:p-12"
          style={{ backgroundImage: `url(${col.imageUrl})` }}
        >
          {/* Gradient overlay — dark fade from bottom, matches Figma spec */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/95" />

          {/* Content */}
          <div className="relative z-10 flex max-w-md flex-col items-start gap-4 sm:gap-6">
            <div className="flex flex-col items-start gap-2 sm:gap-3">
              {col.subtitle && (
                <p className="text-xs uppercase tracking-wide text-white sm:text-sm">
                  {col.subtitle}
                </p>
              )}
              <h3 className="text-2xl font-semibold capitalize leading-[1.2] tracking-tight text-white sm:text-3xl lg:text-[44px]">
                {col.title}
              </h3>
            </div>

            <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-semibold capitalize text-[#5A0C3D] transition-transform duration-200 group-hover:translate-x-1 sm:px-5 sm:py-3 sm:text-base">
              Discover More
            </span>
          </div>
        </a>
      ))}
    </section>
  );
}