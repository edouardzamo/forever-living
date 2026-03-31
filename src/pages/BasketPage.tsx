import { useEffect, useState } from "react";
import type { BasketItem } from "../types";
import { clearBasket, fetchBasket, removeFromBasket } from "../api";

interface Props {
  onBasketChange: () => void;
}

export default function BasketPage({ onBasketChange }: Props) {
  const [items, setItems] = useState<BasketItem[]>([]);

  const load = () => fetchBasket().then(setItems);

  useEffect(() => { load(); }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleRemove = async (id: number) => {
    await removeFromBasket(id);
    await load();
    onBasketChange();
  };

  const handleClear = async () => {
    await clearBasket();
    await load();
    onBasketChange();
  };

  if (items.length === 0) return (
    <div style={{ textAlign: "center", padding: 80, color: "#6b7280" }}>
      <p style={{ fontSize: 18 }}>Your basket is empty.</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Your Basket</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {items.map(item => (
          <div key={item.id} style={{
            display: "flex", alignItems: "center", gap: 16,
            padding: 16, border: "1px solid #e5e7eb", borderRadius: 12, background: "#fff"
          }}>
            <img src={item.image} alt={item.name} style={{ width: 64, height: 64, borderRadius: 8, objectFit: "cover" }} />
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, margin: 0 }}>{item.name}</p>
              <p style={{ fontSize: 13, color: "#6b7280", margin: "2px 0 0" }}>Qty: {item.quantity}</p>
            </div>
            <span style={{ fontWeight: 700, color: "#059669" }}>${(item.price * item.quantity).toFixed(2)}</span>
            <button onClick={() => handleRemove(item.id)} style={{
              background: "#fee2e2", color: "#dc2626", border: "none",
              borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13
            }}>Remove</button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, padding: 20, border: "1px solid #d1fae5", borderRadius: 12, background: "#f0fdf4" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 18, fontWeight: 700 }}>Total: ${total.toFixed(2)}</span>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={handleClear} style={{
              background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8,
              padding: "8px 16px", cursor: "pointer", fontSize: 13
            }}>Clear basket</button>
            <button style={{
              background: "#059669", color: "#fff", border: "none",
              borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontSize: 13, fontWeight: 600
            }}>Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
}