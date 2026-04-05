import { Link } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";

export default function HomePage() {
  return (
    <div>
      {/* Carousel replaces the old hero */}
      <HeroCarousel />

      {/* Features strip */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 0,
        borderTop: "1px solid #d1fae5",
        borderBottom: "1px solid #d1fae5"
      }}>
        {[
          { icon: "🌿", title: "100% Natural", desc: "Pure aloe vera ingredients" },
          { icon: "🚚", title: "Fast Delivery", desc: "Delivered to your door" },
          { icon: "✅", title: "Certified Quality", desc: "Internationally approved" },
          { icon: "💬", title: "Expert Support", desc: "We're here to help" },
        ].map((f, i) => (
          <div key={i} style={{
            padding: "28px 20px", textAlign: "center",
            borderRight: i < 3 ? "1px solid #d1fae5" : "none",
            background: "#fff"
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
            <p style={{ fontWeight: 700, fontSize: 14, color: "#064e3b", marginBottom: 4 }}>{f.title}</p>
            <p style={{ fontSize: 13, color: "#6b7280" }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Featured categories */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        <h2 style={{ fontSize: 26, fontWeight: 700, color: "#064e3b", marginBottom: 8, textAlign: "center" }}>
          Shop by Category
        </h2>
        <p style={{ textAlign: "center", color: "#6b7280", fontSize: 14, marginBottom: 36 }}>
          Find the right product for your lifestyle
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: 16
        }}>
          {[
            { name: "Drinks", icon: "🥤", color: "#ecfdf5", border: "#a7f3d0" },
            { name: "Nutrition", icon: "🍯", color: "#fffbeb", border: "#fde68a" },
            { name: "Supplements", icon: "💊", color: "#eff6ff", border: "#bfdbfe" },
            { name: "Personal Care", icon: "🧴", color: "#fdf4ff", border: "#e9d5ff" },
            { name: "Skincare", icon: "✨", color: "#fff1f2", border: "#fecdd3" },
          ].map((cat, i) => (
            <Link key={i} to="/products" style={{ textDecoration: "none" }}>
              <div style={{
                background: cat.color, border: `1px solid ${cat.border}`,
                borderRadius: 12, padding: "24px 16px", textAlign: "center",
                cursor: "pointer", transition: "transform 0.15s"
              }}
                onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={{ fontSize: 32, marginBottom: 8 }}>{cat.icon}</div>
                <p style={{ fontWeight: 600, fontSize: 14, color: "#1f2937" }}>{cat.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div style={{
        background: "#059669", color: "#fff",
        padding: "60px 24px", textAlign: "center"
      }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
          Ready to feel better naturally?
        </h2>
        <p style={{ fontSize: 15, opacity: 0.85, marginBottom: 28 }}>
          Browse our full range of Forever Living products today.
        </p>
        <Link to="/products" style={{
          background: "#fff", color: "#059669", padding: "12px 32px",
          borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none"
        }}>
          View All Products
        </Link>
      </div>
    </div>
  );
}