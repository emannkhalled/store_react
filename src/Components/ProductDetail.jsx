import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";
import { FiArrowLeft, FiShoppingCart, FiStar, FiTruck, FiShield, FiHeart, FiPackage } from "react-icons/fi";

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => {
        setProduct(res.data);
        setSelectedImg(0);
        return axios.get(`https://dummyjson.com/products/category/${res.data.category}?limit=4`);
      })
      .then(res => setRelated(res.data.products.filter(p => p.id !== Number(id))))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    toast.success(`${qty}x "${product.title.substring(0, 20)}..." added to your collection!`, { duration: 2500 });
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) {
    return (
      <div className="page-wrapper" style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: 60 }}>
          <div className="skeleton" style={{ borderRadius: "var(--radius-xl)", height: 500 }} />
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[80, 50, 30, 40, 120].map((w, i) => <div key={i} className="skeleton" style={{ height: i === 4 ? 60 : 28, width: `${w}%`, borderRadius: 10 }} />)}
          </div>
        </div>
      </div>
    );
  }

  if (!product) return (
    <div className="page-wrapper" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh" }}>
      <h2 style={{ fontSize: "2rem", marginBottom: 20 }}>Product not found</h2>
      <Link to="/products" className="btn btn-primary">Return to Collection</Link>
    </div>
  );

  const images = product.images?.length ? product.images : [product.thumbnail];
  const discount = product.discountPercentage ? Math.round(product.price / (1 - product.discountPercentage / 100)) : null;

  return (
    <div className="page-wrapper" style={{ position: "relative" }}>
      {/* Glow Orbs for creative background */}
      <div className="orb orb-purple" style={{ top: "10%", left: "-10%", width: "50vw", height: "50vw" }} />
      <div className="orb orb-cyan" style={{ bottom: "-10%", right: "-10%", width: "40vw", height: "40vw" }} />

      <div className="container" style={{ position: "relative", zIndex: 1, paddingBottom: 100 }}>
        
        {/* Back Button */}
        <motion.button initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="btn btn-secondary"
          style={{ padding: "10px 20px", marginBottom: 40, fontSize: "0.95rem" }}>
          <FiArrowLeft /> Back to selection
        </motion.button>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(400px,1fr))", gap: 60, alignItems: "start" }}>
          
          {/* ─── Left: Images Showcase ─── */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <div className="glass-card" style={{ height: 500, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, position: "relative", padding: 40 }}>
              <AnimatePresence mode="wait">
                <motion.img key={selectedImg} src={images[selectedImg]} alt={product.title}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.5))" }}
                  className="animate-float"
                />
              </AnimatePresence>
              
              {product.discountPercentage && (
                <div style={{ position: "absolute", top: 20, left: 20, background: "var(--primary-vibrant)", borderRadius: "var(--radius-sm)", padding: "6px 14px", fontSize: "0.9rem", fontWeight: 800, color: "#fff", boxShadow: "0 0 20px rgba(255,0,85,0.4)" }}>
                  -{Math.round(product.discountPercentage)}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {images.slice(0, 5).map((img, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.95 }} onClick={() => setSelectedImg(i)}
                    style={{ width: 80, height: 80, borderRadius: "var(--radius-md)", overflow: "hidden", border: `2px solid ${selectedImg === i ? "var(--primary)" : "transparent"}`, cursor: "pointer", transition: "all 0.3s ease", flexShrink: 0, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <img src={img} alt="" style={{ width: "80%", height: "80%", objectFit: "contain" }} />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* ─── Right: Product Details ─── */}
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            
            {/* Category Tag */}
            <div>
              <span className="badge" style={{ fontSize: "0.8rem", letterSpacing: "1px" }}>
                {product.category}
              </span>
            </div>
            
            {/* Title */}
            <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, lineHeight: 1.1, color: "var(--text-primary)" }}>
              {product.title}
            </h1>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[...Array(5)].map((_, i) => <FiStar key={i} size={18} className={i < Math.round(product.rating) ? "star" : "star-empty"} />)}
              </div>
              <span style={{ color: "var(--primary)", fontSize: "1rem", fontWeight: 600 }}>{product.rating} Rating</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>({product.reviews?.length || Math.floor(Math.random() * 200 + 50)} reviews)</span>
            </div>

            <div className="divider" style={{ margin: "10px 0" }} />

            {/* Price Area ("الخط اللي في النص" - Enhanced typography and layout) */}
            <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
              <span className="gradient-main" style={{ fontSize: "3rem", fontWeight: 900, textShadow: "0 0 30px rgba(0,240,255,0.3)", background: "var(--gradient-main)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                ${product.price}
              </span>
              
              {discount && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: "1.3rem", color: "var(--text-muted)", textDecoration: "line-through", textDecorationColor: "var(--primary-vibrant)", textDecorationThickness: "2px", fontWeight: 600 }}>
                    ${discount}
                  </span>
                  <span style={{ fontSize: "0.9rem", color: "var(--primary-vibrant)", fontWeight: 700 }}>
                    You save ${Math.round(discount - product.price)}
                  </span>
                </div>
              )}
            </div>

            {/* Description - Made better, clear font */}
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, fontSize: "1.1rem", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {product.description}
            </p>

            {/* Stock Status */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", background: "rgba(255,255,255,0.03)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
              <FiPackage size={20} color={product.stock > 10 ? "#10B981" : "#F59E0B"} />
              <span style={{ fontSize: "1rem", color: product.stock > 10 ? "#10B981" : "#F59E0B", fontWeight: 700 }}>
                {product.stock > 10 ? `In Stock - ${product.stock} units available` : `Hurry! Only ${product.stock} units left in stock`}
              </span>
            </div>

            {/* Action Area (Qty & Add to Cart) */}
            <div style={{ display: "flex", gap: 16, alignItems: "stretch", flexWrap: "wrap", marginTop: 10 }}>
              
              {/* Creative Qty Selector */}
              <div className="glass-card" style={{ display: "flex", alignItems: "center", padding: "0 10px", borderRadius: "var(--radius-md)" }}>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ padding: "14px", background: "none", border: "none", color: "var(--text-primary)", fontSize: "1.4rem", cursor: "pointer", fontWeight: 800 }}>−</motion.button>
                <span style={{ padding: "0 10px", fontWeight: 800, fontSize: "1.2rem", minWidth: 40, textAlign: "center" }}>{qty}</span>
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setQty(q => Math.min(product.stock, q + 1))}
                  style={{ padding: "14px", background: "none", border: "none", color: "var(--text-primary)", fontSize: "1.4rem", cursor: "pointer", fontWeight: 800 }}>+</motion.button>
              </div>
              
              {/* Glowing Add to Cart Button */}
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleAdd}
                className="btn btn-primary"
                style={{ flex: 1, minWidth: 200, padding: "0 32px", fontSize: "1.1rem", height: "auto" }}>
                <FiShoppingCart size={20} /> 
                {added ? "Item Secured!" : `Add ${qty > 1 ? `${qty}x ` : ""}To Cart`}
              </motion.button>

              {/* Wishlist Button */}
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setWishlist(!wishlist)}
                className="btn btn-secondary"
                style={{ padding: "0 20px", border: wishlist ? "1px solid var(--primary-vibrant)" : "1px solid var(--border)", color: wishlist ? "var(--primary-vibrant)" : "var(--text-primary)", background: wishlist ? "rgba(255,0,85,0.1)" : "rgba(255,255,255,0.05)" }}>
                <FiHeart size={22} fill={wishlist ? "var(--primary-vibrant)" : "none"} />
              </motion.button>
            </div>

            {/* Badges */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 20 }}>
              {[{ icon: FiTruck, text: "Free Global Delivery" }, { icon: FiShield, text: "2-Year Warranty" }].map(({ icon: Icon, text }) => (
                <div key={text} className="glass-card" style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px" }}>
                  <Icon size={22} color="var(--primary)" />
                  <span style={{ fontSize: "0.95rem", color: "var(--text-secondary)", fontWeight: 600 }}>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── Related Products ─── */}
        {related.length > 0 && (
          <div style={{ marginTop: 100 }}>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="section-title" style={{ marginBottom: 40, textAlign: "center" }}>
              Explore <span className="gradient-text">Similar</span> Items
            </motion.h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 24 }}>
              {related.slice(0, 4).map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Link to={`/products/${p.id}`} style={{ textDecoration: "none" }}>
                    <div className="glass-card" style={{ height: "100%", padding: 0, overflow: "hidden" }}>
                      <div style={{ background: "rgba(255,255,255,0.02)", height: 200, padding: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <motion.img whileHover={{ scale: 1.1 }} src={p.thumbnail} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "contain", transition: "transform 0.4s ease" }} />
                      </div>
                      <div style={{ padding: 20 }}>
                        <p style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</p>
                        <p className="gradient-text" style={{ fontSize: "1.2rem", fontWeight: 800 }}>${p.price}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
