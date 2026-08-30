import { Link } from "react-router-dom";
import { ArrowRight, Mail } from "lucide-react";
import CategoryCard from "../components/CategoryCard";
import ProductGrid from "../components/ProductGrid";
import Button from "../components/Button";
import { categories, products } from "../data/mockData";
import { useCart } from "../context/CartContext";
import { useToast } from "../components/Toast";

export default function Home() {
  const { addItem } = useCart();
  const { showToast } = useToast();
  const featured = products.slice(0, 4);

  function handleAddToCart(product) {
    addItem(product, 1);
    showToast(`${product.name} added to cart`);
  }

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-line bg-stone-100">
        <div className="container-page grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div className="max-w-lg">
            <p className="mb-3 text-xs font-medium uppercase tracking-wider text-brass-600">New season, considered picks</p>
            <h1 className="font-display text-4xl font-medium leading-[1.1] text-ink sm:text-5xl">
              Discover products <br /> you'll love
            </h1>
            <p className="mt-4 text-base text-ink-500">
              Quality goods, honest prices, and a shopping experience that gets out of your way.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button as={Link} to="/products" size="lg" variant="accent">
                Shop Now <ArrowRight size={16} />
              </Button>
              <Button as={Link} to="/products" size="lg" variant="outline">
                Explore Categories
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-sm lg:aspect-square">
            <img
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1000&q=80"
              alt="Curated product display"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container-page py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-medium text-ink">Shop by Category</h2>
          <Link to="/products" className="text-sm font-medium text-brass-600 hover:text-brass-700">
            View all
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="container-page py-14">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-2xl font-medium text-ink">Featured Products</h2>
          <Link to="/products" className="text-sm font-medium text-brass-600 hover:text-brass-700">
            View all
          </Link>
        </div>
        <ProductGrid products={featured} onAddToCart={handleAddToCart} />
      </section>

      {/* Promo banner */}
      <section className="container-page pb-14">
        <div className="relative overflow-hidden rounded-sm bg-ink px-8 py-16 text-center sm:py-20">
          <div className="absolute inset-0 opacity-30">
            <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&q=60" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-medium uppercase tracking-wider text-brass-200">Limited time</p>
            <h2 className="mt-2 font-display text-3xl font-medium text-stone-50 sm:text-4xl">Summer Collection</h2>
            <p className="mt-2 text-lg text-stone-200">Up to 30% off select items</p>
            <Button as={Link} to="/products" variant="accent" size="lg" className="mt-6">
              Shop Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="border-t border-line bg-stone-100">
        <div className="container-page flex flex-col items-center gap-4 py-14 text-center">
          <Mail size={22} className="text-brass-500" />
          <h2 className="font-display text-2xl font-medium text-ink">Stay in the loop</h2>
          <p className="max-w-md text-sm text-ink-500">Get updates about new products and special offers.</p>
          <form
            className="mt-2 flex w-full max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              showToast("Subscribed! Check your inbox soon.");
            }}
          >
            <input
              type="email"
              required
              placeholder="Email address"
              className="h-11 w-full rounded-sm border border-line bg-stone-50 px-3.5 text-sm focus:border-brass-500 focus:outline-none focus:ring-1 focus:ring-brass-500"
            />
            <Button type="submit" variant="primary">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
