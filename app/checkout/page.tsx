"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { useState, useEffect, useRef, Suspense } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const shippingCost = totalPrice > 500 ? 0 : 150;
  const orderTotal = totalPrice + shippingCost;

  useEffect(() => {
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

  function validate() {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required.";
    if (!lastName.trim()) newErrors.lastName = "Last name is required.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Valid email is required.";
    if (!phone.trim() || !/^\d{10}$/.test(phone))
      newErrors.phone = "Valid 10-digit phone number is required.";
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!city.trim()) newErrors.city = "City is required.";
    if (!state.trim()) newErrors.state = "State is required.";
    if (!zip.trim() || !/^\d{6}$/.test(zip))
      newErrors.zip = "Valid 6-digit PIN code is required.";
    return newErrors;
  }

  async function handlePay() {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: orderTotal }),
      });
      const order = await res.json();
      const rzp = new (window as any).Razorpay({
        key: "rzp_test_",
        amount: order.amount,
        currency: "INR",
        name: "Velours",
        description: "Order Payment",
        handler: () => {
          clearCart();
          router.push("/");
        },
      });
      rzp.open();
    } catch (e) {
      alert("Payment initialization failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = (field: string): React.CSSProperties => ({
    backgroundColor: "transparent",
    border: "none",
    borderBottom: errors[field] ? "1px solid #ef4444" : "1px solid #4d4732",
    color: "#eae2cf",
    padding: "8px 0",
    width: "100%",
    transition: "border-color 0.3s ease",
    fontFamily: "inherit",
    fontSize: "inherit",
    outline: "none",
  });

  const labelStyle: React.CSSProperties = {
    color: "#999077",
    fontSize: "10px",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontWeight: 500,
  };

  if (items.length === 0) {
    return (
      <div
        style={{ background: "#0f0e0b", minHeight: "100vh" }}
        className="flex flex-col items-center justify-center gap-6"
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0"
          rel="stylesheet"
        />
        <p style={{ color: "#eae2cf", fontFamily: "Playfair Display, serif", fontSize: "24px" }}>
          Your cart is empty.
        </p>
        <button
          onClick={() => router.push("/shop")}
          style={{
            background: "#fff6df",
            color: "#1a1710",
            borderRadius: "9999px",
            padding: "14px 36px",
            fontWeight: 600,
            fontSize: "12px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            border: "none",
            cursor: "pointer",
            transition: "transform 0.25s cubic-bezier(0.4,0,0.2,1), box-shadow 0.25s cubic-bezier(0.4,0,0.2,1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          }}
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,300,0,0"
        rel="stylesheet"
      />
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
          font-family: 'Material Symbols Outlined';
        }
        .material-symbols-outlined.filled {
          font-variation-settings: 'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24;
        }
        .noir-input {
          background-color: transparent;
          border: none;
          border-bottom: 1px solid #4d4732;
          color: #eae2cf;
          padding: 8px 0;
          width: 100%;
          transition: border-color 0.3s ease;
          font-family: inherit;
        }
        .noir-input:focus {
          outline: none;
          border-bottom-color: #fff6df;
          box-shadow: none;
        }
        .noir-input::placeholder {
          color: #999077;
        }
        .noir-input-error {
          border-bottom-color: #ef4444 !important;
        }
        .is-hidden {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .visible {
          opacity: 1;
          transform: translateY(0);
        }
        .page-enter {
          animation: fadeInUp 0.5s ease forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        className="page-enter"
        style={{
          background: "#0f0e0b",
          color: "#eae2cf",
          fontFamily: "Inter, sans-serif",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        {/* Header */}
        <header
          style={{
            borderBottom: "1px solid rgba(77,71,50,0.2)",
            padding: "24px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <a
            onClick={() => router.push("/")}
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(24px, 4vw, 36px)",
              color: "#fff6df",
              textTransform: "uppercase",
              letterSpacing: "-0.03em",
              cursor: "pointer",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
            aria-label="Return to Homepage"
          >
            Velours
          </a>
        </header>

        {/* Main */}
        <main
          style={{
            flexGrow: 1,
            width: "100%",
            maxWidth: "1440px",
            margin: "0 auto",
            padding: "clamp(32px, 6vw, 80px) clamp(16px, 4vw, 80px)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(1, 1fr)",
              gap: "48px",
            }}
            className="checkout-grid"
          >
            {/* Left: Shipping Form */}
            <section className="reveal" style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div>
                <h1
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "clamp(28px, 3vw, 36px)",
                    color: "#fff6df",
                    marginBottom: "8px",
                    fontWeight: 700,
                  }}
                >
                  Shipping Details
                </h1>
                <p style={{ color: "#999077", fontSize: "14px" }}>
                  Please enter your delivery information.
                </p>
              </div>

              <form
                style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "12px" }}
                onSubmit={(e) => { e.preventDefault(); handlePay(); }}
              >
                {/* Name Row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "24px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="firstName" style={labelStyle}>
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className={`noir-input${errors.firstName ? " noir-input-error" : ""}`}
                    />
                    {errors.firstName && (
                      <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.firstName}</span>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="lastName" style={labelStyle}>
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className={`noir-input${errors.lastName ? " noir-input-error" : ""}`}
                    />
                    {errors.lastName && (
                      <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.lastName}</span>
                    )}
                  </div>
                </div>

                {/* Email & Phone */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "24px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="email" style={labelStyle}>
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`noir-input${errors.email ? " noir-input-error" : ""}`}
                    />
                    {errors.email && (
                      <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.email}</span>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="phone" style={labelStyle}>
                      Phone Number
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                        setPhone(val);
                      }}
                      className={`noir-input${errors.phone ? " noir-input-error" : ""}`}
                    />
                    {errors.phone && (
                      <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.phone}</span>
                    )}
                  </div>
                </div>

                {/* Address */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label htmlFor="address" style={labelStyle}>
                    Street Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    required
                    placeholder="Apartment, suite, unit, etc."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={`noir-input${errors.address ? " noir-input-error" : ""}`}
                  />
                  {errors.address && (
                    <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.address}</span>
                  )}
                </div>

                {/* City, State, ZIP */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "24px",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="city" style={labelStyle}>
                      City
                    </label>
                    <input
                      id="city"
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={`noir-input${errors.city ? " noir-input-error" : ""}`}
                    />
                    {errors.city && (
                      <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.city}</span>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="state" style={labelStyle}>
                      State
                    </label>
                    <input
                      id="state"
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className={`noir-input${errors.state ? " noir-input-error" : ""}`}
                    />
                    {errors.state && (
                      <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.state}</span>
                    )}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    <label htmlFor="zip" style={labelStyle}>
                      PIN Code
                    </label>
                    <input
                      id="zip"
                      type="text"
                      required
                      value={zip}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, "").slice(0, 6);
                        setZip(val);
                      }}
                      className={`noir-input${errors.zip ? " noir-input-error" : ""}`}
                    />
                    {errors.zip && (
                      <span style={{ color: "#ef4444", fontSize: "11px" }}>{errors.zip}</span>
                    )}
                  </div>
                </div>
              </form>
            </section>

            {/* Right: Order Summary */}
            <aside className="reveal" style={{ position: "relative" }}>
              <div
                style={{
                  position: "sticky",
                  top: "24px",
                  background: "rgba(28, 25, 18, 0.85)",
                  border: "1px solid rgba(77,71,50,0.3)",
                  borderRadius: "8px",
                  padding: "clamp(24px, 4vw, 40px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  boxShadow: "0 25px 50px -12px rgba(0,0,0,0.6)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <h2
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "clamp(24px, 2.5vw, 32px)",
                    color: "#eae2cf",
                    borderBottom: "1px solid rgba(77,71,50,0.2)",
                    paddingBottom: "16px",
                    fontWeight: 700,
                  }}
                >
                  Order Summary
                </h2>

                {/* Items */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    borderBottom: "1px solid rgba(77,71,50,0.2)",
                    paddingBottom: "24px",
                  }}
                >
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="group"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          width: "80px",
                          height: "100px",
                          background: "#2a261c",
                          overflow: "hidden",
                          borderRadius: "4px",
                          flexShrink: 0,
                        }}
                      >
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              opacity: 0.9,
                              transition: "opacity 0.5s ease, transform 0.5s ease",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLImageElement).style.opacity = "1";
                              (e.currentTarget as HTMLImageElement).style.transform = "scale(1.05)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLImageElement).style.opacity = "0.9";
                              (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                            }}
                          />
                        ) : (
                          <div
                            style={{
                              width: "100%",
                              height: "100%",
                              background: "#2a261c",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <span
                              className="material-symbols-outlined"
                              style={{ color: "#999077", fontSize: "24px" }}
                            >
                              cake
                            </span>
                          </div>
                        )}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "center" }}>
                        <h3
                          style={{
                            color: "#eae2cf",
                            fontWeight: 700,
                            fontSize: "15px",
                            fontFamily: "Inter, sans-serif",
                          }}
                        >
                          {item.name}
                        </h3>
                        <p
                          style={{
                            color: "#999077",
                            fontSize: "10px",
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            marginTop: "4px",
                          }}
                        >
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div style={{ color: "#fff6df", fontSize: "14px", fontWeight: 500, whiteSpace: "nowrap" }}>
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#999077", fontSize: "14px" }}>Subtotal</span>
                    <span style={{ color: "#999077", fontSize: "14px" }}>
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ color: "#999077", fontSize: "14px" }}>Shipping</span>
                    <span style={{ color: "#999077", fontSize: "14px" }}>
                      {shippingCost === 0 ? "Free" : `₹${shippingCost}`}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: "12px",
                      paddingTop: "12px",
                      borderTop: "1px solid rgba(77,71,50,0.2)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "clamp(22px, 2vw, 28px)",
                        color: "#eae2cf",
                        fontWeight: 700,
                      }}
                    >
                      Total
                    </span>
                    <span
                      style={{
                        fontFamily: "Playfair Display, serif",
                        fontSize: "clamp(22px, 2vw, 28px)",
                        color: "#fff6df",
                        fontWeight: 700,
                      }}
                    >
                      ₹{orderTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handlePay}
                  disabled={loading}
                  className="btn-lift"
                  style={{
                    width: "100%",
                    marginTop: "12px",
                    background: "#fff6df",
                    color: "#1a1710",
                    fontWeight: 600,
                    fontSize: "11px",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    padding: "16px",
                    borderRadius: "9999px",
                    border: "none",
                    cursor: loading ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    boxShadow: "0 8px 30px rgba(255,246,223,0.15)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    opacity: loading ? 0.7 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow =
                        "0 12px 40px rgba(255,246,223,0.25)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 8px 30px rgba(255,246,223,0.15)";
                  }}
                  onMouseDown={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.98)";
                  }}
                  onMouseUp={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.02)";
                  }}
                >
                  <span
                    className="material-symbols-outlined filled"
                    style={{ fontSize: "18px" }}
                  >
                    lock
                  </span>
                  {loading ? "Processing..." : "Pay with Razorpay"}
                </button>

                {/* Trust Badges */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "16px",
                    marginTop: "12px",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#999077" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                      verified_user
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        fontWeight: 500,
                      }}
                    >
                      Secure Payment
                    </span>
                  </div>
                  <div
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#4d4732",
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#999077" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                      local_fire_department
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        fontWeight: 500,
                      }}
                    >
                      Freshly Baked
                    </span>
                  </div>
                  <div
                    style={{
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      background: "#4d4732",
                    }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#999077" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
                      redeem
                    </span>
                    <span
                      style={{
                        fontSize: "10px",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        fontWeight: 500,
                      }}
                    >
                      Delivered with Care
                    </span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </main>

        {/* Footer */}
        <footer
          style={{
            borderTop: "1px solid rgba(77,71,50,0.2)",
            padding: "24px 0",
            marginTop: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "12px",
          }}
        >
          <p
            style={{
              color: "#999077",
              fontSize: "10px",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              fontWeight: 500,
            }}
          >
            © 2024 Velours. Made in India.
          </p>
        </footer>

        {/* Responsive grid CSS */}
        <style>{`
          @media (min-width: 1024px) {
            .checkout-grid {
              grid-template-columns: 7fr 5fr !important;
              gap: 120px !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}