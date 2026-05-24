import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiUser, FiMail, FiLock } from 'react-icons/fi';
import toast from 'react-hot-toast';

function Signup({ loginUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (name && email && password) {
      if (loginUser) loginUser({ name, email });
      toast.success("Account created successfully!");
      navigate('/home');
    } else {
      toast.error("Please fill in all fields.");
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
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>Create Account</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Sign up to start shopping premium items.</p>
        </div>

        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: "50%", left: 16, transform: "translateY(-50%)", color: "var(--text-muted)", display: "flex", alignItems: "center" }}>
              <FiUser size={18} />
            </div>
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            Create Account
          </motion.button>
        </form>

        <div style={{ marginTop: 24, fontSize: "0.95rem", color: "var(--text-secondary)" }}>
          Already have an account? <Link to="/login" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 500 }}>Sign in</Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
