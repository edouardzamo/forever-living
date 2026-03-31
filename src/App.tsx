import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchBasket } from "./api";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import BasketPage from "./pages/BasketPage";
import AboutPage from "./pages/AboutPage";

function Navbar({ basketCount }: { basketCount: number }) {
  const location = useLocation();

  const linkStyle = (path: string) => ({
    textDecoration: "none",
    fontSize: 14,
    fontWeight: location.pathname === path ? 600 : 400,
    color: location.pathname === path ? "#059669" : "#374151",
    borderBottom: location.pathname === path ? "2px solid #059669" : "2px solid transparent",
    paddingBottom: 2,
  });

  return (
    <nav style={{
      background: "#fff", borderBottom: "1px solid #e5e7eb",
      padding: "14px 24px", display: "flex",
      justifyContent: "space-between", alignItems: "center",
      position: "sticky", top: 0, zIndex: 100
    }}>
      <Link to="/" style={{ fontWeight: 800, fontSize: 18, textDecoration: "none", color: "#059669" }}>
        Forever Living
      </Link>

      <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
        <Link to="/" style={linkStyle("/")}>Home</Link>
        <Link to="/products" style={linkStyle("/products")}>Products</Link>
        <Link to="/about" style={linkStyle("/about")}>About</Link>
      </div>

      <Link to="/basket" style={{
        textDecoration: "none", color: "#059669", fontWeight: 500, fontSize: 14,
        display: "flex", alignItems: "center", gap: 6
      }}>
        🛒 Basket
        {basketCount > 0 && (
          <span style={{
            background: "#059669", color: "#fff", borderRadius: 99,
            fontSize: 11, padding: "2px 7px", fontWeight: 700
          }}>{basketCount}</span>
        )}
      </Link>
    </nav>
  );
}

export default function App() {
  const [basketCount, setBasketCount] = useState(0);

  const refreshBasket = () => {
    fetchBasket().then(items => {
      setBasketCount(items.reduce((s, i) => s + i.quantity, 0));
    });
  };

  useEffect(() => { refreshBasket(); }, []);

  return (
    <BrowserRouter>
      <Navbar basketCount={basketCount} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage onBasketChange={refreshBasket} />} />
        <Route path="/basket" element={<BasketPage onBasketChange={refreshBasket} />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}