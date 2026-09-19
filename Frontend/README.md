# Alto — E-Commerce Frontend Starter

A frontend-only React starter for a modern e-commerce site, built with **React + Vite, Tailwind CSS, React Router, and Lucide icons**. All data is mocked — no backend, database, or auth is wired up yet, by design. It's structured so the mock data layer can be swapped for real Axios calls to a Laravel API without touching the components.

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
```

## Design system

- **Brand**: "Alto" — a considered, general-purpose storefront (not tied to one product category).
- **Palette**: warm stone background (`#F5F3EE`), near-black ink text (`#18160F`), and a muted brass/gold accent (`#B8863B`) used sparingly for CTAs, active states, and discount tags.
- **Type**: `Fraunces` (serif, display headings), `Inter` (UI/body), `JetBrains Mono` (prices, order numbers, quantities — a small signature touch that gives numbers a receipt-like precision).
- All tokens live in `tailwind.config.js` and `src/index.css` — change them there to re-theme the whole app.

## Project structure

```
src/
├── components/     # Reusable UI: Navbar, Footer, ProductCard, Dialog, Button, etc.
├── layouts/        # CustomerLayout (navbar+footer) and AdminLayout (sidebar)
├── pages/          # One file per route
│   └── admin/       # Admin-only pages
├── context/         # CartContext (frontend-only cart state)
├── data/            # mockData.js — swap this for API calls later
└── lib/utils.js     # cn() class helper, formatPrice()
```

## Pages included

Customer: Home, Products, Product Details, Cart, Checkout, Login, Register, My Orders
Admin: Dashboard, Products (CRUD), Categories (CRUD), Orders

## Connecting the real API later

Everything reads from `src/data/mockData.js`. To connect Laravel:

```js
// before
import { products } from "../data/mockData";

// after
const { data: products } = await axios.get("/api/products");
```

Components already take data via props (`<ProductCard product={product} />`), so no component code needs to change — only how each page fetches its data.

## Notes

- Login/Register/Checkout forms are UI-only; submitting shows the expected loading/success states but doesn't call a real API.
- Cart state lives in React context and resets on page reload (no persistence layer yet).
- Admin CRUD (products/categories) mutates in-memory state only.
