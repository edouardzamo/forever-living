import { useEffect, useState } from "react";
import type { Product } from "../types";
import { fetchProducts } from "../api";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

interface Props {
  onBasketChange: () => void;
}

export default function ProductsPage({ onBasketChange }: Props) {
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  const filtered = products.filter(p => {
    const matchesCategory = category === "All" || p.category === category;
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>
        Forever Living Products
      </h1>

      {/* Search bar */}
      <div style={{ position: "relative", marginBottom: 20, maxWidth: 400 }}>
        <span style={{
          position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
          fontSize: 14, color: "#9ca3af", pointerEvents: "none"
        }}>🔍</span>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: "100%", padding: "8px 12px 8px 36px",
            border: "1px solid #d1fae5", borderRadius: 8, fontSize: 13,
            outline: "none", boxSizing: "border-box",
            background: "#f0fdf4", color: "#111"
          }}
        />
        {search && (
          <button onClick={() => setSearch("")} style={{
            position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
            background: "none", border: "none", cursor: "pointer",
            fontSize: 14, color: "#9ca3af"
          }}>✕</button>
        )}
      </div>

      {/* Category filters */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setCategory(c)} style={{
            padding: "6px 14px", borderRadius: 99, fontSize: 13, cursor: "pointer",
            border: "1px solid #d1fae5",
            background: category === c ? "#059669" : "#f0fdf4",
            color: category === c ? "#fff" : "#059669",
            fontWeight: category === c ? 600 : 400,
          }}>{c}</button>
        ))}
      </div>

      {/* Results count */}
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
        {filtered.length} product{filtered.length !== 1 ? "s" : ""} found
        {search && <span> for "<strong>{search}</strong>"</span>}
      </p>

      {/* Product grid */}
      {filtered.length > 0 ? (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 20
        }}>
          {filtered.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onAdded={onBasketChange}
              onImageClick={setSelectedProduct}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: 60, color: "#6b7280" }}>
          <p style={{ fontSize: 18, marginBottom: 8 }}>No products found.</p>
          <p style={{ fontSize: 14 }}>Try a different search or category.</p>
          <button onClick={() => { setSearch(""); setCategory("All"); }} style={{
            marginTop: 16, padding: "8px 20px", background: "#059669",
            color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 14
          }}>Clear filters</button>
        </div>
      )}

      {/* Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAdded={onBasketChange}
      />
    </div>
  );
}