"use client";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../../components/CartContext";

const images = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAtwwb8FixeU3A7d9l6qS183JyXu9XTzPfrOd7NgjbZZqMvwjaNK795qy1cK3LAoCA4a-EttUb90En8w32be7S3qBOcNjo-jeF0AdgtlZkT7j0pZrPbzu0822cLyo96jDrb8zztNP5zY_jQvkXFUF4dkl-tQIYkrDRMs5DsGzXrtUAn3jpKDaWtwN4WV_MWuXJJfQF41MJnXUAovflSySxSElE__LZ9czhHlJvTDFagiaTz3VB_8YB8CoT4YdScXP2j6eSvkVR5MVtk",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuA46VoNCEBEOXiPp4URN6lv0PXN_lX9zC6F1S7R3TDX0X32zNdI_mVl8DdDuywez0FJbMGGOFMDEU0rmEiweK-V-xm6GD0ieQf2skYOCzFvkIcnC6-stni8NlJHUP03-fPgcX22ncF4rA0FOQvaH1U0txS0kTGcaHtt6C1oTY1_J66qy-YhtJb7oPdJq2R7hYr_MGjCGkVnhLUYknIPNYec3dRGMBSnt6WpIDg0Bg1ONe5DKWxF36f35W361oHh_qMcSjFFH6aAKQW4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCPPQjckaPs4sORQZ-meX5OSl7pJoLldz0wcgUPZO-KofF1xV0jU2dfRGJ88YznQ3tWoHpVyIHmeIu5uK_CZGAI7DktcdQ3k2GxV8-QHONU3XsOYlamKxzkLOn-rLCIrOWZGtjyGXKHDG8iQBNXMH68UZ2RxaL9AT7Olkl9vctEgYJxtl4sO1MTIPcLuGE3mqoXB8LGTI60wowegfLcf-YucmfLVWLw6MvMcYy0Lk5j-PJ44qh5hiMsEupfejw-myYjF1bgtCeZT5vh",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDJop61BalkmYtT6jUH5cspSLaxLYBb5EjA_GFfKlSn2HuvwwWsiXtIC37OicZvEr1hSocSd1babEOsFbpS0bJBbrtSEm1f7Ez5D_LhAaQs_7QiDTc9JFXAQAE6vw-fvLBI8n8ICbOJBOi9H4lNEmSHFE7ZICecP0b7eY5JqC_L02hELdym3xrqgATlpg1rxveB7uYzYntUKUNDkdGMB69hacODb99zTf1ZmihXVYhBoL5fhxBlNRlwgKaQ_-baNT3-EHMigc951u-V",
];

const colorOptions = [
  { name: "Classic Dark", hex: "#2c1a0e" },
  { name: "Mocha Gold", hex: "#7b4f2e" },
  { name: "Midnight Noir", hex: "#1a1008" },
  { name: "Rose Ganache", hex: "#c47b8a" },
];

const reviews = [
  {
    name: "Priya Mehta",
    location: "Mumbai",
    rating: 5,
    text: "Absolutely divine. The ganache drip was art-gallery worthy and it tasted even better than it looked. Our guests were speechless.",
    date: "December 2024",
  },
  {
    name: "Arjun Kapoor",
    location: "Delhi",
    rating: 5,
    text: "Velours raised the bar entirely. The mocha frosting is balanced perfectly — not too sweet, deeply aromatic. Will order again.",
    date: "November 2024",
  },
  {
    name: "Sneha Rajan",
    location: "Bengaluru",
    rating: 5,
    text: "Ordered for my sister's birthday. The gold board presentation, the lit candle — every detail was thought through. Felt like a luxury gift.",
    date: "October 2024",
  },
];

