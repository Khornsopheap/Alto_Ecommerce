import { useEffect, useState } from "react";
import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import api from "../../lib/api";
import { formatPrice } from "../../lib/utils";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [productOverview, setProductOverview] = useState(null);
  const [salesOverview, setSalesOverview] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/dashboard/stats")
      .then((res) => {
        setStats(res.data.stats);
        setProductOverview(res.data.productOverview);
        setSalesOverview(res.data.salesOverview);
        setRecentOrders(res.data.recentOrders);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) return null;

  const cards = [
    { label: "Total Revenue", value: formatPrice(stats.revenue), icon: DollarSign },
    { label: "Orders", value: stats.orders, icon: ShoppingCart },
    { label: "Products", value: stats.products, icon: Package },
    { label: "Customers", value: stats.customers, icon: Users },
  ];

  const max = Math.max(1, ...salesOverview.map((s) => s.value));

  return (
    <div>
      <PageHeader eyebrow="Overview" title="Dashboard" description="Your store performance at a glance" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-sm border border-line bg-stone-50 p-5"
          >
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{c.label}</p>
              <c.icon size={16} className="text-brass-500" />
            </div>
            <p className="price mt-2 text-2xl font-semibold text-ink">{c.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-sm border border-line bg-stone-50 p-6 lg:col-span-2">
          <h2 className="mb-6 font-display text-lg font-medium text-ink">Sales Overview</h2>
          {salesOverview.length === 0 ? (
            <p className="text-sm text-ink-500">No orders yet — this chart fills in as orders come in.</p>
          ) : (
            <div className="flex h-48 items-end gap-3">
              {salesOverview.map((s) => (
                <div key={s.month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className="w-full rounded-t-sm bg-brass-500"
                      style={{ height: `${(s.value / max) * 100}%` }}
                      title={formatPrice(s.value)}
                    />
                  </div>
                  <span className="text-xs text-ink-500">{s.month}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-sm border border-line bg-stone-50 p-6">
          <h2 className="mb-4 font-display text-lg font-medium text-ink">Product Overview</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between"><span className="text-ink-500">In stock</span><span className="price font-medium text-ink">{productOverview.inStock}</span></li>
            <li className="flex justify-between"><span className="text-ink-500">Low stock</span><span className="price font-medium text-brass-600">{productOverview.lowStock}</span></li>
            <li className="flex justify-between"><span className="text-ink-500">Out of stock</span><span className="price font-medium text-rust">{productOverview.outOfStock}</span></li>
            <li className="flex justify-between border-t border-line pt-3"><span className="text-ink-500">Total categories</span><span className="price font-medium text-ink">{productOverview.totalCategories}</span></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-sm border border-line bg-stone-50 p-6">
        <h2 className="mb-4 font-display text-lg font-medium text-ink">Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <p className="text-sm text-ink-500">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-500">
                  <th className="px-3 py-2 font-medium">Order</th>
                  <th className="px-3 py-2 font-medium">Customer</th>
                  <th className="px-3 py-2 font-medium">Total</th>
                  <th className="px-3 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-line last:border-0">
                    <td className="price px-3 py-3 font-medium text-ink">{o.id.slice(-6).toUpperCase()}</td>
                    <td className="px-3 py-3 text-ink-500">{o.shipping_address?.full_name}</td>
                    <td className="price px-3 py-3 text-ink">{formatPrice(o.total)}</td>
                    <td className="px-3 py-3"><StatusBadge status={o.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
