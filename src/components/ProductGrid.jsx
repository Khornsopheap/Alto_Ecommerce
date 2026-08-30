import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "./LoadingSkeleton";
import EmptyState from "./EmptyState";
import { PackageSearch } from "lucide-react";

export default function ProductGrid({ products, loading, onAddToCart, onToggleWishlist, wishlist = [] }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <EmptyState
        icon={PackageSearch}
        title="No products found"
        description="Try adjusting your search or filters to find what you're looking for."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          onAddToCart={onAddToCart}
          onToggleWishlist={onToggleWishlist}
          wished={wishlist.includes(p.id)}
        />
      ))}
    </div>
  );
}
