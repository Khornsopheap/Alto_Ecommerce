import { useState } from "react";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import StatusBadge from "../../components/StatusBadge";
import Dialog from "../../components/Dialog";
import { orders } from "../../data/mockData";
import { formatPrice } from "../../lib/utils";

const statuses = ["All", "Pending", "Completed", "Cancelled"];

export default function AdminOrders() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [viewing, setViewing] = useState(null);

  const filtered = orders.filter((o) => {
    const matchesQuery = o.customer.toLowerCase().includes(query.toLowerCase()) || o.id.includes(query);
    const matchesStatus = status === "All" || o.status === status;
    return matchesQuery && matchesStatus;
  });

  return (
    <div>
      <PageHeader eyebrow="Sales" title="Orders" description={`${orders.length} total orders`} />

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="max-w-sm flex-1">
          <SearchBar value={query} onChange={setQuery} placeholder="Search by customer or order..." />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 rounded-sm border border-line bg-stone-50 px-3 text-sm focus:border-brass-500 focus:outline-none"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>{s === "All" ? "Filter by status" : s}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-sm border border-line bg-stone-50">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-stone-100 text-left text-xs uppercase tracking-wide text-ink-500">
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Total</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-b border-line last:border-0">
                <td className="price px-4 py-3 font-medium text-ink">{o.id}</td>
                <td className="px-4 py-3 text-ink-500">{o.customer}</td>
                <td className="price px-4 py-3 text-ink">{formatPrice(o.total)}</td>
                <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
                <td className="px-4 py-3">
                  <button onClick={() => setViewing(o)} className="text-sm font-medium text-brass-600 hover:text-brass-700">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={!!viewing} onClose={() => setViewing(null)} title={`Order ${viewing?.id}`}>
        {viewing && (
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-ink-500">Customer</span><span className="font-medium text-ink">{viewing.customer}</span></div>
            <div className="flex justify-between"><span className="text-ink-500">Date</span><span className="text-ink">{viewing.date}</span></div>
            <div className="flex justify-between"><span className="text-ink-500">Items</span><span className="text-ink">{viewing.items}</span></div>
            <div className="flex justify-between"><span className="text-ink-500">Status</span><StatusBadge status={viewing.status} /></div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-semibold"><span>Total</span><span className="price">{formatPrice(viewing.total)}</span></div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
