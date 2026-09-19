import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Rating from "./Rating";
import { formatPrice, cn } from "../lib/utils";

export default function ProductCard({ product, onAddToCart, onToggleWishlist, wished = false }) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="group relative flex flex-col overflow-hidden rounded-sm border border-line bg-stone-50 transition-shadow hover:shadow-card"
    >
      <Link to={`/products/${product.id}`} className="relative block aspect-square overflow-hidden bg-stone-200">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
        />
        {discount && (
          <span className="price absolute bottom-2 right-2 rounded-sm bg-ink px-2 py-1 text-xs font-medium text-stone-50">
            -{discount}%
          </span>
        )}
      </Link>
      <button
        aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => onToggleWishlist?.(product)}
        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-stone-50/90 text-ink-500 backdrop-blur transition-colors hover:text-rust"
      >
        <Heart size={16} className={cn(wished && "fill-rust text-rust")} />
      </button>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <p className="text-xs uppercase tracking-wide text-ink-300">{product.category}</p>
        <Link to={`/products/${product.id}`} className="line-clamp-1 font-medium text-ink hover:text-brass-600">
          {product.name}
        </Link>
        <Rating value={product.rating} reviews={product.reviews} />
        <div className="mt-1 flex items-baseline gap-2">
          <span className="price text-base font-semibold text-ink">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="price text-sm text-ink-300 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={() => onAddToCart?.(product)}
          className="mt-2 flex h-10 w-full items-center justify-center gap-2 rounded-sm bg-ink text-sm font-medium text-stone-50 transition-colors hover:bg-brass-600"
        >
          <ShoppingBag size={15} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}
