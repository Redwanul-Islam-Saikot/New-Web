"use client";

import { useEffect, useState } from "react";

type Product = {
  _id: string;
  name: string;
  price: string;
  image: string;
  status: string;
};

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(function () {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:3000/api/admin/new-arrivals", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            Pragma: "no-cache",
          },
        });

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const json = await res.json();
          if (json.success && json.data) {
            const activeProducts = json.data.filter(function (p: Product) {
              return p.status === "active";
            });
            setProducts(activeProducts);
          }
        }
      } catch (err) {
        console.error("CORS or Connection Error from Admin Port:", err);
      }
    }

    fetchProducts();
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-8 sm:py-16 lg:px-16">
      <div className="mx-auto mb-8 flex max-w-2xl flex-col items-center gap-2 text-center sm:mb-12">
        <p className="text-base capitalize text-black sm:text-lg">New Arrivals</p>
        <h2 className="text-2xl font-normal uppercase leading-tight text-black sm:text-4xl md:text-5xl">
          The Latest Styles You&apos;ll Love.
        </h2>
      </div>

      <div className="mx-auto grid max-w-[1312px] grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
        {products.map(function (product) {
          return (
            <div
              key={product._id}
              className="relative aspect-[319/484] w-full overflow-hidden bg-cover bg-center"
              style={{ backgroundImage: "url(" + product.image + ")" }}
            >
              <div className="absolute bottom-2 left-1/2 flex w-[92%] -translate-x-1/2 items-center justify-between gap-2 bg-white px-2.5 py-2 sm:bottom-3 sm:gap-3 sm:px-3 sm:py-2.5">
                <div className="flex min-w-0 flex-col gap-0.5 sm:gap-1">
                  <h3 className="truncate text-[10px] font-medium capitalize text-black sm:text-xs">
                    {product.name}
                  </h3>
                  <span className="text-[11px] font-semibold capitalize text-black/50 sm:text-sm">
                    {product.price}
                  </span>
                </div>

                <button
                  aria-label={"Add " + product.name + " to cart"}
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-black/10 bg-white transition hover:bg-black/5 sm:h-10 sm:w-10"
                >
                  <svg
                    className="h-3.5 w-3.5 text-black sm:h-[18px] sm:w-[18px]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 7h12l-1 13a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L6 7Z" />
                    <path d="M9 7V5a3 3 0 0 1 6 0v2" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center sm:mt-12">
        <button className="rounded-lg bg-[#5A0C3D] px-6 py-3 text-base font-semibold capitalize text-white transition hover:bg-[#4a0a32] sm:px-8 sm:py-3.5 sm:text-lg">
          View All New Products
        </button>
      </div>
    </section>
  );
}