import { Link } from "react-router-dom";
import { PackageOpen } from "lucide-react";
import PageHeader from "../components/PageHeader";
import StatusBadge from "../components/StatusBadge";
import EmptyState from "../components/EmptyState";
import Button from "../components/Button";
import { orders } from "../data/mockData";
import { formatPrice } from "../lib/utils";

export default function Orders() {
  return (
    <div className="container-page py-10">
      <PageHeader title="My Orders" description="Track and review your past orders" />

      {orders.length === 0 ? (
        <EmptyState
          icon={PackageOpen}
          title="No orders yet"
          description="When you place an order, it will show up here."
          action={
            <Button as={Link} to="/products" variant="accent">
              Start Shopping
            </Button>
          }
        />
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-sm border border-line sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-stone-100 text-left text-xs uppercase tracking-wide text-ink-500">
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Items</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-b border-line last:border-0">
                    <td className="price px-4 py-4 font-medium text-ink">{o.id}</td>
                    <td className="px-4 py-4 text-ink-500">{o.date}</td>
                    <td className="px-4 py-4 text-ink-500">{o.items}</td>
                    <td className="price px-4 py-4 font-medium text-ink">{formatPrice(o.total)}</td>
                    <td className="px-4 py-4">
                      <StatusBadge status={o.status} />
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button className="text-sm font-medium text-brass-600 hover:text-brass-700">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 sm:hidden">
            {orders.map((o) => (
              <div key={o.id} className="rounded-sm border border-line p-4">
                <div className="flex items-center justify-between">
                  <span className="price font-medium text-ink">{o.id}</span>
                  <StatusBadge status={o.status} />
                </div>
                <p className="mt-1 text-xs text-ink-500">{o.date} · {o.items} items</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="price text-sm font-medium text-ink">{formatPrice(o.total)}</span>
                  <button className="text-sm font-medium text-brass-600 hover:text-brass-700">View</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
