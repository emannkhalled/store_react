import { Link } from "react-router-dom";
import { FiZap, FiMail, FiGithub, FiTwitter, FiInstagram, FiArrowUp } from "react-icons/fi";
import { motion } from "framer-motion";

function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const footerLinks = {
    Shop: [
      { label: "All Products", to: "/products" },
      { label: "New Arrivals", to: "/products" },
      { label: "Best Sellers", to: "/products" },
      { label: "Deals", to: "/products" },
    ],
    Company: [
      { label: "About Us", to: "/about" },
      { label: "Our Team", to: "/about" },
      { label: "Careers", to: "/about" },
      { label: "Contact", to: "/contact" },
    ],
    Support: [
      { label: "Help Center", to: "/contact" },
      { label: "Shipping Info", to: "/contact" },
      { label: "Returns", to: "/contact" },
      { label: "FAQs", to: "/contact" },
    ],
  };

  return (
    <footer style={{ borderTop: "1px solid var(--border)", background: "var(--bg-secondary)", position: "relative" }}>

      {/* Scroll to top */}
      <motion.button whileHover={{ scale: 1.1, y: -2 }} whileTap={{ scale: 0.9 }} onClick={scrollToTop}
        style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", width: 44, height: 44, borderRadius: 12, background: "#4F46E5", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(79, 70, 229, 0.4)" }}>
        <FiArrowUp size={18} />
      </motion.button>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 24px 30px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 40, marginBottom: 40 }}>

          {/* Brand */}
          <div>
            <Link to="/home" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #4F46E5, #0EA5E9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FiZap color="#fff" size={18} />
              </div>
              <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "var(--text-primary)" }}>ShopZone</span>
            </Link>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 20, maxWidth: 260 }}>
              Premium shopping experience with thousands of products at unbeatable prices.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[FiTwitter, FiInstagram, FiGithub, FiMail].map((Icon, i) => (
                <motion.div key={i} whileHover={{ scale: 1.15, y: -2 }}
                  style={{ width: 36, height: 36, borderRadius: 10, background: "var(--bg-card)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-secondary)", transition: "all 0.3s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#4F46E5"; e.currentTarget.style.color = "#4F46E5"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text-secondary)"; }}>
                  <Icon size={16} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: 18, color: "var(--text-primary)" }}>{title}</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map(link => (
                  <Link key={link.label} to={link.to} style={{ textDecoration: "none", color: "var(--text-secondary)", fontSize: "0.88rem", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#4F46E5"}
                    onMouseLeave={e => e.target.style.color = "var(--text-secondary)"}>
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "var(--text-muted)", fontSize: "0.82rem" }}>© 2026 ShopZone. All rights reserved.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy", "Terms", "Cookies"].map(t => (
              <span key={t} style={{ color: "var(--text-muted)", fontSize: "0.82rem", cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "var(--text-secondary)"}
                onMouseLeave={e => e.target.style.color = "var(--text-muted)"}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
