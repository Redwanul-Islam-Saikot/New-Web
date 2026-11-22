"use client";

import Link from "next/link";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";
import { useCartStore } from "../store/useCartStore";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist, wishlistCount } = useWishlist();
  const addToCart = useCartStore((state) => state.addToCart);

  // কার্টে যুক্ত করার হ্যান্ডলার
  const handleAddToCart = (product: any) => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.imageUrl || "/placeholder.jpg",
      quantity: 1,
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] py-10 px-4 sm:px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#1a1a1a] sm:text-3xl">
              My Wishlist
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Your saved items ({wishlistCount})
            </p>
          </div>

          {wishlistCount > 0 && (
            <button
              onClick={clearWishlist}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 transition hover:text-red-700 sm:text-sm"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {wishlistCount === 0 ? (
          <div className="my-16 flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center shadow-xs">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#4a0e35]/10 text-[#4a0e35]">
              <Heart className="h-8 w-8 stroke-[1.5]" />
            </div>
            <h2 className="mt-4 text-lg font-bold text-gray-800">
              Your wishlist is empty
            </h2>
            <p className="mt-1 max-w-sm text-sm text-gray-500">
              Save items you love to view or purchase them later!
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#4a0e35] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#380a28]"
            >
              <span>Explore Products</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-6">
            {wishlist.map((product) => (
              <div
                key={product._id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 bg-white p-3 shadow-xs transition hover:shadow-md"
              >
                {/* Product Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-gray-100">
                  <img
                    src={product.imageUrl || "/placeholder.jpg"}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                  />

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(product._id)}
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-sm backdrop-blur-md transition hover:bg-red-50 hover:text-red-600"
                    title="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Info & Action */}
                <div className="mt-3 flex flex-1 flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-semibold text-gray-800 line-clamp-1 sm:text-sm">
                      {product.name}
                    </h3>

                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-sm font-bold text-gray-900 sm:text-base">
                        ৳{product.discountPrice || product.price}
                      </span>
                      {product.discountPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ৳{product.price}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-[#4a0e35] py-2 text-xs font-semibold text-white transition hover:bg-[#380a28]"
                  >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}