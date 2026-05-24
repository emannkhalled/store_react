import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiMenu, FiX, FiShoppingBag, FiSun, FiMoon, FiUser, FiLogOut } from "react-icons/fi";

function Navbar({ cartCount, theme, setTheme, user, logoutUser, hasVisited }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const links = [
    { to: "/home", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    height: "70px",
    transition: "all 0.3s ease",
    background: scrolled
      ? (theme === "light" ? "rgba(255,255,255,0.85)" : "rgba(10,10,15,0.85)")
      : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
    boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.05)" : "none",
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      style={navStyle}
    >
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 24px",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        {/* Logo */}
        <Link to="/home" style={{ textDecoration: "none" }}>
          <motion.div
            whileHover={{ scale: 1.05 }}
            style={{ display: "flex", alignItems: "center", gap: "14px" }}
          >
            <div style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <svg viewBox="0 0 100 100" width="38" height="38" style={{ filter: "drop-shadow(0 0 8px var(--border-glow))" }}>
                <defs>
                  <linearGradient id="nav-bag-outline" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--accent)" />
                    <stop offset="100%" stopColor="var(--primary)" />
                  </linearGradient>
                  <linearGradient id="nav-bag-body" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--primary-light)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
                <path d="M35,38 C35,18 65,18 65,38" fill="none" stroke="url(#nav-bag-outline)" strokeWidth="4.5" strokeLinecap="round" />
                <path d="M24,38 L76,38 L81,84 C81,89 77,93 72,93 L28,93 C23,93 19,89 19,84 Z" fill="url(#nav-bag-body)" stroke="url(#nav-bag-outline)" strokeWidth="3" strokeLinejoin="round" />
                <polygon points="50,53 53,60 60,61 55,66 56,73 50,69 44,73 45,66 40,61 47,60" fill="var(--text-primary)" />
              </svg>
            </div>
            <span style={{
              fontSize: "1.45rem",
              fontWeight: 900,
              letterSpacing: "-0.5px",
              color: "var(--text-primary)"
            }}>
              ShopZone
            </span>
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }} className="desktop-nav">
          {links.map((link) => {
            const active = location.pathname === link.to;
            return (
              <Link key={link.to} to={link.to} style={{ textDecoration: "none" }}>
                <motion.div
                  whileHover={{ y: -2 }}
                  style={{
                    padding: "8px 4px",
                    margin: "0 12px",
                    fontSize: "0.9rem",
                    fontWeight: active ? 600 : 400,
                    color: active ? "var(--text-primary)" : "var(--text-secondary)",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                >
                  {link.label}
                </motion.div>
              </Link>
            );
          })}

          {/* Right Side Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            
            {/* Auth Action */}
            {user ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={logoutUser}
                title="Logout"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FiLogOut size={18} />
              </motion.button>
            ) : (
              <Link to={hasVisited ? "/login" : "/signup"} style={{ textDecoration: "none" }}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={hasVisited ? "Sign In" : "Sign Up"}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FiUser size={18} />
                </motion.button>
              </Link>
            )}

            {/* Theme Toggle Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {theme === "light" ? <FiMoon size={18} /> : <FiSun size={18} />}
            </motion.button>

            {/* Cart Button */}
            <Link to="/cart" style={{ textDecoration: "none" }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  position: "relative",
                  padding: "10px 18px",
                  borderRadius: "100px",
                  background: "var(--primary)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                <FiShoppingCart size={18} />
                Cart
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      key={cartCount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      style={{
                        position: "absolute",
                        top: -8,
                        right: -8,
                        minWidth: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "var(--text-primary)",
                        color: "var(--bg-primary)",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 4px",
                      }}
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Mobile Hamburger & Theme */}
        <div style={{ display: "none", alignItems: "center", gap: "10px" }} className="mobile-actions">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "8px",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
          >
            {theme === "light" ? <FiMoon size={22} /> : <FiSun size={22} />}
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              padding: "8px",
              cursor: "pointer",
              color: "var(--text-primary)",
            }}
            className="hamburger-btn"
          >
          {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: theme === "light" ? "rgba(255,255,255,0.95)" : "rgba(10,10,15,0.95)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <div style={{ padding: "16px 24px", display: "flex", flexDirection: "column", gap: "8px" }}>
              {links.map((link, i) => {
                const active = location.pathname === link.to;
                return (
                  <motion.div
                    key={link.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Link to={link.to} style={{ textDecoration: "none" }}>
                      <div style={{
                        padding: "12px 16px",
                      borderRadius: "8px",
                      color: active ? "var(--text-primary)" : "var(--text-secondary)",
                      fontWeight: active ? 600 : 400,
                      background: active ? "var(--bg-primary)" : "transparent",
                    }}>
                        {link.label}
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
              {/* Mobile Auth */}
              {user ? (
                <div onClick={logoutUser} style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--bg-primary)", border: "1px solid var(--border)", color: "var(--text-primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", marginTop: "8px", cursor: "pointer" }}>
                  <FiLogOut /> Logout
                </div>
              ) : (
                <Link to={hasVisited ? "/login" : "/signup"} style={{ textDecoration: "none" }}>
                <div style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--bg-secondary)", border: "1px solid var(--border)", color: "var(--text-primary)", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", marginTop: "8px", cursor: "pointer" }}>
                  <FiUser /> {hasVisited ? "Sign In" : "Sign Up"}
                </div>
              </Link>
              )}

              {/* Mobile Cart */}
              <Link to="/cart" style={{ textDecoration: "none" }}>
                <div style={{ padding: "12px 16px", borderRadius: "8px", background: "var(--primary)", color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" }}>
                  <FiShoppingCart /> Cart ({cartCount})
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-actions { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}

export default Navbar;
