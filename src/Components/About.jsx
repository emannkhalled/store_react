import { motion } from "framer-motion";
import { FiHeart, FiUsers, FiGlobe, FiAward, FiStar, FiPackage, FiTarget } from "react-icons/fi";

const team = [
  { name: "Alex Johnson", role: "CEO & Founder", emoji: "👨‍💼", color: "#7C3AED" },
  { name: "Sarah Williams", role: "Head of Design", emoji: "👩‍🎨", color: "#06B6D4" },
  { name: "Mike Chen", role: "Lead Developer", emoji: "👨‍💻", color: "#EC4899" },
  { name: "Emma Davis", role: "Marketing Lead", emoji: "👩‍📊", color: "#F59E0B" },
];

const timeline = [
  { year: "2020", title: "Company Founded", desc: "Started with a vision to make online shopping easier.", icon: "🚀" },
  { year: "2021", title: "First 10K Users", desc: "Reached 10,000 happy customers milestone.", icon: "🎯" },
  { year: "2022", title: "Expanded Globally", desc: "Launched international shipping to 50+ countries.", icon: "🌍" },
  { year: "2023", title: "Award Winning", desc: "Best e-commerce platform of the year.", icon: "🏆" },
  { year: "2024", title: "50K Customers", desc: "Grew to serve 50,000+ satisfied customers.", icon: "❤️" },
  { year: "2026", title: "Future Vision", desc: "Continuing to innovate and deliver the best experience.", icon: "✨" },
];

const values = [
  { icon: FiHeart, title: "Customer First", desc: "Every decision guided by what's best for our customers.", color: "#EC4899" },
  { icon: FiTarget, title: "Quality Focus", desc: "Only partners that meet our strict quality standards.", color: "#7C3AED" },
  { icon: FiGlobe, title: "Global Reach", desc: "Delivering to 50+ countries with fast shipping.", color: "#06B6D4" },
  { icon: FiAward, title: "Excellence", desc: "Striving for excellence in every product and interaction.", color: "#F59E0B" },
];

function About() {
  const G = { background: "linear-gradient(135deg,#9F67FA,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" };
  const stats = [
    { icon: FiUsers, value: "50K+", label: "Happy Customers" },
    { icon: FiPackage, value: "10K+", label: "Products" },
    { icon: FiGlobe, value: "50+", label: "Countries" },
    { icon: FiStar, value: "4.9★", label: "Avg Rating" },
  ];

  return (
    <div style={{ paddingTop: 90, paddingBottom: 80 }}>

      {/* Hero */}
      <section style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px 80px", textAlign: "center" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", borderRadius: 100, fontSize: "0.82rem", fontWeight: 600, color: "#9F67FA", marginBottom: 20 }}>
            <FiHeart size={13} /> Our Story
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem,5vw,3.5rem)", fontWeight: 900, lineHeight: 1.15, marginBottom: 20 }}>
            We're on a Mission to<br /><span style={G}>Redefine Shopping</span>
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#94A3B8", lineHeight: 1.8, maxWidth: 600, margin: "0 auto" }}>
            ShopPro was born out of a simple idea — that online shopping should be delightful, fast, and trustworthy. Since 2020, we've been building the future of e-commerce, one happy customer at a time.
          </p>
        </motion.div>
      </section>

      {/* Stats */}
      <section style={{ background: "rgba(255,255,255,0.02)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)", padding: "50px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 32 }}>
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} style={{ textAlign: "center" }}>
              <s.icon size={26} color="#7C3AED" style={{ marginBottom: 10 }} />
              <div style={{ fontSize: "2rem", fontWeight: 900, ...G, marginBottom: 4 }}>{s.value}</div>
              <div style={{ color: "#64748B", fontSize: "0.88rem" }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "80px 24px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 50 }}>
          <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 800, marginBottom: 12 }}>What We <span style={G}>Stand For</span></h2>
          <p style={{ color: "#64748B", maxWidth: 480, margin: "0 auto" }}>The core values that guide everything we do.</p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
          {values.map((v, i) => (
            <motion.div key={v.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }}
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "28px 24px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: `${v.color}15`, filter: "blur(20px)" }} />
              <div style={{ width: 52, height: 52, borderRadius: 14, background: `${v.color}20`, border: `1px solid ${v.color}40`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
                <v.icon size={24} color={v.color} />
              </div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 8 }}>{v.title}</h3>
              <p style={{ color: "#64748B", fontSize: "0.88rem", lineHeight: 1.6 }}>{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 80px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 50 }}>
          <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 800, marginBottom: 12 }}>Our <span style={G}>Journey</span></h2>
          <p style={{ color: "#64748B" }}>From a small startup to a global platform</p>
        </motion.div>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom,#7C3AED,#06B6D4)", transform: "translateX(-50%)", borderRadius: 2 }} />
          {timeline.map((item, i) => (
            <motion.div key={item.year} initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
              style={{ display: "flex", justifyContent: i % 2 === 0 ? "flex-start" : "flex-end", marginBottom: 28, position: "relative" }}>
              <div style={{ position: "absolute", left: "50%", top: 20, width: 14, height: 14, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#06B6D4)", transform: "translateX(-50%)", border: "3px solid #0A0A0F", zIndex: 2, boxShadow: "0 0 12px rgba(124,58,237,0.5)" }} />
              <div style={{ width: "44%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: "1.3rem" }}>{item.icon}</span>
                  <span style={{ padding: "3px 10px", background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", borderRadius: 100, fontSize: "0.72rem", fontWeight: 700, color: "#9F67FA" }}>{item.year}</span>
                </div>
                <h3 style={{ fontSize: "0.92rem", fontWeight: 700, marginBottom: 5 }}>{item.title}</h3>
                <p style={{ fontSize: "0.8rem", color: "#64748B", lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 50 }}>
          <h2 style={{ fontSize: "clamp(1.8rem,3.5vw,2.5rem)", fontWeight: 800, marginBottom: 12 }}>Meet the <span style={G}>Team</span></h2>
          <p style={{ color: "#64748B" }}>The passionate people behind ShopPro</p>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
          {team.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }} whileHover={{ y: -10 }}
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: "32px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 50% 0%,${m.color}15,transparent 70%)`, pointerEvents: "none" }} />
              <motion.div whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }} transition={{ duration: 0.4 }}
                style={{ fontSize: "3.5rem", marginBottom: 16, display: "block" }}>{m.emoji}</motion.div>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, marginBottom: 6 }}>{m.name}</h3>
              <p style={{ fontSize: "0.84rem", color: "#64748B" }}>{m.role}</p>
              <div style={{ marginTop: 16, display: "flex", justifyContent: "center", gap: 8 }}>
                {["L", "T", "G"].map(s => (
                  <div key={s} style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.72rem", color: "#64748B" }}>{s}</div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;