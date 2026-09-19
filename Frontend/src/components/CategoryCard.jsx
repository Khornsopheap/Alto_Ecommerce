import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/products?category=${category.id}`}
      className="group relative flex aspect-[4/3] items-end overflow-hidden rounded-sm"
    >
      <img
        src={category.image}
        alt=""
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
      <div className="relative z-10 p-4">
        <p className="font-display text-lg font-medium text-stone-50">{category.name}</p>
        <p className="text-xs text-stone-200">{category.count} products</p>
      </div>
    </Link>
  );
}
