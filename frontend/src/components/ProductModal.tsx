import type { Product } from "../types";
import { addToBasket } from "../api";
import { useState } from "react";

interface Props {
  product: Product | null;
  onClose: () => void;
  onAdded: () => void;
}

export default function ProductModal({ product, onClose, onAdded }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = async () => {
    await addToBasket(product.id, quantity);
    setAdded(true);
    onAdded();
    setTimeout(() => setAdded(false), 2000);
  };

  const benefits: Record<string, string[]> = {
    "Drinks": ["Supports digestive health", "Boosts immune system", "Rich in vitamins & minerals", "Hydrates the body naturally"],
    "Nutrition": ["Natural energy source", "Rich in antioxidants", "Supports overall wellness", "No artificial additives"],
    "Supplements": ["Supports heart health", "Promotes joint flexibility", "Boosts brain function", "Essential fatty acids"],
    "Personal Care": ["Gentle on sensitive skin", "No harsh chemicals", "Fresh and clean feeling", "Aloe vera enriched"],
    "Skincare": ["Deep moisturizing", "Anti-aging properties", "Suitable for all skin types", "Leaves skin glowing"],
  };

  const productBenefits = benefits[product.category] || ["Natural ingredients", "High quality", "Trusted formula", "Daily use"];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
        zIndex: 1000, display: "flex", alignItems: "center",
        justifyContent: "center", padding: 16
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "#fff", borderRadius: 16, maxWidth: 780, width: "100%",
          maxHeight: "90vh", overflow: "auto",
          display: "grid", gridTemplateColumns: "1fr 1fr"
        }}
      >
        {/* Left — image */}
        <div style={{ position: "relative", background: "#f9fafb", borderRadius: "16px 0 0 16px", overflow: "hidden" }}>
          <img
            src={product.image}
            alt={product.name}
            onError={e => {
              (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=No+Image";
            }}
            style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 320 }}
          />
          <span style={{
            position: "absolute", top: 12, left: 12,
            background: "#059669", color: "#fff",
            fontSize: 11, fontWeight: 600, padding: "4px 10px",
            borderRadius: 99, letterSpacing: 1
          }}>
            {product.category.toUpperCase()}
          </span>
        </div>

        {/* Right — details */}
        <div style={{ padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              alignSelf: "flex-end", background: "#f3f4f6", border: "none",
              borderRadius: 99, width: 32, height: 32, cursor: "pointer",
              fontSize: 16, color: "#6b7280", display: "flex",
              alignItems: "center", justifyContent: "center"
            }}
          >✕</button>

          {/* Name & price */}
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "#064e3b", margin: "0 0 8px" }}>
              {product.name}
            </h2>
            <p style={{ fontSize: 26, fontWeight: 700, color: "#059669", margin: 0 }}>
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Description */}
          <p style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
            {product.description}
          </p>

          {/* Benefits */}
          <div style={{ background: "#ecfdf5", borderRadius: 10, padding: "14px 16px" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#064e3b", marginBottom: 10 }}>
              ✅ Key Benefits
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 6 }}>
              {productBenefits.map((b, i) => (
                <li key={i} style={{ fontSize: 13, color: "#047857", display: "flex", gap: 8 }}>
                  <span>🌿</span> {b}
                </li>
              ))}
            </ul>
          </div>

          {/* How to use */}
          <div style={{ border: "1px solid #e5e7eb", borderRadius: 10, padding: "14px 16px" }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#1f2937", marginBottom: 6 }}>
              📋 How to Use
            </p>
            <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, margin: 0 }}>
              {product.category === "Drinks"
                ? "Shake well before use. Drink 60–120ml daily, preferably on an empty stomach. Keep refrigerated after opening."
                : product.category === "Supplements"
                ? "Take 2 softgels daily with meals. For best results, use consistently every day."
                : product.category === "Skincare"
                ? "Apply a small amount to clean skin morning and evening. Massage gently until fully absorbed."
                : product.category === "Personal Care"
                ? "Use daily as part of your regular routine. Apply as directed on the packaging."
                : "Use as directed. Store in a cool, dry place away from direct sunlight."}
            </p>
          </div>

          {/* Quantity + Add to basket */}
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 4 }}>
            <div style={{
              display: "flex", alignItems: "center", border: "1px solid #d1fae5",
              borderRadius: 8, overflow: "hidden"
            }}>
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                style={{
                  width: 36, height: 36, background: "#f0fdf4", border: "none",
                  cursor: "pointer", fontSize: 16, color: "#059669", fontWeight: 700
                }}
              >−</button>
              <span style={{
                width: 36, textAlign: "center", fontSize: 15,
                fontWeight: 600, color: "#1f2937"
              }}>{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                style={{
                  width: 36, height: 36, background: "#f0fdf4", border: "none",
                  cursor: "pointer", fontSize: 16, color: "#059669", fontWeight: 700
                }}
              >+</button>
            </div>

            <button
              onClick={handleAdd}
              style={{
                flex: 1, background: added ? "#047857" : "#059669",
                color: "#fff", border: "none", borderRadius: 8,
                padding: "10px 20px", cursor: "pointer",
                fontSize: 14, fontWeight: 600, transition: "background 0.2s"
              }}
            >
              {added ? "✓ Added to basket!" : "Add to basket"}
            </button>
          </div>

          {/* Order info */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 8, marginTop: 4
          }}>
            {[
              { icon: "🚚", text: "Fast delivery" },
              { icon: "✅", text: "Certified quality" },
              { icon: "🔄", text: "Easy returns" },
              { icon: "🔒", text: "Secure checkout" },
            ].map((item, i) => (
              <div key={i} style={{
                display: "flex", gap: 6, alignItems: "center",
                fontSize: 12, color: "#6b7280"
              }}>
                <span>{item.icon}</span> {item.text}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}