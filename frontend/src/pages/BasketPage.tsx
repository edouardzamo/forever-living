import { useEffect, useState } from "react";
import type { BasketItem } from "../types";
import { fetchBasket, removeFromBasket, clearBasket } from "../api";

const SISTER_WHATSAPP = "237653566453"; // 👈 replace with her real number

export default function BasketPage() {
  const [items, setItems] = useState<BasketItem[]>([]);
  const [sent, setSent] = useState(false);

  const load = () => fetchBasket().then(setItems);

  useEffect(() => { load(); }, []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const handleRemove = async (id: number) => {
    await removeFromBasket(id);
    load();
  };

  const handleClear = async () => {
    await clearBasket();
    load();
  };

  const handleBuy = () => {
    // Build the WhatsApp message
    const lines = items.map(
      item =>
        `• ${item.name} x${item.quantity} — ${(item.price * item.quantity).toLocaleString()} FCFA`
    );

    const message = [
      "🛒 *New Order from Forever Living Store*",
      "",
      ...lines,
      "",
      `💰 *Total: ${total.toLocaleString()} FCFA*`,
      "",
      "Please confirm this order. Thank you! 🙏",
    ].join("\n");

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${SISTER_WHATSAPP}?text=${encoded}`;

    window.open(url, "_blank");
    setSent(true);
  };

  if (items.length === 0) return (
    <div style={{ textAlign: "center", padding: 80, color: "#6b7280" }}>
      <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
      <p style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: "#1f2937" }}>
        Your basket is empty
      </p>
      <p style={{ fontSize: 14 }}>Add some products to get started.</p>
    </div>
  );

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "24px 16px" }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Your Basket</h1>

      {/* Item list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
        {items.map(item => {
          const itemTotal = item.price * item.quantity;
          return (
            <div key={item.id} style={{
              display: "flex", alignItems: "center", gap: 16,
              padding: 16, border: "1px solid #e5e7eb",
              borderRadius: 12, background: "#fff"
            }}>
              <img
                src={item.image}
                alt={item.name}
                onError={e => {
                  (e.target as HTMLImageElement).src = "https://placehold.co/64x64?text=IMG";
                }}
                style={{ width: 64, height: 64, borderRadius: 8, objectFit: "cover", flexShrink: 0 }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 600, margin: "0 0 2px", color: "#1f2937" }}>{item.name}</p>
                <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 4px" }}>
                  Qty: {item.quantity}
                </p>
                <p style={{ fontSize: 13, color: "#059669", margin: 0, fontWeight: 500 }}>
                  {itemTotal.toLocaleString()} FCFA
                </p>
              </div>
              <button
                onClick={() => handleRemove(item.id)}
                style={{
                  background: "#fee2e2", color: "#dc2626", border: "none",
                  borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontSize: 13
                }}
              >Remove</button>
            </div>
          );
        })}
      </div>

      {/* Order summary */}
      <div style={{
        border: "1px solid #d1fae5", borderRadius: 16,
        overflow: "hidden", background: "#fff"
      }}>
        {/* Summary header */}
        <div style={{ background: "#ecfdf5", padding: "16px 20px", borderBottom: "1px solid #d1fae5" }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: "#064e3b", margin: 0 }}>
            Order Summary
          </p>
        </div>

        {/* Summary rows */}
        <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#6b7280" }}>
            <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
            <span>{total.toLocaleString()} FCFA</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, color: "#6b7280" }}>
            <span>Delivery</span>
            <span style={{ color: "#059669" }}>To be confirmed</span>
          </div>
          <div style={{
            borderTop: "1px solid #e5e7eb", paddingTop: 10, marginTop: 4,
            display: "flex", flexDirection: "column", gap: 4
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 17, color: "#1f2937" }}>
              <span>Total</span>
              <span style={{ color: "#059669" }}>{total.toLocaleString()} FCFA</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div style={{ padding: "0 20px 20px", display: "flex", flexDirection: "column", gap: 10 }}>

          {/* WhatsApp Buy button */}
          <button
            onClick={handleBuy}
            style={{
              width: "100%", padding: "14px 20px",
              background: "#25d366", color: "#fff",
              border: "none", borderRadius: 10,
              cursor: "pointer", fontSize: 15, fontWeight: 700,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 8
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.522 5.847L.057 23.882l6.197-1.427A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.887 9.887 0 01-5.034-1.378l-.36-.214-3.733.859.882-3.648-.235-.374A9.862 9.862 0 012.106 12C2.106 6.58 6.58 2.106 12 2.106S21.894 6.58 21.894 12 17.42 21.894 12 21.894z"/>
            </svg>
            Order via WhatsApp
          </button>

          {/* Clear basket */}
          <button
            onClick={handleClear}
            style={{
              width: "100%", padding: "10px 20px",
              background: "#fff", color: "#6b7280",
              border: "1px solid #e5e7eb", borderRadius: 10,
              cursor: "pointer", fontSize: 13
            }}
          >
            Clear basket
          </button>
        </div>

        {/* Sent confirmation */}
        {sent && (
          <div style={{
            margin: "0 20px 20px", padding: "12px 16px",
            background: "#ecfdf5", border: "1px solid #a7f3d0",
            borderRadius: 10, fontSize: 13, color: "#047857", textAlign: "center"
          }}>
            ✅ WhatsApp opened! Your order has been sent to the store.
          </div>
        )}
      </div>

      {/* Info note */}
      <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", marginTop: 16 }}>
        Clicking "Order via WhatsApp" will open WhatsApp with your order details pre-filled.
      </p>
    </div>
  );
}