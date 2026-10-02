import { useParams, Link } from "react-router-dom";
import { Heart, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";

import Rating from "../components/Rating";
import QuantitySelector from "../components/QuantitySelector";
import Button from "../components/Button";
import ProductGrid from "../components/ProductGrid";

import api, { resolveImage } from "../lib/api";
import { formatPrice, cn } from "../lib/utils";
import { useCart } from "../context/CartContext";
import { useToast } from "../components/Toast";

const tabs = ["Description", "Specifications", "Reviews"];

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState("Description");

  const { addItem } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        console.log("Loading product:", id);

        const response = await api.get(`/products/${id}`);

        console.log("Product from backend:", response.data);

        setProduct(response.data);
      } catch (err) {
        console.error("Failed to load product:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load product."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  function handleAddToCart() {
    if (!product) return;

    addItem(product, qty);
    showToast(`${qty} × ${product.name} added to cart`);
  }

  // --------------------------------
  // LOADING
  // --------------------------------
  if (loading) {
    return (
      <div className="container-page py-10">
        <p className="text-sm text-ink-500">
          Loading product...
        </p>
      </div>
    );
  }

  // --------------------------------
  // ERROR / NOT FOUND
  // --------------------------------
  if (error || !product) {
    return (
      <div className="container-page py-10">
        <p className="text-sm text-rust">
          {error || "Product not found."}
        </p>

        <Link
          to="/products"
          className="mt-4 inline-block text-sm text-brass-600"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  // --------------------------------
  // REAL DATABASE PRODUCT
  // --------------------------------

  const categoryName =
    product.category?.name ||
    product.category_name ||
    "Uncategorized";

  return (
    <div className="container-page py-10">

      {/* Breadcrumb */}
      <nav className="mb-6 text-xs text-ink-300">
        <Link
          to="/"
          className="hover:text-ink-500"
        >
          Home
        </Link>{" "}
        /{" "}
        <Link
          to="/products"
          className="hover:text-ink-500"
        >
          Products
        </Link>{" "}
        /{" "}
        <span className="text-ink-500">
          {product.name}
        </span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">

        {/* =========================
            IMAGE
        ========================= */}
        <div>
          <div className="aspect-square overflow-hidden rounded-sm border border-line bg-stone-100">

            {product.image ? (
              <img
                src={resolveImage(product.image)}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-ink-300">
                No image available
              </div>
            )}

          </div>
        </div>

        {/* =========================
            PRODUCT INFO
        ========================= */}
        <div>

          <p className="text-xs uppercase tracking-wide text-brass-600">
            {categoryName}
          </p>

          <h1 className="mt-1 font-display text-3xl font-medium text-ink">
            {product.name}
          </h1>

          <div className="mt-2">
            <Rating
              value={product.rating || 0}
              reviews={product.reviews || 0}
              size={16}
            />
          </div>

          {/* Price */}
          <div className="mt-4 flex items-baseline gap-3">

            <span className="price text-3xl font-semibold text-ink">
              {formatPrice(product.price)}
            </span>

            {product.originalPrice && (
              <span className="price text-lg text-ink-300 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}

          </div>

          {/* Description */}
          <p className="mt-4 text-sm leading-relaxed text-ink-500">
            {product.description || "No description available."}
          </p>

          {/* Stock */}
          <p
            className={cn(
              "mt-4 text-sm font-medium",
              Number(product.stock) > 0
                ? "text-forest"
                : "text-rust"
            )}
          >
            {Number(product.stock) > 0
              ? `In Stock (${product.stock} available)`
              : "Out of Stock"}
          </p>

          {/* Cart */}
          <div className="mt-6 flex flex-wrap items-center gap-3">

            <QuantitySelector
              value={qty}
              onChange={setQty}
              max={product.stock}
            />

            <Button
              variant="accent"
              size="lg"
              onClick={handleAddToCart}
              disabled={Number(product.stock) === 0}
              className="flex-1 sm:flex-none"
            >
              Add to Cart
            </Button>

            <Button
              variant="outline"
              size="icon"
              aria-label="Add to wishlist"
            >
              <Heart size={17} />
            </Button>

          </div>

          {/* Shipping */}
          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-line pt-6 sm:grid-cols-3">

            <div className="flex items-center gap-2 text-xs text-ink-500">
              <Truck
                size={16}
                className="text-brass-500"
              />
              Free shipping over $75
            </div>

            <div className="flex items-center gap-2 text-xs text-ink-500">
              <RotateCcw
                size={16}
                className="text-brass-500"
              />
              30-day returns
            </div>

            <div className="flex items-center gap-2 text-xs text-ink-500">
              <ShieldCheck
                size={16}
                className="text-brass-500"
              />
              2-year warranty
            </div>

          </div>
        </div>
      </div>

      {/* =========================
          TABS
      ========================= */}
      <div className="mt-14">

        <div className="flex gap-6 border-b border-line">

          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "border-b-2 px-1 pb-3 text-sm font-medium transition-colors",
                activeTab === tab
                  ? "border-brass-500 text-ink"
                  : "border-transparent text-ink-300 hover:text-ink-500"
              )}
            >
              {tab}
            </button>
          ))}

        </div>

        <div className="py-6 text-sm leading-relaxed text-ink-500">

          {activeTab === "Description" && (
            <p>
              {product.description ||
                "No description available."}
            </p>
          )}

          {activeTab === "Specifications" && (
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">

              <li>
                Category: {categoryName}
              </li>

              <li>
                Stock: {product.stock} units
              </li>

              <li>
                SKU: {product.id}
              </li>

              <li>
                Rating: {product.rating || 0} / 5
              </li>

            </ul>
          )}

          {activeTab === "Reviews" && (
            <p>
              {product.reviews || 0} customers have
              reviewed this product with an average
              rating of {product.rating || 0} / 5.
            </p>
          )}

        </div>
      </div>

    </div>
  );
}