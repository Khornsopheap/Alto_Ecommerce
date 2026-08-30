import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import { stats, orders, salesOverview } from "../../data/mockData";
import { formatPrice } from "../../lib/utils";

const cards = [
  { label: "Total Revenue", value: formatPrice(stats.revenue), icon: DollarSign },
  { label: "Orders", value: stats.orders, icon: ShoppingCart },
  { label: "Products", value: stats.products, icon: Package },
  { label: "Customers", value: stats.customers.toLocaleString(), icon: Users },
];

export default function Dashboard() {
  const max = Math.max(...salesOverview.map((s) => s.value));

  return (
    <div>
      <PageHeader eyebrow="Overview" title="Dashboard" description="Your store performance at a glance" />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-sm border border-line bg-stone-50 p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wide text-ink-500">{c.label}</p>
              <c.icon size={16} className="text-brass-500" />
            </div>
            <p className="price mt-2 text-2xl font-semibold text-ink">{c.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-sm border border-line bg-stone-50 p-6 lg:col-span-2">
          <h2 className="mb-6 font-display text-lg font-medium text-ink">Sales Overview</h2>
          <div className="flex h-48 items-end gap-3">
            {salesOverview.map((s) => (
              <div key={s.month} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-sm bg-brass-500 transition-all hover:bg-brass-600"
                  style={{ height: `${(s.value / max) * 100}%` }}
                  title={formatPrice(s.value)}
                />
                <span className="text-xs text-ink-500">{s.month}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-sm border border-line bg-stone-50 p-6">
          <h2 className="mb-4 font-display text-lg font-medium text-ink">Product Overview</h2>
          <ul className="space-y-3 text-sm">
            <li className="flex justify-between"><span className="text-ink-500">In stock</span><span className="price font-medium text-ink">112</span></li>
            <li className="flex justify-between"><span className="text-ink-500">Low stock</span><span className="price font-medium text-brass-600">9</span></li>
            <li className="flex justify-between"><span className="text-ink-500">Out of stock</span><span className="price font-medium text-rust">5</span></li>
            <li className="flex justify-between border-t border-line pt-3"><span className="text-ink-500">Total categories</span><span className="price font-medium text-ink">6</span></li>
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-sm border border-line bg-stone-50 p-6">
        <h2 className="mb-4 font-display text-lg font-medium text-ink">Recent Orders</h2>
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
              {orders.map((o) => (
                <tr key={o.id} className="border-b border-line last:border-0">
                  <td className="price px-3 py-3 font-medium text-ink">{o.id}</td>
                  <td className="px-3 py-3 text-ink-500">{o.customer}</td>
                  <td className="price px-3 py-3 text-ink">{formatPrice(o.total)}</td>
                  <td className="px-3 py-3"><StatusBadge status={o.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
