export default function AboutPage() {
  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "48px 24px" }}>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#059669", letterSpacing: 2, marginBottom: 8 }}>
          OUR STORY
        </p>
        <h1 style={{ fontSize: 34, fontWeight: 800, color: "#064e3b", marginBottom: 16 }}>
          About Us
        </h1>
        <p style={{ fontSize: 16, color: "#6b7280", lineHeight: 1.8, maxWidth: 600, margin: "0 auto" }}>
          We are a passionate team dedicated to bringing you the best of Forever Living's
          world-renowned natural health and wellness products.
        </p>
      </div>

      {/* Mission card */}
      <div style={{
        background: "#ecfdf5", border: "1px solid #a7f3d0",
        borderRadius: 16, padding: "36px 40px", marginBottom: 40
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#064e3b", marginBottom: 12 }}>
          🌿 Our Mission
        </h2>
        <p style={{ fontSize: 15, color: "#047857", lineHeight: 1.8 }}>
          To make premium natural wellness products accessible to everyone in our community.
          We believe that good health starts with nature, and Forever Living's aloe-based
          products are the perfect way to support a healthy, balanced lifestyle.
        </p>
      </div>

      {/* Why Forever Living */}
      <h2 style={{ fontSize: 22, fontWeight: 700, color: "#064e3b", marginBottom: 20 }}>
        Why Forever Living?
      </h2>
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
        gap: 16, marginBottom: 48
      }}>
        {[
          { icon: "🌱", title: "Natural Ingredients", desc: "All products are made from pure, stabilized aloe vera with no harmful additives." },
          { icon: "🏆", title: "Globally Trusted", desc: "Forever Living operates in over 160 countries with millions of satisfied customers." },
          { icon: "🔬", title: "Science Backed", desc: "Products are developed with rigorous scientific research and quality standards." },
          { icon: "💚", title: "Ethically Made", desc: "Committed to sustainability, cruelty-free testing, and responsible sourcing." },
        ].map((item, i) => (
          <div key={i} style={{
            background: "#fff", border: "1px solid #e5e7eb",
            borderRadius: 12, padding: "24px 20px"
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1f2937", marginBottom: 6 }}>{item.title}</h3>
            <p style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact section */}
      <div style={{
        background: "#f0fdf4", border: "1px solid #d1fae5",
        borderRadius: 16, padding: "36px 40px", textAlign: "center"
      }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#064e3b", marginBottom: 8 }}>
          Get in Touch
        </h2>
        <p style={{ fontSize: 14, color: "#6b7280", marginBottom: 20 }}>
          Have questions about our products? We'd love to hear from you.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          <p style={{ fontSize: 14, color: "#047857" }}>📧 Milainezamo@gmail.com</p>
          <p style={{ fontSize: 14, color: "#047857" }}>📱 +237 653566453</p>
          <p style={{ fontSize: 14, color: "#047857" }}>📍 Douala, Cameroon</p>
        </div>
      </div>

    </div>
  );
}