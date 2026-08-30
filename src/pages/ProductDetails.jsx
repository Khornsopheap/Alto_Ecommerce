import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import Rating from "../components/Rating";
import QuantitySelector from "../components/QuantitySelector";
import Button from "../components/Button";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/mockData";
import { formatPrice, cn } from "../lib/utils";
import { useCart } from "../context/CartContext";
import { useToast } from "../components/Toast";

const tabs = ["Description", "Specifications", "Reviews"];

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id) || products[0];
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");
  const { addItem } = useCart();
  const { showToast } = useToast();

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  function handleAddToCart() {
    addItem(product, qty);
    showToast(`${qty} × ${product.name} added to cart`);
  }

  return (
    <div className="container-page py-10">
      <nav className="mb-6 text-xs text-ink-300">
        <Link to="/" className="hover:text-ink-500">Home</Link> /{" "}
        <Link to="/products" className="hover:text-ink-500">Products</Link> /{" "}
        <span className="text-ink-500">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        {/* Images */}
        <div>
          <div className="aspect-square overflow-hidden rounded-sm border border-line bg-stone-100">
            <img src={product.images[activeImage]} alt={product.name} className="h-full w-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "h-16 w-16 overflow-hidden rounded-sm border-2",
                    activeImage === i ? "border-brass-500" : "border-transparent"
                  )}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-wide text-brass-600">{product.category}</p>
          <h1 className="mt-1 font-display text-3xl font-medium text-ink">{product.name}</h1>
          <div className="mt-2">
            <Rating value={product.rating} reviews={product.reviews} size={16} />
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="price text-3xl font-semibold text-ink">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="price text-lg text-ink-300 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-500">{product.description}</p>

          <p className={cn("mt-4 text-sm font-medium", product.stock > 0 ? "text-forest" : "text-rust")}>
            {product.stock > 0 ? `In Stock (${product.stock} available)` : "Out of Stock"}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <QuantitySelector value={qty} onChange={setQty} max={product.stock} />
            <Button variant="accent" size="lg" onClick={handleAddToCart} disabled={product.stock === 0} className="flex-1 sm:flex-none">
              Add to Cart
            </Button>
            <Button variant="outline" size="icon" aria-label="Add to wishlist">
              <Heart size={17} />
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-line pt-6 sm:grid-cols-3">
            <div className="flex items-center gap-2 text-xs text-ink-500">
              <Truck size={16} className="text-brass-500" /> Free shipping over $75
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-500">
              <RotateCcw size={16} className="text-brass-500" /> 30-day returns
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-500">
              <ShieldCheck size={16} className="text-brass-500" /> 2-year warranty
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-14">
        <div className="flex gap-6 border-b border-line">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "border-b-2 px-1 pb-3 text-sm font-medium transition-colors",
                activeTab === tab ? "border-brass-500 text-ink" : "border-transparent text-ink-300 hover:text-ink-500"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="py-6 text-sm leading-relaxed text-ink-500">
          {activeTab === "Description" && <p>{product.description} Designed for everyday use, built to last.</p>}
          {activeTab === "Specifications" && (
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <li>Category: {product.category}</li>
              <li>Stock: {product.stock} units</li>
              <li>SKU: {product.id.toUpperCase()}</li>
              <li>Rating: {product.rating} / 5</li>
            </ul>
          )}
          {activeTab === "Reviews" && <p>{product.reviews} customers have reviewed this product with an average rating of {product.rating} / 5.</p>}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-6 font-display text-2xl font-medium text-ink">Related Products</h2>
          <ProductGrid products={related} onAddToCart={(p) => { addItem(p, 1); showToast(`${p.name} added to cart`); }} />
        </div>
      )}
    </div>
  );
}
