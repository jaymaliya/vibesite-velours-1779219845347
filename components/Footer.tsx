"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [emailError, setEmailError] = useState("");
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setEmailError("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    setSubscribed(true);
    setEmail("");
  };

  const footerLinkStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.875rem",
    color: "#d0c6ab",
    fontFamily: "Inter, sans-serif",
    padding: "0.25rem 0",
    textAlign: "left",
    display: "block",
    transition: "color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
    lineHeight: 1.6,
  };

  const sectionHeadingStyle: React.CSSProperties = {
    fontFamily: "Epilogue, sans-serif",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#ffe16d",
    marginBottom: "1rem",
  };

  return (
    <footer
      style={{
        background: "#161308",
        borderTop: "1px solid rgba(255, 225, 109, 0.1)",
        fontFamily: "Inter, sans-serif",
      }}
      aria-label="Site footer"
    >
      {/* Top Footer */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "4rem 1.5rem 2.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "3rem",
        }}
      >
        {/* Brand Column */}
        <div style={{ gridColumn: "span 1" }}>
          <button
            onClick={() => router.push("/")}
            aria-label="Velours home"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              marginBottom: "1rem",
              display: "block",
            }}
          >
            <span
              style={{
                fontFamily: "Epilogue, sans-serif",
                fontSize: "1.75rem",
                fontWeight: 800,
                letterSpacing: "-0.04em",
                textTransform: "uppercase",
                color: "#ffe16d",
                lineHeight: 1,
              }}
            >
              Velours
            </span>
          </button>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#d0c6ab",
              lineHeight: 1.7,
              marginBottom: "1.5rem",
              maxWidth: "260px",
            }}
          >
            Bold. Decadent. Unapologetically Indulgent. Handcrafted chocolate
            cakes made with the finest ingredients, delivered across India.
          </p>
          {/* Social Icons */}
          <div style={{ display: "flex", gap: "0.875rem", alignItems: "center" }}>
            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Velours on Instagram"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                border: "1.5px solid rgba(255, 225, 109, 0.25)",
                color: "#d0c6ab",
                transition:
                  "border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#ffe16d";
                (e.currentTarget as HTMLElement).style.color = "#ffe16d";
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255, 225, 109, 0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255, 225, 109, 0.25)";
                (e.currentTarget as HTMLElement).style.color = "#d0c6ab";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Twitter / X */}
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Velours on Twitter"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                border: "1.5px solid rgba(255, 225, 109, 0.25)",
                color: "#d0c6ab",
                transition:
                  "border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#ffe16d";
                (e.currentTarget as HTMLElement).style.color = "#ffe16d";
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255, 225, 109, 0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255, 225, 109, 0.25)";
                (e.currentTarget as HTMLElement).style.color = "#d0c6ab";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
              </svg>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Velours on WhatsApp"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "38px",
                height: "38px",
                borderRadius: "50%",
                border: "1.5px solid rgba(255, 225, 109, 0.25)",
                color: "#d0c6ab",
                transition:
                  "border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1), background 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "#ffe16d";
                (e.currentTarget as HTMLElement).style.color = "#ffe16d";
                (e.currentTarget as HTMLElement).style.background =
                  "rgba(255, 225, 109, 0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(255, 225, 109, 0.25)";
                (e.currentTarget as HTMLElement).style.color = "#d0c6ab";
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 style={sectionHeadingStyle}>Quick Links</h3>
          <nav aria-label="Footer quick links" style={{ display: "flex", flexDirection: "column" }}>
            <button
              onClick={() => router.push("/")}
              style={footerLinkStyle}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffe16d")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#d0c6ab")
              }
            >
              Home
            </button>
            <button
              onClick={() => router.push("/shop")}
              style={footerLinkStyle}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffe16d")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#d0c6ab")
              }
            >
              Shop
            </button>
            <button
              onClick={() => router.push("/occasions")}
              style={footerLinkStyle}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffe16d")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#d0c6ab")
              }
            >
              Occasions
            </button>
            <button
              onClick={() => router.push("/")}
              style={footerLinkStyle}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffe16d")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#d0c6ab")
              }
            >
              Our Story
            </button>
            <button
              onClick={() => router.push("/contact")}
              style={footerLinkStyle}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffe16d")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#d0c6ab")
              }
            >
              Contact
            </button>
          </nav>
        </div>

        {/* Support */}
        <div>
          <h3 style={sectionHeadingStyle}>Support</h3>
          <nav aria-label="Footer support links" style={{ display: "flex", flexDirection: "column" }}>
            <button
              onClick={() => router.push("/faq")}
              style={footerLinkStyle}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffe16d")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#d0c6ab")
              }
            >
              FAQ
            </button>
            <button
              onClick={() => router.push("/shipping")}
              style={footerLinkStyle}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffe16d")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#d0c6ab")
              }
            >
              Shipping &amp; Delivery
            </button>
            <button
              onClick={() => router.push("/returns")}
              style={footerLinkStyle}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffe16d")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#d0c6ab")
              }
            >
              Returns Policy
            </button>
            <button
              onClick={() => router.push("/privacy")}
              style={footerLinkStyle}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffe16d")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#d0c6ab")
              }
            >
              Privacy Policy
            </button>
            <button
              onClick={() => router.push("/terms")}
              style={footerLinkStyle}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "#ffe16d")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "#d0c6ab")
              }
            >
              Terms of Service
            </button>
          </nav>
        </div>

        {/* Newsletter */}
        <div>
          <h3 style={sectionHeadingStyle}>Stay in the Loop</h3>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#d0c6ab",
              lineHeight: 1.65,
              marginBottom: "1.25rem",
            }}
          >
            Be first to know about new creations, seasonal specials &amp;
            exclusive offers.
          </p>
          {subscribed ? (
            <div
              role="status"
              aria-live="polite"
              style={{
                padding: "0.875rem 1.125rem",
                background: "rgba(255, 225, 109, 0.1)",
                border: "1px solid rgba(255, 225, 109, 0.3)",
                borderRadius: "0.75rem",
                color: "#ffe16d",
                fontSize: "0.875rem",
                fontWeight: 600,
                lineHeight: 1.5,
              }}
            >
              You are on the list! Expect something delicious soon.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} noValidate aria-label="Newsletter subscription form">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.625rem",
                }}
              >
                <label
                  htmlFor="newsletter-email"
                  style={{
                    fontSize: "0.75rem",
                    color: "#d0c6ab",
                    fontWeight: 500,
                  }}
                >
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  placeholder="you@example.com"
                  aria-describedby={emailError ? "newsletter-error" : undefined}
                  aria-invalid={!!emailError}
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    border: emailError
                      ? "1.5px solid #ef4444"
                      : "1.5px solid rgba(255, 225, 109, 0.2)",
                    borderRadius: "0.625rem",
                    padding: "0.75rem 1rem",
                    color: "#eae2cf",
                    fontSize: "0.875rem",
                    fontFamily: "Inter, sans-serif",
                    outline: "none",
                    width: "100%",
                    boxSizing: "border-box",
                    transition: "border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onFocus={(e) => {
                    if (!emailError) {
                      e.target.style.borderColor = "rgba(255, 225, 109, 0.6)";
                    }
                  }}
                  onBlur={(e) => {
                    if (!emailError) {
                      e.target.style.borderColor = "rgba(255, 225, 109, 0.2)";
                    }
                  }}
                />
                {emailError && (
                  <p
                    id="newsletter-error"
                    role="alert"
                    style={{
                      fontSize: "0.75rem",
                      color: "#ef4444",
                      margin: 0,
                    }}
                  >
                    {emailError}
                  </p>
                )}
                <button
                  type="submit"
                  style={{
                    background: "#ffe16d",
                    color: "#161308",
                    border: "none",
                    borderRadius: "0.625rem",
                    padding: "0.75rem 1.5rem",
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "Inter, sans-serif",
                    cursor: "pointer",
                    transition:
                      "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "scale(1.02)";
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 4px 20px rgba(255, 225, 109, 0.35)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "none";
                  }}
                  onMouseDown={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "scale(0.98)";
                  }}
                  onMouseUp={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "scale(1.02)";
                  }}
                >
                  Subscribe
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Divider */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
        }}
      >
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(to right, transparent, rgba(255, 225, 109, 0.15), transparent)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* Bottom Footer */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "1.5rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.75rem",
        }}
      >
        <p
          style={{
            fontSize: "0.8125rem",
            color: "#d0c6ab",
            opacity: 0.7,
            margin: 0,
            fontFamily: "Inter, sans-serif",
          }}
        >
          &copy; {currentYear} Velours. All rights reserved. Made with love in India.
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1.25rem",
          }}
        >
          <span
            style={{
              fontSize: "0.8125rem",
              color: "#d0c6ab",
              opacity: 0.6,
              fontFamily: "Inter, sans-serif",
            }}
          >
            Payments secured by Razorpay
          </span>
          {/* Razorpay-style text badge */}
          <span
            style={{
              fontSize: "0.7rem",
              fontWeight: 700,
              color: "#ffe16d",
              letterSpacing: "0.06em",
              background: "rgba(255, 225, 109, 0.1)",
              border: "1px solid rgba(255, 225, 109, 0.2)",
              borderRadius: "0.375rem",
              padding: "0.2rem 0.5rem",
            }}
          >
            ₹ INR
          </span>
        </div>
      </div>
    </footer>
  );
}