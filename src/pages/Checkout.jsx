import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import Input from "../components/Input";
import Button from "../components/Button";
import { formatPrice, cn } from "../lib/utils";
import { useCart } from "../context/CartContext";
import { useToast } from "../components/Toast";

const SHIPPING = 10;

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [payment, setPayment] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const total = subtotal + SHIPPING;

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      clearCart();
      showToast("Order placed successfully");
      navigate("/orders");
    }, 900);
  }

  return (
    <div className="container-page py-10">
      <PageHeader title="Checkout" description="Complete your order" />

      <form onSubmit={handleSubmit} className="grid gap-10 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section>
            <h2 className="mb-4 font-display text-lg font-medium text-ink">Customer Information</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input id="fullName" label="Full Name" placeholder="Jane Doe" required />
              <Input id="email" type="email" label="Email" placeholder="jane@example.com" required />
              <Input id="phone" label="Phone" placeholder="+855 12 345 678" className="sm:col-span-2" required />
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-lg font-medium text-ink">Shipping Address</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Input id="address" label="Address" placeholder="Street address" className="sm:col-span-2" required />
              <Input id="city" label="City" placeholder="Phnom Penh" required />
              <Input id="country" label="Country" placeholder="Cambodia" required />
              <Input id="postal" label="Postal Code" placeholder="12000" className="sm:col-span-2" required />
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-display text-lg font-medium text-ink">Payment</h2>
            <label
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-sm border p-4 text-sm font-medium",
                payment === "cod" ? "border-brass-500 bg-brass-50" : "border-line"
              )}
            >
              <input type="radio" name="payment" checked={payment === "cod"} onChange={() => setPayment("cod")} className="accent-brass-500" />
              Cash on Delivery
            </label>
          </section>
        </div>

        {/* Order Summary */}
        <div className="h-fit rounded-sm border border-line bg-stone-100 p-6">
          <h2 className="font-display text-lg font-medium text-ink">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-ink-500">
                <span>{item.name} × {item.qty}</span>
                <span className="price">{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-line pt-2 text-ink-500">
              <span>Shipping</span>
              <span className="price">{formatPrice(SHIPPING)}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-2 text-base font-semibold text-ink">
              <span>Total</span>
              <span className="price">{formatPrice(total)}</span>
            </div>
          </div>
          <Button type="submit" variant="accent" size="lg" className="mt-6 w-full" disabled={submitting || items.length === 0}>
            {submitting ? "Placing Order..." : "Place Order"}
          </Button>
        </div>
      </form>
    </div>
  );
}
