import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { ProductCardSkeleton } from "./LoadingSkeleton";
import EmptyState from "./EmptyState";
import { PackageSearch } from "lucide-react";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

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
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {products.map((p) => (
        <motion.div key={p.id} variants={item}>
          <ProductCard
            product={p}
            onAddToCart={onAddToCart}
            onToggleWishlist={onToggleWishlist}
            wished={wishlist.includes(p.id)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
