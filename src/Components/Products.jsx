import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FiSearch, FiShoppingCart, FiStar, FiFilter, FiGrid, FiList, FiX } from "react-icons/fi";

function SkeletonCard() {
  return (
    <div className="glass-card" style={{ padding: 0, overflow: "hidden" }}>
      <div className="skeleton" style={{ height: 200, borderRadius: "var(--radius-lg) var(--radius-lg) 0 0" }} />
      <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="skeleton" style={{ height: 18, width: "75%", borderRadius: 6 }} />
        <div className="skeleton" style={{ height: 14, width: "50%", borderRadius: 6 }} />
        <div className="skeleton" style={{ height: 14, width: "30%", borderRadius: 6 }} />
        <div className="skeleton" style={{ height: 44, borderRadius: "var(--radius-sm)", marginTop: 10 }} />
      </div>
    </div>
  );
}

function ProductCard({ product, addToCart, view }) {
  const [added, setAdded] = useState(false);
  const [hover, setHover] = useState(false);

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    toast.success(`"${product.title.substring(0, 22)}..." added to cart!`, { duration: 2000 });
    setTimeout(() => setAdded(false), 1500);
  };

  if (view === "list") {
    return (
      <motion.div layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
        className="glass-card"
        style={{ padding: 20, display: "flex", gap: 24, alignItems: "center" }}>
        <Link to={`/products/${product.id}`} style={{ textDecoration: "none", flexShrink: 0 }}>
          <div style={{ width: 120, height: 120, background: "rgba(255,255,255,0.02)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
            <img src={product.thumbnail} alt={product.title} style={{ width: "90%", height: "90%", objectFit: "contain", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))" }} />
          </div>
        </Link>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Link to={`/products/${product.id}`} style={{ textDecoration: "none" }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)", marginBottom: 8, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.title}</h3>
          </Link>
          <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: 12, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", lineHeight: 1.6 }}>{product.description}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            {[...Array(5)].map((_, i) => <FiStar key={i} size={14} className={i < Math.round(product.rating) ? "star" : "star-empty"} />)}
            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginLeft: 4 }}>({product.rating})</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 16, flexShrink: 0 }}>
          <span className="gradient-main" style={{ fontSize: "1.6rem", fontWeight: 800 }}>${product.price}</span>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleAdd}
            className="btn btn-primary" style={{ padding: "10px 24px", fontSize: "0.95rem" }}>
            <FiShoppingCart size={16} /> {added ? "Added!" : "Add to Cart"}
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
      onHoverStart={() => setHover(true)} onHoverEnd={() => setHover(false)}
      whileHover={{ y: -8 }}
      className="glass-card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <Link to={`/products/${product.id}`} style={{ textDecoration: "none", flexShrink: 0 }}>
        <div style={{ height: 220, position: "relative", overflow: "hidden", background: "rgba(255,255,255,0.01)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <motion.img src={product.thumbnail} alt={product.title}
            animate={{ scale: hover ? 1.1 : 1 }} transition={{ duration: 0.4 }}
            style={{ width: "80%", height: "80%", objectFit: "contain", filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.3))" }}
          />
          <div style={{ position: "absolute", top: 16, left: 16 }}>
             <span className="badge" style={{ fontSize: "0.7rem", padding: "4px 10px" }}>{product.category}</span>
          </div>
          <div style={{ position: "absolute", top: 16, right: 16, padding: "6px 12px", background: "var(--bg-primary)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem", fontWeight: 800, color: "var(--text-primary)", border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
            ${product.price}
          </div>
          <AnimatePresence>
            {hover && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span className="btn btn-secondary" style={{ pointerEvents: "none" }}>View Details</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Link>
      <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 8, color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.title}</h3>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 20 }}>
          {[...Array(5)].map((_, i) => <FiStar key={i} size={14} className={i < Math.round(product.rating) ? "star" : "star-empty"} />)}
          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginLeft: 6 }}>({product.rating})</span>
        </div>
        <div style={{ marginTop: "auto" }}>
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleAdd}
            className="btn btn-primary" style={{ width: "100%", padding: "12px", fontSize: "0.95rem" }}>
            <FiShoppingCart size={16} /> {added ? "✓ Added!" : "Add to Cart"}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function Products({ addToCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const initialCategory = location.state?.category || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [view, setView] = useState("grid");
  const [categories, setCategories] = useState(["All"]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=100").then(res => {
      const data = res.data.products;
      setProducts(data);
      const cats = ["All", ...new Set(data.map(p => p.category))];
      setCategories(cats);
      setLoading(false);
    }).catch(err => { console.error(err); setLoading(false); });
  }, []);

  const filtered = products.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="page-wrapper" style={{ position: "relative" }}>
      {/* Background Orbs */}
      <div className="orb orb-cyan" style={{ top: "10%", left: "-5%", width: "40vw", height: "40vw" }} />

      <div className="container" style={{ position: "relative", zIndex: 1, paddingBottom: 100 }}>
        
        {/* Header */}
        <div style={{ paddingTop: 40, paddingBottom: 40, textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <span className="badge"><FiFilter size={14} /> All Products</span>
            </div>
            <h1 className="section-title">
              Discover Our <span className="gradient-text">Collection</span>
            </h1>
            <p className="section-subtitle" style={{ maxWidth: 600, margin: "0 auto" }}>Browse {products.length}+ premium products across {categories.length - 1} categories</p>
          </motion.div>
        </div>

        {/* Search + View Toggle */}
        <div style={{ marginBottom: 40 }}>
          <div className="glass-card" style={{ display: "flex", gap: 20, flexWrap: "wrap", alignItems: "center", padding: 20 }}>
            <div style={{ flex: 1, minWidth: 280, position: "relative" }}>
              <FiSearch style={{ position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)", zIndex: 1 }} size={20} />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                className="input-field"
                style={{ paddingLeft: 54, background: "rgba(0,0,0,0.2)" }}
              />
              {search && (
                <button onClick={() => setSearch("")} style={{ position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", zIndex: 1 }}>
                  <FiX size={20} />
                </button>
              )}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[{ icon: FiGrid, val: "grid" }, { icon: FiList, val: "list" }].map(({ icon: Icon, val }) => (
                <motion.button key={val} whileTap={{ scale: 0.9 }} onClick={() => setView(val)}
                  style={{ 
                    padding: "14px", 
                    background: view === val ? "var(--primary-light)" : "rgba(255,255,255,0.05)", 
                    border: `1px solid ${view === val ? "var(--primary)" : "var(--border)"}`, 
                    borderRadius: "var(--radius-md)", 
                    color: view === val ? "var(--primary)" : "var(--text-muted)", 
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}>
                  <Icon size={20} />
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div style={{ marginBottom: 40, overflowX: "auto" }}>
          <div style={{ display: "flex", gap: 12, flexWrap: "nowrap", paddingBottom: 10 }}>
            {categories.map(cat => (
              <motion.button key={cat} whileTap={{ scale: 0.95 }} onClick={() => setActiveCategory(cat)}
                style={{ 
                  padding: "10px 24px", 
                  borderRadius: 100, 
                  border: `1px solid ${activeCategory === cat ? "var(--primary)" : "var(--border)"}`, 
                  background: activeCategory === cat ? "var(--primary-light)" : "var(--bg-card)", 
                  color: activeCategory === cat ? "var(--primary)" : "var(--text-secondary)", 
                  fontWeight: activeCategory === cat ? 700 : 500, 
                  fontSize: "0.95rem", 
                  cursor: "pointer", 
                  whiteSpace: "nowrap", 
                  fontFamily: "'Plus Jakarta Sans', sans-serif", 
                  transition: "all 0.3s ease",
                  backdropFilter: "blur(10px)"
                }}>
                {cat}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div style={{ marginBottom: 30 }}>
          <p style={{ color: "var(--text-secondary)", fontSize: "1rem" }}>
            Showing <strong style={{ color: "var(--text-primary)" }}>{filtered.length}</strong> products
            {search && <> for "<strong className="gradient-text">{search}</strong>"</>}
          </p>
        </div>

        {/* Products Grid/List */}
        <div>
          {loading ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 30 }}>
              {[...Array(12)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card" style={{ textAlign: "center", padding: "100px 24px" }}>
              <div style={{ fontSize: "5rem", marginBottom: 24, opacity: 0.5 }}>🛸</div>
              <h3 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 12, color: "var(--text-primary)" }}>No products found</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>Try adjusting your search or filter to find what you're looking for.</p>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => { setSearch(""); setActiveCategory("All"); }}
                className="btn btn-primary" style={{ marginTop: 32 }}>
                Clear All Filters
              </motion.button>
            </motion.div>
          ) : (
            <motion.div layout style={{ display: view === "grid" ? "grid" : "flex", gridTemplateColumns: view === "grid" ? "repeat(auto-fill,minmax(280px,1fr))" : undefined, flexDirection: view === "list" ? "column" : undefined, gap: 30 }}>
              <AnimatePresence>
                {filtered.map((p, i) => <ProductCard key={p.id} product={p} addToCart={addToCart} view={view} />)}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;