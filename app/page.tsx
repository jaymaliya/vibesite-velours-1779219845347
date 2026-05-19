"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../components/CartContext";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { addItem } = useCart();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .animate-fadeInUp-1 { animation: fadeInUp 1s ease-out both; }
      .animate-fadeInUp-2 { animation: fadeInUp 1.2s ease-out both; }
      .animate-fadeInUp-3 { animation: fadeInUp 1.4s ease-out both; }
      .animate-fadeInUp-4 { animation: fadeInUp 1.6s ease-out both; }
      .is-hidden { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1); }
      .visible { opacity: 1 !important; transform: translateY(0) !important; }
      html { scroll-behavior: smooth; }
    `;
    document.head.appendChild(style);

    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => el.classList.add("is-hidden"));
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.remove("is-hidden");
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const img1 = "https://lh3.googleusercontent.com/aida-public/AB6AXuAtwwb8FixeU3A7d9l6qS183JyXu9XTzPfrOd7NgjbZZqMvwjaNK795qy1cK3LAoCA4a-EttUb90En8w32be7S3qBOcNjo-jeF0AdgtlZkT7j0pZrPbzu0822cLyo96jDrb8zztNP5zY_jQvkXFUF4dkl-tQIYkrDRMs5DsGzXrtUAn3jpKDaWtwN4WV_MWuXJJfQF41MJnXUAovflSySxSElE__LZ9czhHlJvTDFagiaTz3VB_8YB8CoT4YdScXP2j6eSvkVR5MVtk";
  const img2 = "https://lh3.googleusercontent.com/aida-public/AB6AXuA46VoNCEBEOXiPp4URN6lv0PXN_lX9zC6F1S7R3TDX0X32zNdI_mVl8DdDuywez0FJbMGGOFMDEU0rmEiweK-V-xm6GD0ieQf2skYOCzFvkIcnC6-stni8NlJHUP03-fPgcX22ncF4rA0FOQvaH1U0txS0kTGcaHtt6C1oTY1_J66qy-YhtJb7oPdJq2R7hYr_MGjCGkVnhLUYknIPNYec3dRGMBSnt6WpIDg0Bg1ONe5DKWxF36f35W361oHh_qMcSjFFH6aAKQW4";
  const img3 = "https://lh3.googleusercontent.com/aida-public/AB6AXuCPPQjckaPs4sORQZ-meX5OSl7pJoLldz0wcgUPZO-KofF1xV0jU2dfRGJ88YznQ3tWoHpVyIHmeIu5uK_CZGAI7DktcdQ3k2GxV8-QHONU3XsOYlamKxzkLOn-rLCIrOWZGtjyGXKHDG8iQBNXMH68UZ2RxaL9AT7Olkl9vctEgYJxtl4sO1MTIPcLuGE3mqoXB8LGTI60wowegfLcf-YucmfLVWLw6MvMcYy0Lk5j-PJ44qh5hiMsEupfejw-myYjF1bgtCeZT5vh";
  const img4 = "https://lh3.googleusercontent.com/aida-public/AB6AXuDJop61BalkmYtT6jUH5cspSLaxLYBb5EjA_GFfKlSn2HuvwwWsiXtIC37OicZvEr1hSocSd1babEOsFbpS0bJBbrtSEm1f7Ez5D_LhAaQs_7QiDTc9JFXAQAE6vw-fvLBI8n8ICbOJBOi9H4lNEmSHFE7ZICecP0b7eY5JqC_L02hELdym3xrqgATlpg1rxveB7uYzYntUKUNDkdGMB69hacODb99zTf1ZmihXVYhBoL5fhxBlNRlwgKaQ_-baNT3-EHMigc951u-V";

  return (
    <div
      className="page-enter"
      style={{
        background: "#0a0a0a",
        color: "#f5f0eb",
        fontFamily: "sans-serif",
        overflowX: "hidden",
        minHeight: "100vh",
      }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Inter:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        rel="stylesheet"
      />

      {/* TOP NAV */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px 32px",
          background: "rgba(10,10,10,0.8)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          zIndex: 50,
          transition: "all 0.3s",
        }}
      >
        <button
          onClick={() => router.push("/")}
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "1.75rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "#c9a96e",
            textTransform: "uppercase",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Velours
        </button>

        <div
          style={{
            display: "flex",
            gap: "32px",
          }}
          className="hidden-mobile"
        >
          {["Shop", "Occasions", "Our Story"].map((item) => (
            <button
              key={item}
              onClick={() =>
                item === "Shop" ? router.push("/shop") : undefined
              }
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#9e9082",
                background: "none",
                border: "none",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#c9a96e")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#9e9082")
              }
            >
              {item}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={() => router.push("/checkout")}
            style={{
              color: "#c9a96e",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
          >
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
          <button
            onClick={() => setMobileNavOpen(true)}
            style={{
              color: "#c9a96e",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </nav>

      {/* MOBILE NAV */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          background: "rgba(18,14,12,0.97)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 0 80px rgba(0,0,0,0.8)",
          transition: "transform 0.5s ease-in-out",
          transform: mobileNavOpen ? "translateX(0)" : "translateX(100%)",
          width: "100%",
          maxWidth: "420px",
          marginLeft: "auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.5rem",
              color: "#c9a96e",
            }}
          >
            Velours
          </span>
          <button
            onClick={() => setMobileNavOpen(false)}
            style={{
              color: "#c9a96e",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          {[
            { icon: "storefront", label: "Shop", action: () => { router.push("/shop"); setMobileNavOpen(false); } },
            { icon: "celebration", label: "Occasions", action: () => setMobileNavOpen(false) },
            { icon: "auto_stories", label: "Our Story", action: () => setMobileNavOpen(false) },
            { icon: "shopping_bag", label: "Cart", action: () => { router.push("/checkout"); setMobileNavOpen(false); } },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px",
                color: "#9e9082",
                background: "none",
                border: "none",
                cursor: "pointer",
                borderRadius: "8px",
                transition: "background 0.2s",
                textAlign: "left",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background =
                  "rgba(158,144,130,0.15)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "none")
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: "auto" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "rgba(201,169,110,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: "#c9a96e" }}
              >
                person
              </span>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                }}
              >
                Your Bag
              </p>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.85rem",
                  color: "#9e9082",
                }}
              >
                Exquisite Indulgence Awaits
              </p>
            </div>
          </div>
          <button
            onClick={() => { router.push("/checkout"); setMobileNavOpen(false); }}
            style={{
              width: "100%",
              padding: "16px",
              background: "rgba(201,169,110,0.2)",
              color: "#c9a96e",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = "scale(1.02)")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.transform = "scale(1)")
            }
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {/* MAIN */}
      <main>
        {/* HERO SECTION */}
        <section
          style={{
            position: "relative",
            height: "100vh",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Background Image */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              backgroundImage: `url('${img1}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Gradient Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, #0a0a0a 0%, rgba(10,10,10,0.4) 50%, transparent 100%)",
              zIndex: 1,
            }}
          />

          {/* Hero Content */}
          <div
            style={{
              position: "relative",
              zIndex: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "0 32px",
              marginTop: "80px",
            }}
          >
            <div
              className="animate-fadeInUp-1"
              style={{ marginBottom: "24px" }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "8px 16px",
                  border: "1px solid rgba(201,169,110,0.3)",
                  borderRadius: "9999px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                  background: "rgba(18,14,12,0.5)",
                  backdropFilter: "blur(8px)",
                }}
              >
                Made in India
              </span>
            </div>

            <h1
              className="animate-fadeInUp-2"
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "clamp(4rem, 10vw, 8rem)",
                fontWeight: 900,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "#c9a96e",
                marginBottom: "16px",
                textShadow: "0 4px 32px rgba(0,0,0,0.8)",
                lineHeight: 1,
              }}
            >
              Velours
            </h1>

            <p
              className="animate-fadeInUp-3"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
                color: "rgba(245,240,235,0.9)",
                maxWidth: "42rem",
                marginBottom: "32px",
                lineHeight: 1.6,
              }}
            >
              Bold. Decadent. Unapologetically Indulgent.
            </p>

            <button
              className="btn-lift animate-fadeInUp-4"
              onClick={() => router.push("/shop")}
              style={{
                padding: "16px 32px",
                background: "rgba(201,169,110,0.2)",
                color: "#c9a96e",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                borderRadius: "9999px",
                border: "1px solid rgba(201,169,110,0.4)",
                cursor: "pointer",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                transition:
                  "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 32px rgba(201,169,110,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 4px 24px rgba(0,0,0,0.4)";
              }}
            >
              Shop Now
            </button>
          </div>
        </section>

        {/* CRAFT / ORIGIN STORY */}
        <section
          className="reveal"
          style={{
            padding: "96px 32px",
            background: "#0a0a0a",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: "32px",
              alignItems: "center",
            }}
          >
            {/* Image Column */}
            <div
              style={{
                gridColumn: "span 7",
                height: "min(819px, 80vh)",
                borderRadius: "4px",
                overflow: "hidden",
              }}
              className="story-img-col"
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url('${img2}')`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  transition: "transform 1s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform =
                    "scale(1.05)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.transform =
                    "scale(1)")
                }
              />
            </div>

            {/* Text Column */}
            <div
              style={{
                gridColumn: "span 5",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "24px",
                paddingLeft: "24px",
              }}
            >
              <h2
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "clamp(2rem, 3vw, 2.75rem)",
                  fontWeight: 700,
                  color: "#c9a96e",
                  lineHeight: 1.2,
                }}
              >
                The Art of Decadence
              </h2>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1rem",
                  lineHeight: 1.75,
                  color: "#9e9082",
                }}
              >
                <p>
                  We do not merely bake; we craft experiences of profound
                  indulgence. Every creation at Velours is a testament to the
                  uncompromising pursuit of perfection, merging global techniques
                  with the finest indigenous ingredients.
                </p>
                <p>
                  Our philosophy is rooted in the belief that luxury should be
                  felt before it is tasted. Deep, rich, and unapologetically
                  bold—this is chocolate elevated to high art.
                </p>
              </div>

              <div>
                <button
                  onClick={() => router.push("/shop")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#c9a96e",
                    fontFamily: "Inter, sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    background: "none",
                    border: "none",
                    borderBottom: "1px solid #c9a96e",
                    paddingBottom: "4px",
                    cursor: "pointer",
                    transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#e8c98a")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#c9a96e")
                  }
                >
                  <span>Discover Our Process</span>
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* PRODUCT SHOWCASE */}
        <section
          className="reveal"
          style={{
            padding: "96px 32px",
            background: "#0d0b09",
          }}
        >
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
            }}
          >
            {/* Section Header */}
            <div
              style={{
                textAlign: "center",
                marginBottom: "64px",
              }}
            >
              <h2
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "clamp(2rem, 3vw, 2.75rem)",
                  fontWeight: 700,
                  color: "#c9a96e",
                  marginBottom: "12px",
                }}
              >
                Signature Collection
              </h2>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "1rem",
                  color: "#9e9082",
                }}
              >
                Masterpieces of flavor and form.
              </p>
            </div>

            {/* Product Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "32px",
              }}
            >
              {/* Product 1 */}
              <div
                className="card-hover"
                style={{
                  position: "relative",
                  aspectRatio: "4/5",
                  background: "#111",
                  overflow: "hidden",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition:
                    "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={() => setHoveredCard("mocha")}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() =>
                  router.push(
                    "/product?name=" +
                      encodeURIComponent("Mocha Dream") +
                      "&price=2499&img=" +
                      encodeURIComponent(img3)
                  )
                }
              >
                {/* Background Image */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url('${img3}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    transition: "transform 0.7s ease",
                    transform:
                      hoveredCard === "mocha" ? "scale(1.05)" : "scale(1)",
                  }}
                />
                {/* Gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)",
                    opacity: hoveredCard === "mocha" ? 1 : 0.8,
                    transition: "opacity 0.3s",
                  }}
                />
                {/* Content */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      marginBottom: "12px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "#c9a96e",
                      }}
                    >
                      Mocha Dream
                    </h3>
                    <span
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "rgba(201,169,110,0.8)",
                      }}
                    >
                      ₹2499
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "16px",
                      transition: "transform 0.3s, opacity 0.3s",
                      transform:
                        hoveredCard === "mocha"
                          ? "translateY(0)"
                          : "translateY(16px)",
                      opacity: hoveredCard === "mocha" ? 1 : 0,
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 12px",
                        border: "1px solid rgba(158,144,130,0.4)",
                        borderRadius: "9999px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#9e9082",
                      }}
                    >
                      Best Seller
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          "/product?name=" +
                            encodeURIComponent("Mocha Dream") +
                            "&price=2499&img=" +
                            encodeURIComponent(img3)
                        );
                      }}
                      style={{
                        padding: "8px 24px",
                        border: "1px solid rgba(201,169,110,0.6)",
                        borderRadius: "9999px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#c9a96e",
                        background: "none",
                        cursor: "pointer",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          "rgba(201,169,110,0.1)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          "none")
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div
                className="card-hover"
                style={{
                  position: "relative",
                  aspectRatio: "4/5",
                  background: "#111",
                  overflow: "hidden",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition:
                    "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)",
                }}
                onMouseEnter={() => setHoveredCard("birthday")}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() =>
                  router.push(
                    "/product?name=" +
                      encodeURIComponent("Birthday Celebration") +
                      "&price=1999&img=" +
                      encodeURIComponent(img4)
                  )
                }
              >
                {/* Background Image */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `url('${img4}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    transition: "transform 0.7s ease",
                    transform:
                      hoveredCard === "birthday" ? "scale(1.05)" : "scale(1)",
                  }}
                />
                {/* Gradient */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.2) 50%, transparent 100%)",
                    opacity: hoveredCard === "birthday" ? 1 : 0.8,
                    transition: "opacity 0.3s",
                  }}
                />
                {/* Content */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      marginBottom: "12px",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "#c9a96e",
                      }}
                    >
                      Birthday Celebration
                    </h3>
                    <span
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "rgba(201,169,110,0.8)",
                      }}
                    >
                      ₹1999
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: "16px",
                      transition: "transform 0.3s, opacity 0.3s",
                      transform:
                        hoveredCard === "birthday"
                          ? "translateY(0)"
                          : "translateY(16px)",
                      opacity: hoveredCard === "birthday" ? 1 : 0,
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 12px",
                        border: "1px solid rgba(158,144,130,0.4)",
                        borderRadius: "9999px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#9e9082",
                      }}
                    >
                      Classic
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(
                          "/product?name=" +
                            encodeURIComponent("Birthday Celebration") +
                            "&price=1999&img=" +
                            encodeURIComponent(img4)
                        );
                      }}
                      style={{
                        padding: "8px 24px",
                        border: "1px solid rgba(201,169,110,0.6)",
                        borderRadius: "9999px",
                        fontFamily: "Inter, sans-serif",
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#c9a96e",
                        background: "none",
                        cursor: "pointer",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          "rgba(201,169,110,0.1)")
                      }
                      onMouseLeave={(e) =>
                        ((e.currentTarget as HTMLElement).style.background =
                          "none")
                      }
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CUSTOM ORDER CTA */}
        <section
          className="reveal"
          style={{
            padding: "96px 32px",
            background: "#0a0a0a",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "614px",
            borderTop: "1px solid rgba(201,169,110,0.1)",
          }}
        >
          <h2
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              fontWeight: 900,
              color: "#c9a96e",
              marginBottom: "24px",
              maxWidth: "56rem",
              lineHeight: 1.1,
              letterSpacing: "-0.01em",
            }}
          >
            Celebrate Uniquely
          </h2>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "1rem",
              lineHeight: 1.75,
              color: "#9e9082",
              maxWidth: "42rem",
              marginBottom: "40px",
            }}
          >
            Commission a bespoke creation tailored to your most exclusive
            events. Our master patissiers await your vision.
          </p>
          <button
            className="btn-lift"
            onClick={() => router.push("/shop")}
            style={{
              padding: "16px 32px",
              background: "rgba(201,169,110,0.2)",
              color: "#c9a96e",
              fontFamily: "Inter, sans-serif",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              borderRadius: "9999px",
              border: "1px solid rgba(201,169,110,0.4)",
              cursor: "pointer",
              boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
              transition:
                "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1.02)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 8px 32px rgba(201,169,110,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 4px 24px rgba(0,0,0,0.4)";
            }}
          >
            Inquire Now
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          width: "100%",
          padding: "96px 32px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          gap: "40px",
          background: "#0d0b09",
          borderTop: "1px solid rgba(201,169,110,0.15)",
        }}
      >
        {/* Brand */}
        <div style={{ gridColumn: "span 1" }}>
          <span
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.75rem",
              fontWeight: 700,
              color: "#c9a96e",
              display: "block",
              marginBottom: "16px",
            }}
          >
            Velours
          </span>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.9rem",
              color: "#9e9082",
              lineHeight: 1.7,
              marginBottom: "24px",
            }}
          >
            Bold. Decadent. Unapologetically Indulgent.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#c9a96e",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "16px" }}
            >
              verified
            </span>
            <span
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.65rem",
                fontWeight: 600,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              Made in India
            </span>
          </div>
        </div>

        {/* Explore */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h4
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#c9a96e",
              marginBottom: "8px",
            }}
          >
            Explore
          </h4>
          {["Shop", "Occasions", "Our Story"].map((link) => (
            <button
              key={link}
              onClick={() =>
                link === "Shop" ? router.push("/shop") : undefined
              }
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9rem",
                color: "#9e9082",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#c9a96e")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#9e9082")
              }
            >
              {link}
            </button>
          ))}
        </div>

        {/* Help */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h4
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#c9a96e",
              marginBottom: "8px",
            }}
          >
            Help
          </h4>
          {["Support", "Legal", "Privacy Policy", "Shipping Info"].map(
            (link) => (
              <button
                key={link}
                onClick={() => router.push("/shop")}
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.9rem",
                  color: "#9e9082",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  padding: 0,
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#c9a96e")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.color = "#9e9082")
                }
              >
                {link}
              </button>
            )
          )}
        </div>

        {/* Connect */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <h4
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#c9a96e",
              marginBottom: "8px",
            }}
          >
            Connect
          </h4>
          {["Instagram", "Facebook"].map((link) => (
            <button
              key={link}
              onClick={() => router.push("/shop")}
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: "0.9rem",
                color: "#9e9082",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: 0,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#c9a96e")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "#9e9082")
              }
            >
              {link}
            </button>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            gridColumn: "1 / -1",
            marginTop: "24px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(201,169,110,0.1)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "0.8rem",
              color: "#9e9082",
            }}
          >
            © 2024 Velours. Made in India.
          </p>
        </div>
      </footer>
    </div>
  );
}