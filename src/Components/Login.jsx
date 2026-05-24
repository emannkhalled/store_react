import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';
import toast from 'react-hot-toast';

function Login({ loginUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      if (loginUser) loginUser({ email });
      toast.success("Welcome back to ShopZone!");
      navigate('/home');
    } else {
      toast.error("Please enter your email and password.");
    }
  };

  return (
    <div style={{ minHeight: "calc(100vh - var(--nav-height))", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)", padding: "40px 24px" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          background: "var(--bg-secondary)",
          padding: "48px 40px",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-md)",
          width: "100%",
          maxWidth: "400px",
          textAlign: "center"
        }}
      >
        <div style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>Sign In</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Enter your credentials to access your account.</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: 16, transform: "translateY(-50%)", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
              <FiMail size={18} />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%", padding: "14px 16px 14px 44px",
                background: "var(--bg-primary)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)", color: "var(--text-primary)",
                fontSize: "0.95rem", outline: "none", transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            />
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: 16, transform: "translateY(-50%)", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
              <FiLock size={18} />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%", padding: "14px 16px 14px 44px",
                background: "var(--bg-primary)", border: "1px solid var(--border)",
                borderRadius: "var(--radius-sm)", color: "var(--text-primary)",
                fontSize: "0.95rem", outline: "none", transition: "border-color 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--primary)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border)"}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem" }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", cursor: "pointer" }}>
              <input type="checkbox" style={{ accentColor: "var(--primary)", width: 16, height: 16 }} />
              Remember me
            </label>
            <a href="#" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 500 }}>Forgot password?</a>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            style={{
              width: "100%", padding: "14px", background: "var(--primary)",
              color: "#fff", border: "none", borderRadius: "100px",
              fontSize: "1rem", fontWeight: 600, cursor: "pointer", marginTop: 8,
              transition: "all 0.2s ease"
            }}
          >
            Sign In
          </motion.button>
        </form>

        <div style={{ marginTop: 24, fontSize: "0.95rem", color: "var(--text-secondary)" }}>
          Don't have an account? <Link to="/signup" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 500 }}>Create one</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
