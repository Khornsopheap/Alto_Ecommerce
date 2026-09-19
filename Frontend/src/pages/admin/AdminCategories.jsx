import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import Button from "../../components/Button";
import Dialog from "../../components/Dialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import Input from "../../components/Input";
import { categories as initialCategories } from "../../data/mockData";
import { useToast } from "../../components/Toast";

export default function AdminCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const { showToast } = useToast();

  function handleSave(e) {
    e.preventDefault();
    const name = new FormData(e.target).get("name");
    if (editing) {
      setCategories((prev) => prev.map((c) => (c.id === editing.id ? { ...c, name } : c)));
      showToast("Category updated");
    } else {
      setCategories((prev) => [...prev, { id: `c${Date.now()}`, name, count: 0, image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=80" }]);
      showToast("Category added");
    }
    setFormOpen(false);
  }

  function handleDelete() {
    setCategories((prev) => prev.filter((c) => c.id !== deleting.id));
    showToast("Category deleted");
  }

  return (
    <div>
      <PageHeader
        eyebrow="Catalog"
        title="Categories"
        description={`${categories.length} categories`}
        actions={
          <Button variant="accent" onClick={() => { setEditing(null); setFormOpen(true); }}>
            <Plus size={16} /> Add Category
          </Button>
        }
      />

      <div className="divide-y divide-line rounded-sm border border-line bg-stone-50">
        {categories.map((c) => (
          <div key={c.id} className="flex items-center gap-4 px-5 py-4">
            <img src={c.image} alt="" className="h-12 w-12 rounded-sm object-cover" />
            <div className="flex-1">
              <p className="font-medium text-ink">{c.name}</p>
              <p className="price text-xs text-ink-500">{c.count} products</p>
            </div>
            <button
              onClick={() => { setEditing(c); setFormOpen(true); }}
              className="flex items-center gap-1 text-sm text-brass-600 hover:text-brass-700"
            >
              <Pencil size={14} /> Edit
            </button>
            <button onClick={() => setDeleting(c)} className="flex items-center gap-1 text-sm text-rust hover:text-rust/80">
              <Trash2 size={14} /> Delete
            </button>
          </div>
        ))}
      </div>

      <Dialog open={formOpen} onClose={() => setFormOpen(false)} title={editing ? "Edit Category" : "Add Category"}>
        <form onSubmit={handleSave} className="space-y-4">
          <Input id="name" name="name" label="Category Name" defaultValue={editing?.name} required />
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="accent">
              Save Category
            </Button>
          </div>
        </form>
      </Dialog>

      <ConfirmDialog
        open={!!deleting}
        onClose={() => setDeleting(null)}
        onConfirm={handleDelete}
        title="Delete category?"
        description={`"${deleting?.name}" will be removed. Products in this category will need to be reassigned.`}
      />
    </div>
  );
}
