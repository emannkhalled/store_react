import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiHome, FiShoppingBag, FiArrowLeft } from "react-icons/fi";

function NotFound() {
  const G = { background: "linear-gradient(135deg,#9F67FA,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

  return (
    <div style={{ paddingTop: 70, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* Orbs */}
      <div style={{ position: "absolute", width: 500, height: 500, top: "30%", left: "20%", background: "radial-gradient(circle,rgba(124,58,237,0.15),transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, top: "40%", right: "15%", background: "radial-gradient(circle,rgba(6,182,212,0.1),transparent 70%)", pointerEvents: "none" }} />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: "center", padding: "40px 24px", maxWidth: 540, position: "relative", zIndex: 1 }}
      >
        {/* 404 Number */}
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          style={{ fontSize: "clamp(7rem, 20vw, 12rem)", fontWeight: 900, lineHeight: 1, marginBottom: 16, ...G, opacity: 0.9 }}
        >
          404
        </motion.div>

        <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 800, marginBottom: 16 }}>
          Page Not Found
        </h1>
        <p style={{ color: "#94A3B8", fontSize: "1.05rem", lineHeight: 1.7, marginBottom: 40, maxWidth: 400, margin: "0 auto 40px" }}>
          Oops! The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
              style={{ padding: "14px 30px", background: "linear-gradient(135deg,#7C3AED,#06B6D4)", border: "none", borderRadius: 14, color: "#fff", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", fontFamily: "Inter,sans-serif", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}>
              <FiHome size={18} /> Go Home
            </motion.button>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
              style={{ padding: "14px 30px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, color: "#F8FAFC", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", fontFamily: "Inter,sans-serif", display: "flex", alignItems: "center", gap: 10 }}>
              <FiShoppingBag size={18} /> Shop Products
            </motion.button>
          </Link>
        </div>

        {/* Decorative floating elements */}
        <div style={{ marginTop: 60, display: "flex", justifyContent: "center", gap: 16 }}>
          {["🛒", "📦", "🎁", "✨"].map((emoji, i) => (
            <motion.span key={i}
              animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 + i * 0.5, delay: i * 0.3, ease: "easeInOut" }}
              style={{ fontSize: "2rem", opacity: 0.5 }}
            >
              {emoji}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;
