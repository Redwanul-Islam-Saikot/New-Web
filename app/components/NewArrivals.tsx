"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ArrivalItem = {
  _id: string;
  name: string;
  price: string;
  image: string;
  status: string;
};

export default function NewArrivals() {
  const [products, setProducts] = useState<ArrivalItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        const baseUrl = (process.env.NEXT_PUBLIC_ADMIN_API_URL || "").replace(/\/$/, "");
        const endpoint = baseUrl ? `${baseUrl}/api/admin/new-arrivals` : "/api/admin/new-arrivals";

        const res = await fetch(endpoint, {
          cache: "no-store",
        });

        if (!res.ok) throw new Error("Failed to fetch new arrivals");

        const json = await res.json();
        if (json.success && Array.isArray(json.data) && isMounted) {
          // শুধু Active প্রোডাক্টগুলো ফিল্টার করা
          const activeItems = json.data.filter(
            (item: ArrivalItem) => item.status === "active"
          );
          setProducts(activeItems);
        }
      } catch (err) {
        console.error("Failed to fetch new arrivals:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-white px-4 py-12 sm:px-8 lg:px-16">
        <div className="mx-auto max-w-[1312px] text-center text-sm text-slate-500">
          Loading New Arrivals...
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="w-full bg-white px-4 py-12 sm:px-8 sm:py-16 lg:px-16">
      {/* Header */}
      <div className="mx-auto mb-8 flex max-w-[610px] flex-col items-center gap-2 text-center sm:mb-12">
        <p className="text-base capitalize text-black sm:text-lg">
          Just In
        </p>
        <h2 className="text-2xl font-normal uppercase leading-tight text-black sm:text-4xl md:text-5xl">
          New Arrivals
        </h2>
      </div>

      {/* Product Grid */}
      <div className="mx-auto grid max-w-[1312px] grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {products.map((p) => (
          <article key={p._id} className="group flex w-full flex-col overflow-hidden">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-100">
              <img
                src={p.image}
                alt={p.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-800 shadow-md transition hover:bg-slate-100 cursor-pointer">
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
                <Link
                  href={`/product/${p._id}`}
                  className="block text-center w-full rounded-lg bg-white/95 py-2.5 text-xs font-bold text-slate-900 shadow transition hover:bg-white"
                >
                  View Details
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-1 pt-3">
              <h3 className="line-clamp-1 text-xs font-semibold text-slate-800 sm:text-sm">
                {p.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold text-slate-900">
                  {p.price}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}