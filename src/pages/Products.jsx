import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import PageHeader from "../components/PageHeader";
import SearchBar from "../components/SearchBar";
import ProductGrid from "../components/ProductGrid";
import Button from "../components/Button";
import { products, categories } from "../data/mockData";
import { useCart } from "../context/CartContext";
import { useToast } from "../components/Toast";

const PAGE_SIZE = 8;

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [query, category, priceRange, sortBy]);

  const filtered = useMemo(() => {
    let list = [...products];
    if (category !== "all") {
      list = list.filter((p) => p.category.toLowerCase() === category);
    }
    if (query) {
      list = list.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    }
    if (priceRange !== "all") {
      const [min, max] = priceRange.split("-").map(Number);
      list = list.filter((p) => p.price >= min && (max ? p.price <= max : true));
    }
    if (sortBy === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, category, priceRange, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageItems = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleAddToCart(product) {
    addItem(product, 1);
    showToast(`${product.name} added to cart`);
  }

  function handleCategoryChange(value) {
    setCategory(value);
    setSearchParams(value === "all" ? {} : { category: value });
  }

  return (
    <div className="container-page py-10">
      <PageHeader eyebrow="Catalog" title="Products" description={`${filtered.length} products available`} />

      <div className="mb-6 flex flex-col gap-3">
        <SearchBar value={query} onChange={setQuery} />
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-sm text-ink-500">
            <SlidersHorizontal size={14} />
            Filters:
          </div>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="h-9 rounded-sm border border-line bg-stone-50 px-3 text-sm focus:border-brass-500 focus:outline-none"
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="h-9 rounded-sm border border-line bg-stone-50 px-3 text-sm focus:border-brass-500 focus:outline-none"
          >
            <option value="all">Any Price</option>
            <option value="0-50">Under $50</option>
            <option value="50-150">$50 – $150</option>
            <option value="150-500">$150 – $500</option>
            <option value="500-100000">$500+</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-9 rounded-sm border border-line bg-stone-50 px-3 text-sm focus:border-brass-500 focus:outline-none"
          >
            <option value="featured">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <ProductGrid products={pageItems} loading={loading} onAddToCart={handleAddToCart} />

      {!loading && totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <span className="price px-2 text-sm text-ink-500">
            {page} / {totalPages}
          </span>
          <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
