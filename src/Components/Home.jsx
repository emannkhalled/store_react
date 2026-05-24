import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiShoppingCart, FiStar, FiTruck, FiShield, FiPhoneCall, FiTag, FiMonitor, FiSmartphone, FiGift } from "react-icons/fi";
import { MdOutlineChair } from "react-icons/md";
import toast from "react-hot-toast";

// ─── Minimal Animations ───
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const subtleScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

// ─── Categories Component ───
const categories = [
  { name: "Smartphones", apiName: "smartphones", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=300&auto=format&fit=crop", color: "var(--primary)" },
  { name: "Laptops", apiName: "laptops", image: "https://images.unsplash.com/photo-1496181130204-7552cc14AC1A?q=80&w=300&auto=format&fit=crop", color: "var(--purple)" },
  { name: "Fragrances", apiName: "fragrances", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=300&auto=format&fit=crop", color: "var(--primary-vibrant)" },
  { name: "Furniture", apiName: "furniture", image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=300&auto=format&fit=crop", color: "var(--accent)" },
];

function CategoryCard({ category }) {
  return (
    <Link to="/products" state={{ category: category.apiName }} style={{ textDecoration: "none" }}>
      <motion.div
        variants={subtleScale}
        whileHover={{ scale: 1.05, y: -10 }}
        style={{
          background: "var(--bg-card)",
          backdropFilter: "blur(20px)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl)",
          padding: "30px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          cursor: "pointer",
          transition: "all 0.4s ease",
          height: "100%",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div style={{
          position: "absolute",
          top: -30, right: -30,
          width: 100, height: 100,
          background: category.color,
          filter: "blur(50px)",
          opacity: 0.3,
          zIndex: 0
        }} />
        
        {/* Category Image instead of vector icon */}
        <div style={{
          width: 110, height: 110, borderRadius: "50%",
          overflow: "hidden",
          border: `2px solid ${category.color}80`,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1, boxShadow: `0 0 25px ${category.color}40`,
          background: "var(--bg-secondary)"
        }} className="animate-float">
          <motion.img 
            src={category.image} 
            alt={category.name} 
            whileHover={{ scale: 1.15 }}
            transition={{ duration: 0.3 }}
            style={{ width: "100%", height: "100%", objectFit: "cover" }} 
          />
        </div>
        
        <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", zIndex: 1 }}>{category.name}</h3>
      </motion.div>
    </Link>
  );
}

// ─── Product Card ───
function FeaturedProduct({ product, addToCart }) {
  const [hover, setHover] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`"${product.title.substring(0, 20)}..." added!`);
  };

  return (
    <motion.div
      variants={fadeUp}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="glass-card"
      style={{
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        position: "relative"
      }}
    >
      <Link to={`/products/${product.id}`} style={{ textDecoration: "none", display: "block" }}>
        <div style={{ height: 280, position: "relative", overflow: "hidden", background: "rgba(255,255,255,0.02)", display: "flex", alignItems: "center", justifyContent: "center", padding: "30px" }}>
          {hover && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ position: "absolute", inset: 0, background: "var(--primary)", filter: "blur(80px)", opacity: 0.15 }}
            />
          )}
          <motion.img
            src={product.thumbnail}
            alt={product.title}
            animate={{ scale: hover ? 1.1 : 1, y: hover ? -5 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ width: "100%", height: "100%", objectFit: "contain", position: "relative", zIndex: 1 }}
          />
        </div>
      </Link>
      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
          <h3 style={{
            fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)",
            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1
          }}>
            {product.title}
          </h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 24 }}>
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} size={14} className={i < Math.round(product.rating) ? "star" : "star-empty"} />
          ))}
          <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginLeft: 6 }}>({product.rating})</span>
        </div>
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "auto" }}>
          <span className="gradient-text" style={{ fontSize: "1.4rem", fontWeight: 800 }}>
            ${product.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAdd}
            style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "var(--primary-light)", border: "1px solid var(--primary)", color: "var(--primary)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.3s ease",
              boxShadow: hover ? "0 0 15px rgba(0,240,255,0.4)" : "none"
            }}
          >
            <FiShoppingCart size={20} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Feature Box Component ───
