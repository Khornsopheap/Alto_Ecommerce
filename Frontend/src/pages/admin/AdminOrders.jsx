import { useEffect, useState } from "react";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import StatusBadge from "../../components/StatusBadge";
import Dialog from "../../components/Dialog";
import Button from "../../components/Button";
import api from "../../lib/api";
import { formatPrice } from "../../lib/utils";
import { useToast } from "../../components/Toast";

const statuses = ["All", "Pending", "Completed", "Cancelled"];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [viewing, setViewing] = useState(null);
  const { showToast } = useToast();

  function loadOrders() {
    api.get("/admin/orders").then((res) => setOrders(res.data));
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const filtered = orders.filter((o) => {
    const matchesQuery =
      o.shipping_address?.full_name?.toLowerCase().includes(query.toLowerCase()) ||
      o.id.includes(query);
    const matchesStatus = status === "All" || o.status === status;
    return matchesQuery && matchesStatus;
  });

  async function handleStatusChange(newStatus) {
    try {
      await api.put(`/admin/orders/${viewing.id}`, { status: newStatus });
      showToast("Order status updated");
      loadOrders();
      setViewing((v) => ({ ...v, status: newStatus }));
    } catch (err) {
      showToast("Failed to update status.");
    }
  }

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
                <td className="price px-4 py-3 font-medium text-ink">{o.id.slice(-6).toUpperCase()}</td>
                <td className="px-4 py-3 text-ink-500">{o.shipping_address?.full_name}</td>
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

      <Dialog open={!!viewing} onClose={() => setViewing(null)} title={`Order ${viewing?.id?.slice(-6).toUpperCase()}`}>
        {viewing && (
          <div className="space-y-4 text-sm">
            <div className="space-y-2">
              {viewing.items.map((item, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-ink-500">{item.name} × {item.qty}</span>
                  <span className="price">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base font-semibold">
              <span>Total</span>
              <span className="price">{formatPrice(viewing.total)}</span>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-ink-700">Status</label>
              <select
                value={viewing.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                className="h-11 w-full rounded-sm border border-line bg-stone-50 px-3.5 text-sm focus:border-brass-500 focus:outline-none"
              >
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
