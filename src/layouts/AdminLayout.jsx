import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, Tags, ShoppingCart, Settings, Menu, X, ShoppingBasket } from "lucide-react";
import { cn } from "../lib/utils";

const links = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/categories", label: "Categories", icon: Tags },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const SidebarContent = () => (
    <>
      <div className="flex h-16 items-center gap-2 border-b border-line px-6 font-display text-lg font-semibold text-stone-50">
        <ShoppingBasket size={18} className="text-brass-400" />
        Alto Admin
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-stone-300 transition-colors hover:bg-ink-700 hover:text-stone-50",
                isActive && "bg-ink-700 text-stone-50"
              )
            }
          >
            <link.icon size={17} />
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-ink-700 px-3 py-4">
        <button className="flex w-full items-center gap-3 rounded-sm px-3 py-2.5 text-sm font-medium text-stone-300 hover:bg-ink-700 hover:text-stone-50">
          <Settings size={17} />
          Settings
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen bg-stone-100">
      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-ink lg:flex">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 flex h-full w-64 flex-col bg-ink animate-slide-up">
            <SidebarContent />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center gap-4 border-b border-line bg-stone-50 px-4 sm:px-6">
          <button className="text-ink lg:hidden" aria-label="Open sidebar" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="flex-1" />
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brass-500 text-sm font-medium text-stone-50">
            A
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
