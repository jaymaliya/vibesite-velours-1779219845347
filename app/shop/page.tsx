"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef, Suspense } from "react";

const products = [
  { id: 1, img: "/product-1.jpg", name: "round chocolate cake", description: "A round chocolate cake with dark chocolate ganache drip, mocha frosting, a lit gold", price: 0, badge: "NEW" },
  { id: 2, img: "/product-2.jpg", name: "round chocolate birthday", description: "A round chocolate birthday cake with dark chocolate drip glaze, topped with a lit golden", price: 0, badge: "" },
  { id: 3, img: "/product-3.jpg", name: "round chocolate drip", description: "A round chocolate drip cake with a lit gold candle and chocolate shavings on a gold board.", price: 0, badge: "" },
  { id: 4, img: "/product-4.jpg", name: "round light brown", description: "A round light brown cake with dark chocolate glaze drips, a lit gold candle, and", price: 0, badge: "" }
];

const FILTERS = ["All Cakes", "Birthday", "Signature", "Classic", "Gluten-Free"];

export default function ShopPage() {
  const router = useRouter();
  const { addItem } = useCart();
  const [activeFilter, setActiveFilter] = useState("All Cakes");
  const [addedStates, setAddedStates] = useState<{ [key: number]: boolean }>({});
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    els.forEach(el => el.classList.add('is-hidden'));
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.remove('is-hidden');
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  function handleAddToCart(p: typeof products[0]) {
    addItem({
      id: crypto.randomUUID(),
      name: p.name,
      price: p.price,
      quantity: 1,
      image: p.img,
    });
    setAddedStates(prev => ({ ...prev, [p.id]: true }));
    setCartCount(c => c + 1);
    setTimeout(() => {
      setAddedStates(prev => ({ ...prev, [p.id]: false }));
    }, 1500);
  }

  return (
    <div style={{ background: "#0d0d0d", color: "#f5f0eb", minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "sans-serif" }}>
      <style>{`
        .is-hidden { opacity: 0; transform: translateY(32px); transition: opacity 0.6s cubic-bezier(0.4,0,0.2,1), transform 0.6s cubic-bezier(0.4,0,0.2,1); }
        .visible { opacity: 1 !important; transform: translateY(0) !important; }
        .card-hover { transition: transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1); }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,0.5); }
        .btn-lift { transition: transform 0.15s cubic-bezier(0.4,0,0.2,1), box-shadow 0.15s cubic-bezier(0.4,0,0.2,1); }
        .btn-lift:hover { transform: scale(1.02); box-shadow: 0 6px 24px rgba(0,0,0,0.4); }
        .btn-lift:active { transform: scale(0.98); }
        .img-zoom { transition: transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease; }
        .img-zoom:hover { transform: scale(1.06); opacity: 1 !important; }
        .overlay-btn { opacity: 0; transition: opacity 0.3s ease; }
        .group-card:hover .overlay-btn { opacity: 1; }
        .group-card:hover .overlay-bg { opacity: 1; }
        .overlay-bg { opacity: 0; transition: opacity 0.3s ease; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-hidden: true; }
        @media (max-width: 767px) {
          .shop-grid { grid-template-columns: 1fr !important; }
          .product-offset { margin-top: 0 !important; }
        }
      `}</style>

      {/* TopNavBar */}
      <nav style={{
        background: "rgba(13,13,13,0.95)",
        backdropFilter: "blur(12px)",
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        borderBottom: "1px solid rgba(255,255,255,0.06)"
      }}>
        <div
          onClick={() => router.push('/')}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 700, letterSpacing: "-0.04em", color: "#d4af7a", cursor: "pointer", textTransform: "uppercase" }}
        >
          Velours
        </div>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          <a
            onClick={() => router.push('/shop')}
            style={{ color: "#d4af7a", borderBottom: "2px solid #d4af7a", paddingBottom: "4px", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", textDecoration: "none" }}
          >
            Shop
          </a>
          <a
            onClick={() => router.push('/occasions')}
            style={{ color: "#9e9e9e", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", textDecoration: "none", transition: "color 0.3s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#d4af7a")}
            onMouseLeave={e => (e.currentTarget.style.color = "#9e9e9e")}
          >
            Occasions
          </a>
          <a
            onClick={() => router.push('/story')}
            style={{ color: "#9e9e9e", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", textDecoration: "none", transition: "color 0.3s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#d4af7a")}
            onMouseLeave={e => (e.currentTarget.style.color = "#9e9e9e")}
          >
            Our Story
          </a>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", color: "#d4af7a" }}>
          <button
            onClick={() => router.push('/checkout')}
            style={{ background: "none", border: "none", color: "#d4af7a", cursor: "pointer", display: "flex", alignItems: "center", transition: "color 0.3s", position: "relative" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#f0d9b0")}
            onMouseLeave={e => (e.currentTarget.style.color = "#d4af7a")}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "24px" }}>shopping_cart</span>
          </button>
        </div>
      </nav>

      {/* Main */}
      <main style={{ flexGrow: 1, paddingTop: "120px", paddingBottom: "80px", paddingLeft: "24px", paddingRight: "24px", maxWidth: "1280px", margin: "0 auto", width: "100%" }}>

        {/* Header */}
        <header className="reveal" style={{ marginBottom: "48px", textAlign: "left" }}>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 700,
            color: "#d4af7a",
            marginBottom: "16px",
            lineHeight: 1.1,
            letterSpacing: "-0.02em"
          }}>
            Our Decadent Collection
          </h1>
          <p style={{ fontSize: "16px", color: "#9e9e9e", maxWidth: "640px", lineHeight: 1.7 }}>
            Crafted for Every Indulgence. Explore our signature creations, hand-crafted in India with the finest ingredients.
          </p>
        </header>

        {/* Filters */}
        <section className="reveal scrollbar-hide" style={{ marginBottom: "60px", overflowX: "auto", paddingBottom: "8px" }}>
          <div style={{ display: "flex", gap: "12px", width: "max-content" }}>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className="btn-lift"
                style={{
                  background: activeFilter === f ? "#3b2a14" : "#1e1e1e",
                  color: activeFilter === f ? "#d4af7a" : "#9e9e9e",
                  border: activeFilter === f ? "none" : "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "9999px",
                  padding: "12px 24px",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  boxShadow: activeFilter === f ? "0 2px 8px rgba(0,0,0,0.3)" : "none",
                  transition: "all 0.2s ease"
                }}
                onMouseEnter={e => {
                  if (activeFilter !== f) {
                    (e.currentTarget as HTMLButtonElement).style.background = "#2a2a2a";
                  }
                }}
                onMouseLeave={e => {
                  if (activeFilter !== f) {
                    (e.currentTarget as HTMLButtonElement).style.background = "#1e1e1e";
                  }
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid */}
        <section
          className="shop-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            columnGap: "32px",
            rowGap: "80px"
          }}
        >
          {products.map((p, idx) => (
            <article
              key={p.id}
              className="group-card card-hover reveal"
              style={{
                cursor: "pointer",
                marginTop: idx % 2 === 1 ? "80px" : "0"
              }}
            >
              {/* Image container */}
              <div
                onClick={() => router.push(`/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`)}
                style={{
                  aspectRatio: "4/5",
                  background: "#1a1a1a",
                  marginBottom: "20px",
                  overflow: "hidden",
                  position: "relative",
                  borderRadius: "2px"
                }}
              >
                <div style={{ overflow: "hidden", width: "100%", height: "100%", borderRadius: "inherit" }}>
                  <img
                    src={p.img}
                    alt={p.name}
                    className="img-zoom"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.9,
                      display: "block"
                    }}
                  />
                </div>

                {/* Badge */}
                {p.badge && (
                  <div style={{
                    position: "absolute",
                    top: "16px",
                    left: "16px",
                    background: "#d4af7a",
                    color: "#0d0d0d",
                    fontSize: "10px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "4px 10px",
                    borderRadius: "9999px"
                  }}>
                    {p.badge}
                  </div>
                )}

                {/* Hover overlay with Add to Cart */}
                <div
                  className="overlay-bg"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(13,13,13,0.85) 0%, transparent 60%)",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "20px"
                  }}
                >
                  <button
                    className="overlay-btn btn-lift"
                    onClick={e => {
                      e.stopPropagation();
                      handleAddToCart(p);
                    }}
                    style={{
                      width: "100%",
                      background: "#3b2a14",
                      color: "#d4af7a",
                      border: "none",
                      borderRadius: "9999px",
                      padding: "12px",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      transition: "transform 0.15s ease, box-shadow 0.15s ease"
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    }}
                  >
                    {addedStates[p.id] ? "Added ✓" : "Add to Cart"}
                  </button>
                </div>
              </div>

              {/* Card Info */}
              <div onClick={() => router.push(`/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`)}>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "22px",
                  fontWeight: 600,
                  color: "#d4af7a",
                  marginBottom: "8px",
                  letterSpacing: "-0.01em",
                  textTransform: "capitalize"
                }}>
                  {p.name}
                </h2>
                <p style={{ fontSize: "14px", color: "#9e9e9e", marginBottom: "12px", lineHeight: 1.6 }}>
                  {p.description}
                </p>
                <p style={{ fontSize: "16px", fontWeight: 600, color: "#c8a87a" }}>
                  {p.price === 0 ? "Price on request" : `₹${p.price}`}
                </p>
              </div>
            </article>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        width: "100%",
        padding: "64px 24px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "40px"
      }}>
        {/* Brand */}
        <div style={{ gridColumn: "span 1" }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "24px",
            fontWeight: 700,
            color: "#d4af7a",
            marginBottom: "16px",
            letterSpacing: "-0.02em",
            textTransform: "uppercase"
          }}>
            Velours
          </h2>
          <p style={{ fontSize: "14px", color: "#9e9e9e", marginBottom: "24px", maxWidth: "240px", lineHeight: 1.7 }}>
            Exquisite luxury cakes, crafted for unforgettable moments.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span className="material-symbols-outlined" style={{ color: "#d4af7a", fontSize: "18px" }}>verified</span>
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", color: "#d4af7a", textTransform: "uppercase" }}>Made in India</span>
          </div>
        </div>

        {/* Shop */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", color: "#d4af7a", textTransform: "uppercase", marginBottom: "8px" }}>Shop</h3>
          {["All Cakes", "Occasions", "Bespoke"].map(link => (
            <a
              key={link}
              onClick={() => router.push('/shop')}
              style={{ fontSize: "14px", color: "#9e9e9e", cursor: "pointer", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#d4af7a")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9e9e9e")}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Company */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", color: "#d4af7a", textTransform: "uppercase", marginBottom: "8px" }}>Company</h3>
          {["Our Story", "Contact", "Support"].map(link => (
            <a
              key={link}
              onClick={() => router.push('/story')}
              style={{ fontSize: "14px", color: "#9e9e9e", cursor: "pointer", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#d4af7a")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9e9e9e")}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Information */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h3 style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", color: "#d4af7a", textTransform: "uppercase", marginBottom: "8px" }}>Information</h3>
          {["Legal", "Privacy Policy", "Shipping Info"].map(link => (
            <a
              key={link}
              onClick={() => router.push('/info')}
              style={{ fontSize: "14px", color: "#9e9e9e", cursor: "pointer", textDecoration: "none", transition: "color 0.3s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#d4af7a")}
              onMouseLeave={e => (e.currentTarget.style.color = "#9e9e9e")}
            >
              {link}
            </a>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          gridColumn: "1 / -1",
          marginTop: "24px",
          paddingTop: "24px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          <p style={{ fontSize: "14px", color: "#9e9e9e" }}>© 2024 Velours. Made in India.</p>
        </div>
      </footer>
    </div>
  );
}