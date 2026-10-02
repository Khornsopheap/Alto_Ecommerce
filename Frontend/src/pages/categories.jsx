import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import CategoryCard from "../components/CategoryCard";
import api from "../lib/api";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container-page py-10">
      <PageHeader eyebrow="Browse" title="Categories" description="Shop by category" />

      {loading ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] animate-pulse rounded-sm bg-stone-200" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      )}
    </div>
  );
}
