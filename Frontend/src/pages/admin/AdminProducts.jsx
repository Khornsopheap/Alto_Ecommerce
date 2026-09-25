import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, PackageX } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import SearchBar from "../../components/SearchBar";
import Button from "../../components/Button";
import Dialog from "../../components/Dialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import Input from "../../components/Input";
import EmptyState from "../../components/EmptyState";
import api, { resolveImage } from "../../lib/api";
import { formatPrice } from "../../lib/utils";
import { useToast } from "../../components/Toast";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const { showToast } = useToast();

  function loadProducts() {
    api.get("/products").then((res) => setProducts(res.data));
  }

  useEffect(() => {
    loadProducts();
    api.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const filtered = products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));

  function openAdd() {
    setEditing(null);
    setFormOpen(true);
  }

  function openEdit(product) {
    setEditing(product);
    setFormOpen(true);
  }

  async function handleSave(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      if (editing) {
        formData.append("_method", "PUT");
        await api.post(`/products/${editing.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Product updated");
      } else {
        await api.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        showToast("Product added");
      }
      loadProducts();
      setFormOpen(false);
    } catch (err) {
      showToast(err.response?.data?.message || "Something went wrong.");
    }
  }

  async function handleDelete() {
    try {
      await api.delete(`/products/${deleting.id}`);
      showToast("Product deleted");
      loadProducts();
    } catch (err) {
      showToast("Failed to delete product.");
    }
    setDeleting(null);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Catalog"
        title="Products"
        description={`${products.length} total products`}
        actions={
          <Button variant="accent" onClick={openAdd}>
            <Plus size={16} /> Add Product
          </Button>
        }
      />

      <div className="mb-4 max-w-sm">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      <div className="overflow-x-auto rounded-sm border border-line bg-stone-50">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-line bg-stone-100 text-left text-xs uppercase tracking-wide text-ink-500">
              <th className="px-4 py-3 font-medium">Image</th>
              <th className="px-4 py-3 font-medium">Product</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Stock</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  <img src={resolveImage(p.image)} alt={p.name} className="h-10 w-10 rounded-sm object-cover" />
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-ink">{p.name}</p>
                  <p className="text-xs text-ink-300">{p.category?.name}</p>
                </td>
                <td className="price px-4 py-3 text-ink">{formatPrice(p.price)}</td>
                <td className="price px-4 py-3 text-ink-500">{p.stock}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-3">
                    <button onClick={() => openEdit(p)} className="flex items-center gap-1 text-brass-600 hover:text-brass-700">
                      <Pencil size={14} /> Edit
                    </button>
                    <button onClick={() => setDeleting(p)} className="flex items-center gap-1 text-rust hover:text-rust/80">
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-8">
            <EmptyState icon={PackageX} title="No products found" description="Try a different search term." />
          </div>
        )}
      </div>

      <Dialog open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Product" : "Add Product"}>
        <form onSubmit={handleSave} className="space-y-4">
          <Input id="name" name="name" label="Product Name" defaultValue={editing?.name} required />
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Category</label>
            <select
              name="category_id"
              defaultValue={editing?.category_id || ""}
              className="h-11 w-full rounded-sm border border-line bg-stone-50 px-3.5 text-sm focus:border-brass-500 focus:outline-none focus:ring-1 focus:ring-brass-500"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input id="price" name="price" type="number" step="0.01" label="Price" defaultValue={editing?.price} required />
            <Input id="stock" name="stock" type="number" label="Stock" defaultValue={editing?.stock} required />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Description</label>
            <textarea
              name="description"
              rows={3}
              defaultValue={editing?.description}
              className="w-full rounded-sm border border-line bg-stone-50 px-3.5 py-2.5 text-sm focus:border-brass-500 focus:outline-none focus:ring-1 focus:ring-brass-500"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-ink-700">Product Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full rounded-sm border border-dashed border-line py-3 text-sm text-ink-500 file:mr-3 file:rounded-sm file:border-0 file:bg-stone-200 file:px-3 file:py-1.5"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>Cancel</Button>
            <Button type="submit" variant="accent">Save Product</Button>
          </div>
        </form>
      </Dialog>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete product?"
        description={`This will permanently remove "${deleting?.name}" from your catalog.`}
      />
    </div>
  );
}