function FeatureBox({ icon: Icon, title, desc, color }) {
  return (
    <motion.div
      variants={subtleScale}
      className="glass-card"
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
        padding: "40px 24px", position: "relative", overflow: "hidden"
      }}
    >
      <div style={{
        position: "absolute", top: -50, left: "50%", transform: "translateX(-50%)",
        width: 100, height: 100, background: color, filter: "blur(60px)", opacity: 0.2
      }} />
      <div style={{
        width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.05)",
        color: color, border: `1px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24, zIndex: 1
      }}>
        <Icon size={28} />
      </div>
      <h4 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 12, zIndex: 1 }}>{title}</h4>
      <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.6, zIndex: 1 }}>{desc}</p>
    </motion.div>
  );
}

// ─── Main Home Component ───
function Home({ addToCart }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [heroProducts, setHeroProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=12")
      .then(res => res.json())
      .then(data => {
        setHeroProducts(data.products.slice(0, 4));
        setFeaturedProducts(data.products.slice(4, 12));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (heroProducts.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroProducts.length]);

  return (
    <div style={{ minHeight: "100vh", position: "relative" }}>
      {/* Glow Orbs */}
      <div className="orb orb-purple" style={{ top: "-10%", left: "-10%", width: "40vw", height: "40vw" }} />
      <div className="orb orb-cyan" style={{ top: "40%", right: "-10%", width: "30vw", height: "30vw" }} />
      
      {/* ─── Hero Section ─── */}
      <section style={{ 
        position: "relative", paddingTop: "160px", paddingBottom: "120px", zIndex: 1
      }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "60px", alignItems: "center" }}>
            
            {/* Left Content */}
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ textAlign: "left" }}>
              <motion.div variants={fadeUp} style={{ marginBottom: 20 }}>
                <span className="badge">New Collection 2026</span>
              </motion.div>
              <motion.h1 variants={fadeUp} style={{
                fontSize: "clamp(3.5rem, 6vw, 5rem)", fontWeight: 900, lineHeight: 1.1,
                color: "var(--text-primary)", marginBottom: 24, textShadow: "0 0 40px rgba(255,255,255,0.1)"
              }}>
                Experience <br />
                <span className="gradient-text">Future</span> Tech.
              </motion.h1>
              
              <motion.p variants={fadeUp} style={{
                fontSize: "1.25rem", color: "var(--text-secondary)",
                marginBottom: 48, lineHeight: 1.7, maxWidth: "90%", fontWeight: 400
              }}>
                Elevate your lifestyle with our stunning collection of premium devices, designed with the ultimate creative aesthetics.
              </motion.p>
              
              <motion.div variants={fadeUp} style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <Link to="/products" className="btn btn-primary" style={{ padding: "18px 40px", fontSize: "1.1rem" }}>
                  Explore Now
                </Link>
                
                <Link to="/products" className="btn btn-secondary" style={{ padding: "18px 40px", fontSize: "1.1rem" }}>
                  View Offers
                </Link>
              </motion.div>
            </motion.div>

            {/* Right Dynamic Showcase */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }} 
              animate={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "relative", width: "100%", paddingBottom: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {/* Decorative rings */}
              <div style={{ position: "absolute", inset: "10%", border: "1px dashed var(--border)", borderRadius: "50%", animation: "spin-slow 20s linear infinite" }} />
              <div style={{ position: "absolute", inset: "20%", border: "1px solid var(--border-glow)", borderRadius: "50%", animation: "spin-slow 15s linear infinite reverse" }} />

              {loading ? (
                <div className="skeleton" style={{ position: "absolute", inset: "20%", borderRadius: "50%" }} />
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{ position: "absolute", inset: "15%", display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    <img 
                      src={heroProducts[currentImageIndex]?.thumbnail}
                      alt={heroProducts[currentImageIndex]?.title} 
                      style={{ width: "100%", height: "100%", objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }} 
                      className="animate-float"
                    />
                  </motion.div>
                </AnimatePresence>
              )}
              
              {/* Floating Glass Price Tag */}
              {!loading && heroProducts[currentImageIndex] && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={`price-${currentImageIndex}`}
                  style={{
                    position: "absolute", bottom: "15%", right: "10%", 
                    background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)",
                    border: "1px solid var(--border-glow)", borderRadius: "var(--radius-lg)",
                    padding: "16px 24px", display: "flex", flexDirection: "column", gap: 4,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.5)", zIndex: 10
                  }}
                  className="animate-float"
                >
                  <span style={{ fontSize: "0.85rem", color: "var(--text-secondary)", fontWeight: 600 }}>Featured</span>
                  <span className="gradient-vibrant" style={{ fontSize: "1.5rem", fontWeight: 800 }}>${heroProducts[currentImageIndex].price}</span>
                </motion.div>
              )}
            </motion.div>
            
          </div>
        </div>
      </section>

      {/* ─── Infinite Glowing Marquee ─── */}
      <div style={{ background: "rgba(0,0,0,0.4)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "24px 0", overflow: "hidden", display: "flex", backdropFilter: "blur(10px)", position: "relative", zIndex: 1 }}>
        <motion.div animate={{ x: [0, -1000] }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: "100px", paddingLeft: "100px", whiteSpace: "nowrap" }}>
          {[...Array(6)].map((_, i) => (
            <span key={i} className="gradient-text" style={{ fontSize: "1.2rem", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", display: "flex", alignItems: "center", gap: "30px" }}>
              Creative Design • Next Gen Tech • Limitless Performance
            </span>
          ))}
        </motion.div>
      </div>

      {/* ─── Categories Section ─── */}
      <section className="section" style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 80 }}>
          <h2 className="section-title">Explore by <span className="gradient-vibrant">Category</span></h2>
          <p className="section-subtitle">Find exactly what you're looking for in our curated collections.</p>
        </motion.div>
        
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 32 }}
        >
          {categories.map((category, i) => (
            <CategoryCard key={category.name} category={category} delay={i * 0.1} />
          ))}
        </motion.div>
      </section>

      {/* ─── Featured Products Section ─── */}
      <section className="section" style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 60, flexWrap: "wrap", gap: 20 }}>
          <div>
            <h2 className="section-title" style={{ marginBottom: 8 }}>Trending <span className="gradient-text">Now</span></h2>
            <p className="section-subtitle" style={{ margin: 0 }}>Discover our most popular products this week.</p>
          </div>
          <Link to="/products" className="btn btn-secondary">
            View All Products <FiArrowRight />
          </Link>
        </motion.div>

        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 32 }}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className="glass-card" style={{ padding: 0 }}>
                <div className="skeleton" style={{ height: 280, borderRadius: "var(--radius-lg) var(--radius-lg) 0 0" }} />
                <div style={{ padding: 24 }}>
                  <div className="skeleton" style={{ height: 24, width: "80%", borderRadius: 6, marginBottom: 16 }} />
                  <div className="skeleton" style={{ height: 16, width: "40%", borderRadius: 6, marginBottom: 24 }} />
                  <div className="skeleton" style={{ height: 40, width: "100%", borderRadius: 6 }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 32 }}
          >
            {featuredProducts.map(product => (
              <FeaturedProduct key={product.id} product={product} addToCart={addToCart} />
            ))}
          </motion.div>
        )}
      </section>

      {/* ─── Creative Promo Banner ─── */}
      <section className="section" style={{ position: "relative", zIndex: 1 }}>
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(6,182,212,0.2))",
            backdropFilter: "blur(20px)",
            border: "1px solid var(--border-glow)",
            borderRadius: "var(--radius-xl)", padding: "100px 40px", textAlign: "center",
            position: "relative", overflow: "hidden"
          }}
        >
          {/* Decorative Background Elements */}
          <div style={{ position: "absolute", top: "-50%", left: "-20%", width: "70%", height: "200%", background: "var(--primary)", filter: "blur(120px)", opacity: 0.1, transform: "rotate(30deg)" }} />
          <div style={{ position: "absolute", bottom: "-50%", right: "-20%", width: "70%", height: "200%", background: "var(--accent)", filter: "blur(120px)", opacity: 0.1, transform: "rotate(-30deg)" }} />
          
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)", fontWeight: 900, marginBottom: 24, textShadow: "0 0 20px rgba(0,240,255,0.3)" }}>
              The <span className="gradient-text">Creative</span> Standard.
            </h2>
            <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginBottom: 48, maxWidth: 600, margin: "0 auto 48px", lineHeight: 1.7 }}>
              Experience mind-blowing design and exceptional quality. Elevate your setup with our latest creative collection.
            </p>
            <Link to="/products" className="btn btn-primary" style={{ padding: "18px 48px", fontSize: "1.1rem" }}>
              Shop Collection
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ─── Why Choose Us Section ─── */}
      <section className="section" style={{ position: "relative", zIndex: 1 }}>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} style={{ textAlign: "center", marginBottom: 80 }}>
          <h2 className="section-title">Why Choose <span className="gradient-vibrant">ShopZone</span>.</h2>
          <p className="section-subtitle">We deliver excellence across every aspect of your shopping journey.</p>
        </motion.div>

        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32 }}
        >
          <FeatureBox icon={FiTruck} title="Lightning Fast" desc="Experience our rapid express delivery on all premium orders globally." color="var(--primary)" />
          <FeatureBox icon={FiTag} title="Exclusive Pricing" desc="Get access to top-tier quality products without the luxury markup." color="var(--purple)" />
          <FeatureBox icon={FiShield} title="Bulletproof Security" desc="Your data is protected with military-grade, industry-leading encryption." color="var(--primary-vibrant)" />
          <FeatureBox icon={FiPhoneCall} title="24/7 Concierge" desc="Our dedicated creative team is here to assist you anytime, anywhere." color="var(--accent)" />
        </motion.div>
      </section>

    </div>
  );
}

export default Home;
