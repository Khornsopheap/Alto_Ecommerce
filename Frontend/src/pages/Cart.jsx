import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import PageHeader from "../components/PageHeader";
import QuantitySelector from "../components/QuantitySelector";
import Button from "../components/Button";
import EmptyState from "../components/EmptyState";
import { formatPrice } from "../lib/utils";
import { useCart } from "../context/CartContext";

const SHIPPING = 10;

export default function Cart() {
  const { items, updateQty, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page py-16">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Start exploring our products."
          action={
            <Button as={Link} to="/products" variant="accent">
              Continue Shopping
            </Button>
          }
        />
      </div>
    );
  }

  const total = subtotal + SHIPPING;

  return (
    <div className="container-page py-10">
      <PageHeader title="Shopping Cart" description={`${items.length} item${items.length > 1 ? "s" : ""} in your cart`} />

      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* Desktop table */}
          <div className="hidden overflow-x-auto rounded-sm border border-line sm:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-line bg-stone-100 text-left text-xs uppercase tracking-wide text-ink-500">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Qty</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b border-line last:border-0">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="h-14 w-14 rounded-sm object-cover" />
                        <span className="font-medium text-ink">{item.name}</span>
                      </div>
                    </td>
                    <td className="price px-4 py-4 text-ink-500">{formatPrice(item.price)}</td>
                    <td className="px-4 py-4">
                      <QuantitySelector value={item.qty} onChange={(v) => updateQty(item.id, v)} />
                    </td>
                    <td className="price px-4 py-4 font-medium text-ink">{formatPrice(item.price * item.qty)}</td>
                    <td className="px-4 py-4">
                      <button aria-label="Remove item" onClick={() => removeItem(item.id)} className="text-ink-300 hover:text-rust">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 sm:hidden">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 rounded-sm border border-line p-3">
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-sm object-cover" />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <p className="text-sm font-medium text-ink">{item.name}</p>
                    <button aria-label="Remove item" onClick={() => removeItem(item.id)} className="text-ink-300 hover:text-rust">
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <p className="price mt-1 text-sm text-ink-500">{formatPrice(item.price)}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <QuantitySelector value={item.qty} onChange={(v) => updateQty(item.id, v)} />
                    <span className="price text-sm font-medium text-ink">{formatPrice(item.price * item.qty)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button as={Link} to="/products" variant="outline" className="mt-6">
            Continue Shopping
          </Button>
        </div>

        {/* Summary */}
        <div className="h-fit rounded-sm border border-line bg-stone-100 p-6">
          <h2 className="font-display text-lg font-medium text-ink">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-ink-500">
              <span>Subtotal</span>
              <span className="price">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-500">
              <span>Shipping</span>
              <span className="price">{formatPrice(SHIPPING)}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-2 text-base font-semibold text-ink">
              <span>Total</span>
              <span className="price">{formatPrice(total)}</span>
            </div>
          </div>
          <Button as={Link} to="/checkout" variant="accent" size="lg" className="mt-6 w-full">
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}