const relatedProducts = [
  {
    name: "Mocha Dream",
    price: 2499,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA46VoNCEBEOXiPp4URN6lv0PXN_lX9zC6F1S7R3TDX0X32zNdI_mVl8DdDuywez0FJbMGGOFMDEU0rmEiweK-V-xm6GD0ieQf2skYOCzFvkIcnC6-stni8NlJHUP03-fPgcX22ncF4rA0FOQvaH1U0txS0kTGcaHtt6C1oTY1_J66qy-YhtJb7oPdJq2R7hYr_MGjCGkVnhLUYknIPNYec3dRGMBSnt6WpIDg0Bg1ONe5DKWxF36f35W361oHh_qMcSjFFH6aAKQW4",
  },
  {
    name: "Birthday Celebration",
    price: 1999,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPPQjckaPs4sORQZ-meX5OSl7pJoLldz0wcgUPZO-KofF1xV0jU2dfRGJ88YznQ3tWoHpVyIHmeIu5uK_CZGAI7DktcdQ3k2GxV8-QHONU3XsOYlamKxzkLOn-rLCIrOWZGtjyGXKHDG8iQBNXMH68UZ2RxaL9AT7Olkl9vctEgYJxtl4sO1MTIPcLuGE3mqoXB8LGTI60wowegfLcf-YucmfLVWLw6MvMcYy0Lk5j-PJ44qh5hiMsEupfejw-myYjF1bgtCeZT5vh",
  },
  {
    name: "Celebrate Uniquely",
    price: 2499,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJop61BalkmYtT6jUH5cspSLaxLYBb5EjA_GFfKlSn2HuvwwWsiXtIC37OicZvEr1hSocSd1babEOsFbpS0bJBbrtSEm1f7Ez5D_LhAaQs_7QiDTc9JFXAQAE6vw-fvLBI8n8ICbOJBOi9H4lNEmSHFE7ZICecP0b7eY5JqC_L02hELdym3xrqgATlpg1rxveB7uYzYntUKUNDkdGMB69hacODb99zTf1ZmihXVYhBoL5fhxBlNRlwgKaQ_-baNT3-EHMigc951u-V",
  },
];

function ProductContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { addItem } = useCart();

  const paramName = searchParams.get("name") || "Signature Mocha Celebration Cake";
  const paramPrice = Number(searchParams.get("price")) || 2499;
  const paramImg = searchParams.get("img") || images[0];

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [hoveredThumb, setHoveredThumb] = useState<number | null>(null);
  const [hoveredReview, setHoveredReview] = useState<number | null>(null);
  const [hoveredRelated, setHoveredRelated] = useState<number | null>(null);

  const displayImages = paramImg !== images[0] ? [paramImg, ...images.slice(1)] : images;
  const productName = paramName;
  const productPrice = paramPrice;

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleAddToCart = () => {
    addItem({
      id: "velours-mocha-cake-001",
      name: productName,
      price: productPrice,
      quantity,
      color: colorOptions[selectedColor].name,
      image: displayImages[activeImage],
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!razorpayLoaded) {
      alert("Payment gateway loading. Please try again.");
      return;
    }
    const options = {
      key: "rzp_test_",
      amount: productPrice * quantity * 100,
      currency: "INR",
      name: "Velours",
      description: productName,
      image: displayImages[0],
      handler: function () {
        router.push("/checkout");
      },
      prefill: {
        name: "",
        email: "",
        contact: "",
      },
      theme: {
        color: "#ffe16d",
      },
    };
    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={s <= rating ? "#ffe16d" : "none"}
          stroke="#ffe16d"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );

  return (
    <>
      <div
        style={{
          background: "#161308",
          minHeight: "100vh",
          fontFamily: "'Inter', sans-serif",
          color: "#eae2cf",
          overflowX: "hidden",
        }}
      >
        {/* NAVBAR */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            background: "rgba(22,19,8,0.96)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(255,225,109,0.1)",
          }}
        >
          <nav
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 24px",
              height: "64px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <button
              onClick={() => router.push("/")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "'Epilogue', sans-serif",
                fontSize: "22px",
                fontWeight: 700,
                color: "#ffe16d",
                letterSpacing: "0.04em",
                padding: "8px 0",
              }}
            >
              Velours
            </button>

            <div
              style={{
                display: "flex",
                gap: "32px",
                alignItems: "center",
              }}
              className="hidden md:flex"
            >
              {["Shop", "Collections", "About"].map((link) => (
                <button
                  key={link}
                  onClick={() => router.push(link === "Shop" ? "/shop" : "/")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#d0c6ab",
                    fontSize: "14px",
                    fontWeight: 500,
                    letterSpacing: "0.02em",
                    padding: "8px 0",
                    transition: "color 0.2s cubic-bezier(0.4,0,0.2,1)",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ffe16d")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#d0c6ab")}
                >
                  {link}
                </button>
              ))}
              <button
                onClick={() => router.push("/checkout")}
                style={{
                  background: "none",
                  border: "1px solid rgba(255,225,109,0.4)",
                  borderRadius: "8px",
                  cursor: "pointer",
                  color: "#ffe16d",
                  fontSize: "14px",
                  fontWeight: 600,
                  padding: "8px 20px",
                  transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                  minHeight: "44px",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "#ffe16d";
                  (e.currentTarget as HTMLElement).style.color = "#161308";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background = "none";
                  (e.currentTarget as HTMLElement).style.color = "#ffe16d";
                }}
              >
                Cart
              </button>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#eae2cf",
                padding: "10px",
                minWidth: "44px",
                minHeight: "44px",
                display: "flex",
                flexDirection: "column",
                gap: "5px",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="flex md:hidden"
              aria-label="Toggle menu"
            >
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "#eae2cf",
                  transition: "transform 0.2s cubic-bezier(0.4,0,0.2,1)",
                  transform: menuOpen ? "rotate(45deg) translateY(7px)" : "none",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "#eae2cf",
                  opacity: menuOpen ? 0 : 1,
                  transition: "opacity 0.2s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
              <span
                style={{
                  display: "block",
                  width: "22px",
                  height: "2px",
                  background: "#eae2cf",
                  transition: "transform 0.2s cubic-bezier(0.4,0,0.2,1)",
                  transform: menuOpen ? "rotate(-45deg) translateY(-7px)" : "none",
                }}
              />
            </button>
          </nav>

          {menuOpen && (
            <div
              style={{
                position: "fixed",
                top: "64px",
                left: 0,
                right: 0,
                bottom: 0,
                background: "#161308",
                zIndex: 39,
                display: "flex",
                flexDirection: "column",
                padding: "40px 32px",
                gap: "24px",
              }}
            >
              {["Shop", "Collections", "About", "Cart"].map((link) => (
                <button
                  key={link}
                  onClick={() => {
                    setMenuOpen(false);
                    if (link === "Shop") router.push("/shop");
                    else if (link === "Cart") router.push("/checkout");
                    else router.push("/");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#eae2cf",
                    fontSize: "28px",
                    fontFamily: "'Epilogue', sans-serif",
                    fontWeight: 700,
                    textAlign: "left",
                    padding: "8px 0",
                    minHeight: "44px",
                  }}
                >
                  {link}
                </button>
              ))}
            </div>
          )}
        </header>

        <main style={{ paddingBottom: "100px" }}>
          {/* BREADCRUMB */}
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "16px 24px",
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {["Home", "Shop", "Signature Collection"].map((crumb, i, arr) => (
              <span key={crumb} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button
                  onClick={() => {
                    if (crumb === "Home") router.push("/");
                    else if (crumb === "Shop") router.push("/shop");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: i < arr.length - 1 ? "pointer" : "default",
                    color: i < arr.length - 1 ? "#d0c6ab" : "#ffe16d",
                    fontSize: "12px",
                    fontWeight: i < arr.length - 1 ? 400 : 600,
                    letterSpacing: "0.04em",
                    padding: 0,
                    transition: "color 0.2s cubic-bezier(0.4,0,0.2,1)",
                  }}
                >
                  {crumb}
                </button>
                {i < arr.length - 1 && (
                  <span style={{ color: "#4a4235", fontSize: "12px" }}>›</span>
                )}
              </span>
            ))}
          </div>

          {/* PRODUCT SECTION */}
          <section
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "8px 24px 64px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "48px",
              }}
              className="lg:grid-cols-2"
            >
              {/* IMAGE GALLERY */}
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div
                  style={{
                    position: "relative",
                    borderRadius: "20px",
                    overflow: "hidden",
                    background: "#231f14",
                    aspectRatio: "1/1",
                    border: "1px solid rgba(255,225,109,0.08)",
                  }}
                >
                  <img
                    src={displayImages[activeImage]}
                    alt={`${productName} — Velours artisan chocolate cake, view ${activeImage + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "opacity 0.4s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "16px",
                      left: "16px",
                      background: "rgba(22,19,8,0.85)",
                      backdropFilter: "blur(8px)",
                      borderRadius: "20px",
                      padding: "6px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "#ffe16d",
                        display: "inline-block",
                      }}
                    />
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#ffe16d",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }}
                    >
                      Made in India
                    </span>
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "16px",
                      right: "16px",
                      display: "flex",
                      gap: "6px",
                    }}
                  >
                    {displayImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          background: i === activeImage ? "#ffe16d" : "rgba(255,225,109,0.3)",
                          border: "none",
                          cursor: "pointer",
                          padding: 0,
                          transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                          minWidth: "8px",
                        }}
                        aria-label={`View image ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* THUMBNAILS */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "12px",
                  }}
                >
                  {displayImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      onMouseEnter={() => setHoveredThumb(i)}
                      onMouseLeave={() => setHoveredThumb(null)}
                      style={{
                        borderRadius: "12px",
                        overflow: "hidden",
                        border:
                          i === activeImage
                            ? "2px solid #ffe16d"
                            : hoveredThumb === i
                            ? "2px solid rgba(255,225,109,0.5)"
                            : "2px solid rgba(255,225,109,0.1)",
                        cursor: "pointer",
                        background: "none",
                        padding: 0,
                        aspectRatio: "1/1",
                        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                        transform: hoveredThumb === i && i !== activeImage ? "scale(1.03)" : "scale(1)",
                        minHeight: "44px",
                      }}
                      aria-label={`Select image ${i + 1} of ${productName}`}
                    >
                      <img
                        src={img}
                        alt={`${productName} thumbnail ${i + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          opacity: i === activeImage ? 1 : 0.65,
                          transition: "opacity 0.2s cubic-bezier(0.4,0,0.2,1)",
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* PRODUCT INFO */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "28px",
                  paddingTop: "8px",
                }}
              >
                {/* Eyebrow */}
                <span
                  style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    fontWeight: 600,
                    color: "#ffe16d",
                  }}
                >
                  Signature Collection
                </span>

                {/* Title */}
                <div>
                  <h1
                    style={{
                      fontFamily: "'Epilogue', sans-serif",
                      fontSize: "clamp(32px, 5vw, 52px)",
                      fontWeight: 700,
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                      color: "#eae2cf",
                      marginBottom: "12px",
                    }}
                  >
                    {productName}
                  </h1>
                  <p
                    style={{
                      fontSize: "16px",
                      color: "#d0c6ab",
                      lineHeight: 1.7,
                    }}
                  >
                    Bold. Decadent. Unapologetically Indulgent.
                  </p>
                </div>

                {/* Rating + Trust */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <StarRating rating={5} />
                    <span style={{ fontSize: "14px", color: "#ffe16d", fontWeight: 600 }}>5.0</span>
                    <span style={{ fontSize: "14px", color: "#d0c6ab" }}>(142 reviews)</span>
                  </div>
                  <span style={{ color: "#4a4235", fontSize: "14px" }}>·</span>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "#00f1ff",
                      fontWeight: 500,
                      letterSpacing: "0.04em",
                    }}
                  >
                    ✓ Free delivery above ₹499
                  </span>
                </div>

                {/* Price */}
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                  <span
                    style={{
                      fontFamily: "'Epilogue', sans-serif",
                      fontSize: "40px",
                      fontWeight: 700,
                      color: "#ffe16d",
                      lineHeight: 1,
                    }}
                  >
                    ₹{productPrice.toLocaleString("en-IN")}
                  </span>
                  <span
                    style={{
                      fontSize: "20px",
                      color: "#4a4235",
                      textDecoration: "line-through",
                    }}
                  >
                    ₹{(productPrice * 1.2).toFixed(0)}
                  </span>
                  <span
                    style={{
                      fontSize: "13px",
                      background: "rgba(0,241,255,0.1)",
                      color: "#00f1ff",
                      padding: "4px 10px",
                      borderRadius: "20px",
                      fontWeight: 600,
                    }}
                  >
                    20% OFF
                  </span>
                </div>

                {/* Color Selection */}
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      fontWeight: 600,
                      color: "#d0c6ab",
                      marginBottom: "12px",
                    }}
                  >
                    Ganache Finish:{" "}
                    <span style={{ color: "#eae2cf", textTransform: "none", letterSpacing: "normal" }}>
                      {colorOptions[selectedColor].name}
                    </span>
                  </p>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {colorOptions.map((c, i) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(i)}
                        title={c.name}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          background: c.hex,
                          border:
                            i === selectedColor
                              ? "3px solid #ffe16d"
                              : "3px solid rgba(255,225,109,0.15)",
                          cursor: "pointer",
                          padding: 0,
                          transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                          transform: i === selectedColor ? "scale(1.15)" : "scale(1)",
                          minWidth: "44px",
                          minHeight: "44px",
                        }}
                        aria-label={`Select ${c.name} finish`}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div>
                  <p
                    style={{
                      fontSize: "13px",
                      textTransform: "uppercase",
                      letterSpacing: "0.12em",
                      fontWeight: 600,
                      color: "#d0c6ab",
                      marginBottom: "12px",
                    }}
                  >
                    Quantity
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "10px 0 0 10px",
                        border: "1px solid rgba(255,225,109,0.2)",
                        background: "#231f14",
                        color: "#eae2cf",
                        fontSize: "20px",
                        fontWeight: 300,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#2c2618")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#231f14")}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span
                      style={{
                        width: "56px",
                        height: "44px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#231f14",
                        borderTop: "1px solid rgba(255,225,109,0.2)",
                        borderBottom: "1px solid rgba(255,225,109,0.2)",
                        fontSize: "16px",
                        fontWeight: 600,
                        color: "#eae2cf",
                      }}
                    >
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "0 10px 10px 0",
                        border: "1px solid rgba(255,225,109,0.2)",
                        background: "#231f14",
                        color: "#eae2cf",
                        fontSize: "20px",
                        fontWeight: 300,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                      }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#2c2618")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#231f14")}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <span style={{ marginLeft: "16px", fontSize: "14px", color: "#d0c6ab" }}>
                      Total:{" "}
                      <strong style={{ color: "#ffe16d" }}>
                        ₹{(productPrice * quantity).toLocaleString("en-IN")}
                      </strong>
                    </span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <button
                    onClick={handleBuyNow}
                    style={{
                      background: "#ffe16d",
                      color: "#161308",
                      border: "none",
                      borderRadius: "12px",
                      padding: "16px 32px",
                      fontSize: "16px",
                      fontWeight: 700,
                      cursor: "pointer",
                      width: "100%",
                      minHeight: "54px",
                      letterSpacing: "0.02em",
                      transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                      fontFamily: "'Epilogue', sans-serif",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#ffd93d";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#ffe16d";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                    onFocus={(e) =>
                      ((e.currentTarget as HTMLElement).style.outline = "2px solid #ffe16d")
                    }
                    onBlur={(e) =>
                      ((e.currentTarget as HTMLElement).style.outline = "none")
                    }
                  >
                    Proceed to Checkout — ₹{(productPrice * quantity).toLocaleString("en-IN")}
                  </button>

                  <button
                    onClick={handleAddToCart}
                    style={{
                      background: addedToCart ? "#231f14" : "transparent",
                      color: addedToCart ? "#00f1ff" : "#eae2cf",
                      border: addedToCart
                        ? "1.5px solid #00f1ff"
                        : "1.5px solid rgba(255,225,109,0.3)",
                      borderRadius: "12px",
                      padding: "14px 32px",
                      fontSize: "15px",
                      fontWeight: 600,
                      cursor: "pointer",
                      width: "100%",
                      minHeight: "54px",
                      letterSpacing: "0.02em",
                      transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                    }}
                    onMouseEnter={(e) => {
                      if (!addedToCart) {
                        (e.currentTarget as HTMLElement).style.borderColor = "#ffe16d";
                        (e.currentTarget as HTMLElement).style.color = "#ffe16d";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!addedToCart) {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,225,109,0.3)";
                        (e.currentTarget as HTMLElement).style.color = "#eae2cf";
                      }
                    }}
                    onFocus={(e) =>
                      ((e.currentTarget as HTMLElement).style.outline = "2px solid #ffe16d")
                    }
                    onBlur={(e) =>
                      ((e.currentTarget as HTMLElement).style.outline = "none")
                    }
                  >
                    {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
                  </button>
                </div>

                {/* Trust Badges */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                    paddingTop: "8px",
                    borderTop: "1px solid rgba(255,225,109,0.08)",
                  }}
                >
                  {[
                    { icon: "🍫", label: "Premium Belgian Chocolate" },
                    { icon: "🎂", label: "Handcrafted Daily" },
                    { icon: "📦", label: "Luxury Gift Packaging" },
                    { icon: "🚚", label: "Same-Day Delivery" },
                  ].map((b) => (
                    <div
                      key={b.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "12px",
                        background: "#231f14",
                        borderRadius: "10px",
                        border: "1px solid rgba(255,225,109,0.06)",
                      }}
                    >
                      <span style={{ fontSize: "18px" }}>{b.icon}</span>
                      <span style={{ fontSize: "12px", color: "#d0c6ab", fontWeight: 500, lineHeight: 1.4 }}>
                        {b.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div
                  style={{
                    padding: "24px",
                    background: "#231f14",
                    borderRadius: "16px",
                    border: "1px solid rgba(255,225,109,0.08)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Epilogue', sans-serif",
                      fontSize: "18px",
                      fontWeight: 600,
                      color: "#eae2cf",
                      marginBottom: "12px",
                    }}
                  >
                    The Art of Decadence
                  </h3>
                  <p style={{ fontSize: "15px", color: "#d0c6ab", lineHeight: 1.8 }}>
                    Our philosophy is rooted in the belief that luxury should be felt before it is
                    tasted. Deep, rich, and unapologetically bold—this is chocolate elevated to high
                    art. Each cake features a dark chocolate ganache drip, mocha frosting, a lit gold
                    candle, and hand-shaved chocolate curls, presented on a gilded board.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* REVIEWS SECTION */}
          <section
            style={{
              background: "#231f14",
              padding: "80px 24px",
              borderTop: "1px solid rgba(255,225,109,0.08)",
              borderBottom: "1px solid rgba(255,225,109,0.08)",
            }}
          >
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "56px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "0.18em",
                    fontWeight: 600,
                    color: "#ffe16d",
                    display: "block",
                    marginBottom: "16px",
                  }}
                >
                  Exquisite Indulgence Awaits
                </span>
                <h2
                  style={{
                    fontFamily: "'Epilogue', sans-serif",
                    fontSize: "clamp(28px, 5vw, 44px)",
                    fontWeight: 700,
                    color: "#eae2cf",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    marginBottom: "16px",
                  }}
                >
                  Velours
                </h2>
                <p style={{ fontSize: "16px", color: "#d0c6ab", maxWidth: "480px", margin: "0 auto" }}>
                  Masterpieces of flavor and form. Loved by 10,000+ connoisseurs across India.
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    marginTop: "20px",
                  }}
                >
                  <div style={{ display: "flex" }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} width="20" height="20" viewBox="0 0 24 24" fill="#ffe16d">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <span style={{ fontSize: "16px", color: "#d0c6ab", fontWeight: 500 }}>
                    4.9 · 10,000+ happy customers
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "24px",
                }}
              >
                {reviews.map((r, i) => (
                  <div
                    key={r.name}
                    onMouseEnter={() => setHoveredReview(i)}
                    onMouseLeave={() => setHoveredReview(null)}
                    style={{
                      background: "#161308",
                      border:
                        hoveredReview === i
                          ? "1px solid rgba(255,225,109,0.3)"
                          : "1px solid rgba(255,225,109,0.08)",
                      borderRadius: "20px",
                      padding: "32px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "20px",
                      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                      transform: hoveredReview === i ? "translateY(-4px)" : "translateY(0)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <StarRating rating={r.rating} />
                      <span style={{ fontSize: "12px", color: "#4a4235" }}>{r.date}</span>
                    </div>
                    <p
                      style={{
                        fontSize: "15px",
                        color: "#d0c6ab",
                        lineHeight: 1.8,
                        fontStyle: "italic",
                        flex: 1,
                      }}
                    >
                      "{r.text}"
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #ffe16d 0%, #ffb2bf 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "16px",
                          fontWeight: 700,
                          color: "#161308",
                          flexShrink: 0,
                        }}
                      >
                        {r.name[0]}
                      </div>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: "#eae2cf" }}>{r.name}</p>
                        <p style={{ fontSize: "12px", color: "#d0c6ab" }}>{r.location}</p>
                      </div>
                      <div
                        style={{
                          marginLeft: "auto",
                          background: "rgba(0,241,255,0.1)",
                          color: "#00f1ff",
                          fontSize: "10px",
                          fontWeight: 600,
                          padding: "3px 8px",
                          borderRadius: "20px",
                          letterSpacing: "0.06em",
                        }}
                      >
                        VERIFIED
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* RELATED PRODUCTS SECTION */}
          <section style={{ padding: "80px 24px" }}>
            <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginBottom: "48px",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.18em",
                      fontWeight: 600,
                      color: "#ffe16d",
                      display: "block",
                      marginBottom: "8px",
                    }}
                  >
                    Explore
                  </span>
                  <h2
                    style={{
                      fontFamily: "'Epilogue', sans-serif",
                      fontSize: "clamp(24px, 4vw, 40px)",
                      fontWeight: 700,
                      color: "#eae2cf",
                      lineHeight: 1.1,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Celebrate Uniquely
                  </h2>
                </div>
                <button
                  onClick={() => router.push("/shop")}
                  style={{
                    background: "none",
                    border: "1px solid rgba(255,225,109,0.3)",
                    borderRadius: "8px",
                    padding: "10px 20px",
                    color: "#ffe16d",
                    fontSize: "14px",
                    fontWeight: 600,
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                    minHeight: "44px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#ffe16d";
                    (e.currentTarget as HTMLElement).style.color = "#161308";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "none";
                    (e.currentTarget as HTMLElement).style.color = "#ffe16d";
                  }}
                >
                  Shop Now →
                </button>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: "24px",
                }}
              >
                {relatedProducts.map((p, i) => (
                  <div
                    key={p.name}
                    onMouseEnter={() => setHoveredRelated(i)}
                    onMouseLeave={() => setHoveredRelated(null)}
                    style={{
                      background: "#231f14",
                      borderRadius: "20px",
                      overflow: "hidden",
                      border:
                        hoveredRelated === i
                          ? "1px solid rgba(255,225,109,0.3)"
                          : "1px solid rgba(255,225,109,0.08)",
                      transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                      transform: hoveredRelated === i ? "translateY(-4px)" : "translateY(0)",
                      cursor: "pointer",
                    }}
                    onClick={() =>
                      router.push(
                        `/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`
                      )
                    }
                  >
                    <div
                      style={{
                        aspectRatio: "4/3",
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <img
                        src={p.img}
                        alt={`${p.name} — Velours artisan chocolate cake`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s cubic-bezier(0.4,0,0.2,1)",
                          transform: hoveredRelated === i ? "scale(1.06)" : "scale(1)",
                        }}
                      />
                    </div>
                    <div style={{ padding: "24px" }}>
                      <h3
                        style={{
                          fontFamily: "'Epilogue', sans-serif",
                          fontSize: "18px",
                          fontWeight: 600,
                          color: "#eae2cf",
                          marginBottom: "8px",
                        }}
                      >
                        {p.name}
                      </h3>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ fontSize: "20px", fontWeight: 700, color: "#ffe16d" }}>
                          ₹{p.price.toLocaleString("en-IN")}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/product?name=${encodeURIComponent(p.name)}&price=${p.price}&img=${encodeURIComponent(p.img)}`
                            );
                          }}
                          style={{
                            background: "none",
                            border: "1px solid rgba(255,225,109,0.3)",
                            borderRadius: "8px",
                            padding: "8px 16px",
                            color: "#ffe16d",
                            fontSize: "13px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                            minHeight: "44px",
                          }}
                          onMouseEnter={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "#ffe16d";
                            (e.currentTarget as HTMLElement).style.color = "#161308";
                          }}
                          onMouseLeave={(e) => {
                            (e.currentTarget as HTMLElement).style.background = "none";
                            (e.currentTarget as HTMLElement).style.color = "#ffe16d";
                          }}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BESPOKE SECTION */}
          <section
            style={{
              background: "#231f14",
              padding: "80px 24px",
              borderTop: "1px solid rgba(255,225,109,0.08)",
            }}
          >
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  fontWeight: 600,
                  color: "#ffe16d",
                  display: "block",
                  marginBottom: "16px",
                }}
              >
                Bespoke Creations
              </span>
              <h2
                style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontSize: "clamp(28px, 5vw, 48px)",
                  fontWeight: 700,
                  color: "#eae2cf",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "20px",
                }}
              >
                Commission a Masterpiece
              </h2>
              <p
                style={{
                  fontSize: "17px",
                  color: "#d0c6ab",
                  lineHeight: 1.8,
                  maxWidth: "560px",
                  margin: "0 auto 36px",
                }}
              >
                Commission a bespoke creation tailored to your most exclusive events. Our master
                patissiers await your vision.
              </p>
              <button
                onClick={() => router.push("/shop")}
                style={{
                  background: "linear-gradient(135deg, #ffe16d 0%, #ffb2bf 100%)",
                  color: "#161308",
                  border: "none",
                  borderRadius: "12px",
                  padding: "16px 40px",
                  fontSize: "16px",
                  fontWeight: 700,
                  cursor: "pointer",
                  minHeight: "54px",
                  letterSpacing: "0.02em",
                  fontFamily: "'Epilogue', sans-serif",
                  transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(255,225,109,0.25)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
                onFocus={(e) =>
                  ((e.currentTarget as HTMLElement).style.outline = "2px solid #ffe16d")
                }
                onBlur={(e) =>
                  ((e.currentTarget as HTMLElement).style.outline = "none")
                }
              >
                Inquire Now
              </button>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer
          style={{
            background: "#0e0c05",
            borderTop: "1px solid rgba(255,225,109,0.08)",
            padding: "48px 24px",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "40px",
            }}
          >
            <div>
              <button
                onClick={() => router.push("/")}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "'Epilogue', sans-serif",
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#ffe16d",
                  padding: 0,
                  marginBottom: "12px",
                  display: "block",
                }}
              >
                Velours
              </button>
              <p style={{ fontSize: "14px", color: "#d0c6ab", lineHeight: 1.7 }}>
                Bold. Decadent. Unapologetically Indulgent.
              </p>
            </div>
            <div>
              <h4
                style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#eae2cf",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Explore
              </h4>
              {["Shop", "Signature Collection", "Bespoke Orders"].map((l) => (
                <button
                  key={l}
                  onClick={() => router.push(l === "Shop" ? "/shop" : "/")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#d0c6ab",
                    fontSize: "14px",
                    display: "block",
                    marginBottom: "10px",
                    padding: 0,
                    textAlign: "left",
                    transition: "color 0.2s cubic-bezier(0.4,0,0.2,1)",
                    minHeight: "28px",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ffe16d")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#d0c6ab")}
                >
                  {l}
                </button>
              ))}
            </div>
            <div>
              <h4
                style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#eae2cf",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Help
              </h4>
              {["Delivery Info", "Returns", "Contact Us"].map((l) => (
                <button
                  key={l}
                  onClick={() => router.push("/")}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#d0c6ab",
                    fontSize: "14px",
                    display: "block",
                    marginBottom: "10px",
                    padding: 0,
                    textAlign: "left",
                    transition: "color 0.2s cubic-bezier(0.4,0,0.2,1)",
                    minHeight: "28px",
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#ffe16d")}
                  onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#d0c6ab")}
                >
                  {l}
                </button>
              ))}
            </div>
            <div>
              <h4
                style={{
                  fontFamily: "'Epilogue', sans-serif",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#eae2cf",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                Connect
              </h4>
              <p style={{ fontSize: "14px", color: "#d0c6ab", lineHeight: 1.7 }}>
                hello@velours.in
                <br />
                +91 98765 43210
                <br />
                Made in India 🇮🇳
              </p>
            </div>
          </div>
          <div
            style={{
              maxWidth: "1280px",
              margin: "32px auto 0",
              paddingTop: "24px",
              borderTop: "1px solid rgba(255,225,109,0.06)",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <p style={{ fontSize: "12px", color: "#4a4235" }}>
              © 2024 Velours. All rights reserved.
            </p>
            <p style={{ fontSize: "12px", color: "#4a4235" }}>Payments secured by Razorpay</p>
          </div>
        </footer>
      </div>

      {/* STICKY MOBILE BOTTOM BAR */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(22,19,8,0.97)",
          backdropFilter: "blur(12px)",
          borderTop: "1px solid rgba(255,225,109,0.15)",
          padding: "12px 16px",
          display: "flex",
          gap: "10px",
          alignItems: "center",
        }}
        className="flex md:hidden"
      >
        <div style={{ flex: "0 0 auto" }}>
          <p style={{ fontSize: "10px", color: "#d0c6ab", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Total
          </p>
          <p style={{ fontSize: "20px", fontWeight: 700, color: "#ffe16d", lineHeight: 1 }}>
            ₹{(productPrice * quantity).toLocaleString("en-IN")}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          style={{
            flex: 1,
            background: addedToCart ? "#231f14" : "transparent",
            color: addedToCart ? "#00f1ff" : "#eae2cf",
            border: addedToCart ? "1.5px solid #00f1ff" : "1.5px solid rgba(255,225,109,0.4)",
            borderRadius: "10px",
            padding: "12px",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            minHeight: "48px",
            transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          {addedToCart ? "✓ Added" : "Add to Cart"}
        </button>
        <button
          onClick={handleBuyNow}
          style={{
            flex: 2,
            background: "#ffe16d",
            color: "#161308",
            border: "none",
            borderRadius: "10px",
            padding: "12px",
            fontSize: "14px",
            fontWeight: 700,
            cursor: "pointer",
            minHeight: "48px",
            fontFamily: "'Epilogue', sans-serif",
            transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#ffd93d")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "#ffe16d")}
        >
          Buy Now
        </button>
      </div>
    </>
  );
}

export default function ProductPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading...</div>}>
      <ProductContent />
    </Suspense>
  );
}
