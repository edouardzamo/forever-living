import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/slide1.jpeg",
    title: "Natural Health & Wellness",
    subtitle: "Discover the power of pure aloe vera",
  },
  {
    image: "/images/slide2.jpeg",
    title: "Forever Aloe Vera Gel",
    subtitle: "The purest drink for your daily wellness",
  },
  {
    image: "/images/slide3.jpeg",
    title: "Supplements for Every Need",
    subtitle: "Science-backed nutrition from nature",
  },
  {
    image: "/images/slide4.jpeg",
    title: "Skincare You Can Trust",
    subtitle: "Feel the difference of aloe-enriched care",
  },
  {
    image: "/images/slide5.jpeg",
    title: "Trusted Worldwide",
    subtitle: "Over 160 countries, millions of happy customers",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = (index: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <div style={{
      position: "relative", width: "100%", height: 300,
      overflow: "hidden", background: "#064e3b"
    }}>
      {/* Slide image */}
      <img
        key={current}
        src={slide.image}
        alt={slide.title}
        onError={e => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          opacity: animating ? 0 : 1,
          transition: "opacity 0.4s ease-in-out",
          position: "absolute", inset: 0
        }}
      />

      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)"
      }} />

      {/* Text content */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 24px",
        opacity: animating ? 0 : 1,
        transition: "opacity 0.4s ease-in-out"
      }}>
        <p style={{
          fontSize: 13, fontWeight: 600, color: "#6ee7b7",
          letterSpacing: 3, marginBottom: 12, textTransform: "uppercase"
        }}>
          Forever Living
        </p>
        <h1 style={{
          fontSize: 24, fontWeight: 600, color: "#fff",
          marginBottom: 14, lineHeight: 1.2,
          textShadow: "0 2px 8px rgba(0,0,0,0.3)",
          maxWidth: 640
        }}>
          {slide.title}
        </h1>
        <p style={{
          fontSize: 17, color: "rgba(255,255,255,0.85)",
          marginBottom: 32, maxWidth: 480, lineHeight: 1.6
        }}>
          {slide.subtitle}
        </p>
        <div style={{ display: "flex", gap: 12 }}>
          <a href="/products" style={{
            background: "#059669", color: "#fff",
            padding: "12px 28px", borderRadius: 10,
            fontWeight: 700, fontSize: 15, textDecoration: "none"
          }}>
            Shop Now
          </a>
          <a href="/about" style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(4px)",
            color: "#fff", padding: "12px 28px", borderRadius: 10,
            fontWeight: 600, fontSize: 15, textDecoration: "none",
            border: "1px solid rgba(255,255,255,0.3)"
          }}>
            Learn More
          </a>
        </div>
      </div>

      {/* Left arrow */}
      <button
        onClick={prev}
        style={{
          position: "absolute", left: 16, top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.2)", border: "none",
          borderRadius: 99, width: 44, height: 44,
          cursor: "pointer", fontSize: 20, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(4px)", transition: "background 0.2s"
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.35)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
      >‹</button>

      {/* Right arrow */}
      <button
        onClick={next}
        style={{
          position: "absolute", right: 16, top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.2)", border: "none",
          borderRadius: 99, width: 44, height: 44,
          cursor: "pointer", fontSize: 20, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          backdropFilter: "blur(4px)", transition: "background 0.2s"
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.35)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
      >›</button>

      {/* Dot indicators */}
      <div style={{
        position: "absolute", bottom: 20, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", gap: 8
      }}>
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? 28 : 8,
              height: 8, borderRadius: 99,
              background: i === current ? "#059669" : "rgba(255,255,255,0.5)",
              border: "none", cursor: "pointer",
              transition: "all 0.3s ease", padding: 0
            }}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div style={{
        position: "absolute", top: 16, right: 16,
        background: "rgba(0,0,0,0.35)", borderRadius: 99,
        padding: "4px 12px", fontSize: 12,
        color: "rgba(255,255,255,0.8)"
      }}>
        {current + 1} / {slides.length}
      </div>
    </div>
  );
}