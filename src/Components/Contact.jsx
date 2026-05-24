import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiSend, FiMail, FiUser, FiMessageSquare, FiMapPin, FiPhone, FiClock, FiCheck } from "react-icons/fi";

function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [sent, setSent] = useState(false);

  function onSubmit(data) {
    console.log(data);
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
  }

  const G = { background: "linear-gradient(135deg,#9F67FA,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };

  const contactInfo = [
    { icon: FiMapPin, label: "Address", value: "123 Commerce St, San Francisco, CA" },
    { icon: FiMail, label: "Email", value: "hello@shoppro.com" },
    { icon: FiPhone, label: "Phone", value: "+1 (555) 123-4567" },
    { icon: FiClock, label: "Hours", value: "Mon–Fri, 9AM–6PM PST" },
  ];

  const inputStyle = (hasError) => ({
    width: "100%", padding: "14px 14px 14px 46px", background: "rgba(255,255,255,0.05)",
    border: `1px solid ${hasError ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"}`,
    borderRadius: 12, color: "#F8FAFC", fontFamily: "Inter,sans-serif", fontSize: "0.95rem",
    outline: "none", transition: "all 0.3s ease", boxSizing: "border-box",
  });

  return (
    <div style={{ paddingTop: 90, paddingBottom: 80, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "center", marginBottom: 60 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 100, fontSize: "0.82rem", fontWeight: 600, color: "#9F67FA", marginBottom: 20 }}>
            <FiMail size={13} /> Get in Touch
          </div>
          <h1 style={{ fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 900, marginBottom: 14 }}>
            We'd Love to <span style={G}>Hear From You</span>
          </h1>
          <p style={{ color: "#94A3B8", maxWidth: 500, margin: "0 auto", fontSize: "1.05rem" }}>
            Have a question, suggestion, or just want to say hi? Drop us a message!
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 40, alignItems: "start" }}>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 24, padding: "60px 40px", textAlign: "center" }}>
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                    style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg,rgba(16,185,129,0.2),rgba(6,182,212,0.15))", border: "2px solid rgba(16,185,129,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                    <FiCheck size={36} color="#10B981" />
                  </motion.div>
                  <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: 12 }}>Message Sent!</h2>
                  <p style={{ color: "#94A3B8" }}>Thank you for reaching out. We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit(onSubmit)}
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "32px" }}>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 28 }}>Send a Message</h2>

                  {/* Name */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#94A3B8", marginBottom: 8, display: "block" }}>Full Name</label>
                    <div style={{ position: "relative" }}>
                      <FiUser style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#475569" }} />
                      <input placeholder="John Doe" {...register("name", { required: "Name is required" })}
                        style={inputStyle(errors.name)}
                        onFocus={e => { e.target.style.borderColor = "#7C3AED"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)"; }}
                        onBlur={e => { e.target.style.borderColor = errors.name ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                    {errors.name && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} style={{ color: "#F87171", fontSize: "0.8rem", marginTop: 6 }}>{errors.name.message}</motion.p>}
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#94A3B8", marginBottom: 8, display: "block" }}>Email Address</label>
                    <div style={{ position: "relative" }}>
                      <FiMail style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#475569" }} />
                      <input placeholder="john@example.com" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email" } })}
                        style={inputStyle(errors.email)}
                        onFocus={e => { e.target.style.borderColor = "#7C3AED"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)"; }}
                        onBlur={e => { e.target.style.borderColor = errors.email ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                    {errors.email && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} style={{ color: "#F87171", fontSize: "0.8rem", marginTop: 6 }}>{errors.email.message}</motion.p>}
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 28 }}>
                    <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#94A3B8", marginBottom: 8, display: "block" }}>Message</label>
                    <div style={{ position: "relative" }}>
                      <FiMessageSquare style={{ position: "absolute", left: 16, top: 16, color: "#475569" }} />
                      <textarea placeholder="Tell us what's on your mind..." rows={5}
                        {...register("message", { required: "Message is required" })}
                        style={{ ...inputStyle(errors.message), paddingTop: 14, resize: "vertical" }}
                        onFocus={e => { e.target.style.borderColor = "#7C3AED"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)"; }}
                        onBlur={e => { e.target.style.borderColor = errors.message ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                    {errors.message && <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} style={{ color: "#F87171", fontSize: "0.8rem", marginTop: 6 }}>{errors.message.message}</motion.p>}
                  </div>

                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    style={{ width: "100%", padding: "16px", background: "linear-gradient(135deg,#7C3AED,#06B6D4)", border: "none", borderRadius: 14, color: "#fff", fontWeight: 700, fontSize: "1rem", cursor: "pointer", fontFamily: "Inter,sans-serif", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 4px 20px rgba(124,58,237,0.4)" }}>
                    <FiSend size={18} /> Send Message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: 28 }}>Contact Information</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
              {contactInfo.map((c, i) => (
                <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  style={{ display: "flex", gap: 16, alignItems: "center", padding: "18px 20px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(6,182,212,0.15))", border: "1px solid rgba(124,58,237,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <c.icon size={20} color="#9F67FA" />
                  </div>
                  <div>
                    <p style={{ fontSize: "0.8rem", color: "#64748B", marginBottom: 3 }}>{c.label}</p>
                    <p style={{ fontSize: "0.92rem", fontWeight: 600 }}>{c.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* FAQ */}
            <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 24 }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 16 }}>Frequently Asked</h3>
              {[
                { q: "How long does shipping take?", a: "3-5 business days for domestic, 7-14 for international." },
                { q: "What's your return policy?", a: "30-day hassle-free returns on all products." },
                { q: "Do you offer bulk discounts?", a: "Yes! Contact us for orders of 10+ items." },
              ].map((faq, i) => (
                <div key={i} style={{ marginBottom: i < 2 ? 14 : 0, paddingBottom: i < 2 ? 14 : 0, borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <p style={{ fontSize: "0.88rem", fontWeight: 600, marginBottom: 4 }}>{faq.q}</p>
                  <p style={{ fontSize: "0.82rem", color: "#64748B", lineHeight: 1.5 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;