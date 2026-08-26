// app/[slug]/page.tsx

type Product = {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  category: string;
};

async function getProductsBySlug(slug: string): Promise<Product[]> {
  try {
    const res = await fetch(
      `${process.env.ADMIN_API_URL}/api/admin/products?category=${slug}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    const json = await res.json();
    return json.data || [];
  } catch (err) {
    return [];
  }
}

export default async function CategoryProductsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";
  const products = await getProductsBySlug(slug);

  const categoryTitle = slug ? slug.replace(/-/g, " ") : "Collection";

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-8 lg:px-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize text-slate-900">
          {categoryTitle}
        </h1>
        <p className="mt-1 text-xs tracking-wider text-slate-500 uppercase">
          Displaying {products.length} Products
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-slate-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="mt-4">
                <h3 className="font-bold text-slate-800 text-sm">
                  {product.name}
                </h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-base font-extrabold text-slate-900">
                    ৳{product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-slate-400 line-through">
                      ৳{product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}