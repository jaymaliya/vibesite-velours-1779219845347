"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "./CartContext";

export default function Navbar() {
  const router = useRouter();
  const { totalItems } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prevCount, setPrevCount] = useState(totalItems);
  const [badgePop, setBadgePop] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (totalItems !== prevCount) {
      setPrevCount(totalItems);
      setBadgePop(true);
      const t = setTimeout(() => setBadgePop(false), 400);
      return () => clearTimeout(t);
    }
  }, [totalItems, prevCount]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navLinkStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#d0c6ab",
    fontFamily: "Inter, sans-serif",
    padding: "0.25rem 0",
    transition: "color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  const mobileNavLinkStyle: React.CSSProperties = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.875rem",
    fontWeight: 600,
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#d0c6ab",
    fontFamily: "Inter, sans-serif",
    padding: "0.875rem 1.25rem",
    textAlign: "left",
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    borderRadius: "0.5rem",
    transition: "background 0.2s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(22, 19, 8, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid rgba(255, 225, 109, 0.08)" : "1px solid transparent",
        boxShadow: scrolled
          ? "0 4px 32px rgba(0,0,0,0.45)"
          : "none",
        transition: "box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1), border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <nav
        aria-label="Main navigation"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 1.5rem",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <button
          onClick={() => router.push("/")}
          aria-label="Velours home"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
        >
          <span
            style={{
              fontFamily: "Epilogue, sans-serif",
              fontSize: "1.5rem",
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

        {/* Desktop Nav Links */}
        <nav
          aria-label="Desktop navigation links"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2.5rem",
          }}
          className="hidden md:flex"
        >
          <button
            onClick={() => router.push("/shop")}
            style={navLinkStyle}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#ffe16d")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "#d0c6ab")
            }
            onFocus={(e) =>
              ((e.target as HTMLElement).style.color = "#ffe16d")
            }
            onBlur={(e) =>
              ((e.target as HTMLElement).style.color = "#d0c6ab")
            }
          >
            Shop
          </button>
          <button
            onClick={() => router.push("/occasions")}
            style={navLinkStyle}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#ffe16d")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "#d0c6ab")
            }
            onFocus={(e) =>
              ((e.target as HTMLElement).style.color = "#ffe16d")
            }
            onBlur={(e) =>
              ((e.target as HTMLElement).style.color = "#d0c6ab")
            }
          >
            Occasions
          </button>
          <button
            onClick={() => router.push("/")}
            style={navLinkStyle}
            onMouseEnter={(e) =>
              ((e.target as HTMLElement).style.color = "#ffe16d")
            }
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.color = "#d0c6ab")
            }
            onFocus={(e) =>
              ((e.target as HTMLElement).style.color = "#ffe16d")
            }
            onBlur={(e) =>
              ((e.target as HTMLElement).style.color = "#d0c6ab")
            }
          >
            Our Story
          </button>
        </nav>

        {/* Right side: Cart + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Cart Button */}
          <button
            onClick={() => router.push("/cart")}
            aria-label={`Shopping cart, ${totalItems} item${totalItems !== 1 ? "s" : ""}`}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              position: "relative",
              color: "#ffe16d",
              padding: "0.375rem",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#ffb2bf")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#ffe16d")
            }
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {totalItems > 0 && (
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  background: "#ef4444",
                  color: "#fff",
                  borderRadius: "9999px",
                  minWidth: "18px",
                  height: "18px",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 3px",
                  lineHeight: 1,
                  transform: badgePop ? "scale(1.35)" : "scale(1)",
                  transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  border: "1.5px solid #161308",
                }}
              >
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setMobileOpen((v) => !v)}
            className="md:hidden"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#ffe16d",
              padding: "0.375rem",
              borderRadius: "0.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {mobileOpen ? (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-nav-menu"
        ref={mobileMenuRef}
        aria-hidden={!mobileOpen}
        className="md:hidden"
        style={{
          overflow: "hidden",
          maxHeight: mobileOpen ? "400px" : "0px",
          transition: "max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          background: "rgba(35, 31, 20, 0.98)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderTop: mobileOpen ? "1px solid rgba(255, 225, 109, 0.1)" : "none",
        }}
      >
        <nav
          aria-label="Mobile navigation links"
          style={{
            padding: "0.75rem 1rem 1.25rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          <button
            onClick={() => {
              router.push("/shop");
              setMobileOpen(false);
            }}
            style={mobileNavLinkStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255, 225, 109, 0.08)";
              (e.currentTarget as HTMLElement).style.color = "#ffe16d";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "none";
              (e.currentTarget as HTMLElement).style.color = "#d0c6ab";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            Shop
          </button>

          <button
            onClick={() => {
              router.push("/occasions");
              setMobileOpen(false);
            }}
            style={mobileNavLinkStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255, 225, 109, 0.08)";
              (e.currentTarget as HTMLElement).style.color = "#ffe16d";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "none";
              (e.currentTarget as HTMLElement).style.color = "#d0c6ab";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z" />
              <path d="M12 6v6l4 2" />
            </svg>
            Occasions
          </button>

          <button
            onClick={() => {
              router.push("/");
              setMobileOpen(false);
            }}
            style={mobileNavLinkStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255, 225, 109, 0.08)";
              (e.currentTarget as HTMLElement).style.color = "#ffe16d";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "none";
              (e.currentTarget as HTMLElement).style.color = "#d0c6ab";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
            Our Story
          </button>

          <button
            onClick={() => {
              router.push("/cart");
              setMobileOpen(false);
            }}
            style={mobileNavLinkStyle}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background =
                "rgba(255, 225, 109, 0.08)";
              (e.currentTarget as HTMLElement).style.color = "#ffe16d";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "none";
              (e.currentTarget as HTMLElement).style.color = "#d0c6ab";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Cart
            {totalItems > 0 && (
              <span
                style={{
                  marginLeft: "auto",
                  background: "#ef4444",
                  color: "#fff",
                  borderRadius: "9999px",
                  minWidth: "20px",
                  height: "20px",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 4px",
                }}
              >
                {totalItems}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}