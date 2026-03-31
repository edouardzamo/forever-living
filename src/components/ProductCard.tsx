import type { Product } from "../types";
import { addToBasket } from "../api";

interface Props {
  product: Product;
  onAdded: () => void;
  onImageClick: (product: Product) => void;
}

export default function ProductCard({ product, onAdded, onImageClick }: Props) {
  const handleAdd = async () => {
    await addToBasket(product.id);
    onAdded();
  };

  return (
    <div style={{
      border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden",
      display: "flex", flexDirection: "column", background: "#fff",
      transition: "transform 0.15s, box-shadow 0.15s"
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Clickable image */}
      <div
        onClick={() => onImageClick(product)}
        style={{
          width: "100%", height: 200, overflow: "hidden",
          background: "#f9fafb", cursor: "pointer", position: "relative"
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          onError={e => {
            (e.target as HTMLImageElement).src = "https://placehold.co/300x200?text=No+Image";
          }}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        />
        <div style={{
          position: "absolute", inset: 0, background: "rgba(0,0,0,0)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "background 0.2s"
        }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,0,0,0.15)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,0,0,0)")}
        >
          <span style={{
            background: "rgba(255,255,255,0.9)", borderRadius: 99,
            padding: "6px 14px", fontSize: 12, fontWeight: 600, color: "#059669"
          }}>View details</span>
        </div>
      </div>

      <div style={{ padding: 16, flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <span style={{ fontSize: 11, color: "#6b7280", textTransform: "uppercase", letterSpacing: 1 }}>
          {product.category}
        </span>
        <h3 style={{ fontSize: 15, fontWeight: 600, margin: 0, color: "#1f2937" }}>
          {product.name}
        </h3>
        <p style={{ fontSize: 13, color: "#6b7280", margin: 0, flex: 1, lineHeight: 1.6 }}>
          {product.description}
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#059669" }}>
            ${product.price.toFixed(2)}
          </span>
          <button onClick={handleAdd} style={{
            background: "#059669", color: "#fff", border: "none", borderRadius: 8,
            padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 500
          }}>
            Add to basket
          </button>
        </div>
      </div>
    </div>
  );
}