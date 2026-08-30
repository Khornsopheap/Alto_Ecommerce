import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, ShoppingBag, User, Menu, X, ShoppingBasket } from "lucide-react";
import { useCart } from "../context/CartContext";
import { cn } from "../lib/utils";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/products?category=electronics", label: "Categories" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const isLoggedIn = false; // wire up once auth exists

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-stone-50/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <button
            className="text-ink md:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={22} />
          </button>
          <Link to="/" className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
            <ShoppingBasket size={20} className="text-brass-500" />
            Alto
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    "relative rounded-sm px-3 py-2 text-sm font-medium text-ink-500 transition-colors hover:text-ink",
                    isActive && "text-ink after:absolute after:-bottom-[1px] after:left-3 after:right-3 after:h-[2px] after:bg-brass-500"
                  )
                }
                end={link.to === "/"}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="hidden max-w-sm flex-1 md:block">
          <div className="relative">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-300" />
            <input
              type="text"
              placeholder="Search products..."
              className="h-9 w-full rounded-full border border-line bg-stone-100 pl-9 pr-3 text-sm placeholder:text-ink-300 focus:border-brass-500 focus:outline-none focus:ring-1 focus:ring-brass-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-stone-100 md:hidden" aria-label="Search">
            <Search size={19} />
          </button>
          <Link
            to="/cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-stone-100"
            aria-label={`Cart, ${itemCount} items`}
          >
            <ShoppingBag size={19} />
            {itemCount > 0 && (
              <span className="price absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brass-500 px-1 text-[10px] font-semibold text-stone-50">
                {itemCount}
              </span>
            )}
          </Link>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen((v) => !v)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink-500 hover:bg-stone-100"
              aria-label="Account menu"
            >
              <User size={19} />
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 top-11 w-48 rounded-sm border border-line bg-stone-50 py-1 shadow-card animate-fade-in">
                {isLoggedIn ? (
                  <>
                    <Link to="/orders" className="block px-4 py-2 text-sm text-ink hover:bg-stone-100" onClick={() => setUserMenuOpen(false)}>
                      My Orders
                    </Link>
                    <Link to="/admin/dashboard" className="block px-4 py-2 text-sm text-ink hover:bg-stone-100" onClick={() => setUserMenuOpen(false)}>
                      Admin
                    </Link>
                    <button className="block w-full px-4 py-2 text-left text-sm text-rust hover:bg-stone-100">Sign out</button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm font-medium text-ink hover:bg-stone-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-ink/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 animate-slide-up bg-stone-50 p-6 shadow-card">
            <div className="mb-6 flex items-center justify-between">
              <span className="font-display text-lg font-semibold">Alto</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X size={20} />
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="rounded-sm px-3 py-2.5 text-sm font-medium text-ink hover:bg-stone-100"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/login" className="rounded-sm px-3 py-2.5 text-sm font-medium text-ink hover:bg-stone-100" onClick={() => setMobileOpen(false)}>
                Sign in
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
