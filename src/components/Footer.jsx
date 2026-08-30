import { Link } from "react-router-dom";
import { AtSign, MessageCircle, Rss, ShoppingBasket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-stone-100">
      <div className="container-page grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
        <div className="col-span-2 sm:col-span-1">
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
            <ShoppingBasket size={18} className="text-brass-500" />
            Alto
          </Link>
          <p className="mt-3 max-w-[220px] text-sm text-ink-500">
            Considered products for everyday life, shipped from a small team who cares about the details.
          </p>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-ink">Shop</p>
          <ul className="space-y-2 text-sm text-ink-500">
            <li><Link to="/products" className="hover:text-ink">All Products</Link></li>
            <li><Link to="/products?category=electronics" className="hover:text-ink">Categories</Link></li>
            <li><Link to="/orders" className="hover:text-ink">My Orders</Link></li>
            <li><a href="#" className="hover:text-ink">Contact</a></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-ink">Customer Service</p>
          <ul className="space-y-2 text-sm text-ink-500">
            <li><a href="#" className="hover:text-ink">Shipping</a></li>
            <li><a href="#" className="hover:text-ink">Returns</a></li>
            <li><a href="#" className="hover:text-ink">FAQ</a></li>
            <li><a href="#" className="hover:text-ink">Size Guide</a></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-medium text-ink">Follow Us</p>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-500 hover:border-brass-500 hover:text-brass-600">
              <AtSign size={15} />
            </a>
            <a href="#" aria-label="Threads" className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-500 hover:border-brass-500 hover:text-brass-600">
              <MessageCircle size={15} />
            </a>
            <a href="#" aria-label="Blog" className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink-500 hover:border-brass-500 hover:text-brass-600">
              <Rss size={15} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line py-4">
        <p className="container-page text-xs text-ink-300">© 2026 Alto. All rights reserved.</p>
      </div>
    </footer>
  );
}
