import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FiTrash2, FiShoppingBag, FiArrowRight, FiMinus, FiPlus, FiX, FiTruck, FiShield } from "react-icons/fi";
import toast from "react-hot-toast";

function CartItem({ item, removeFromCart, updateQuantity }) {
  const handleRemove = () => {
    removeFromCart(item.id);
    toast.error(`"${item.title.substring(0, 20)}..." removed`, { duration: 2000 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30, height: 0, marginBottom: 0, padding: 0 }}
      transition={{ duration: 0.35 }}
      className="glass-card"
      style={{ padding: "16px 24px", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", marginBottom: 16 }}
    >
      <div style={{ width: 80, height: 80, background: "rgba(255,255,255,0.02)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 }}>
        <img src={item.thumbnail} alt={item.title} style={{ width: "90%", height: "90%", objectFit: "contain", filter: "drop-shadow(0 5px 10px rgba(0,0,0,0.3))" }} />
      </div>
      <div style={{ flex: 1, minWidth: 140 }}>
        <h3 style={{ fontSize: "1.05rem", fontWeight: 700, marginBottom: 8, color: "var(--text-primary)" }}>{item.title}</h3>
        <span className="badge" style={{ fontSize: "0.75rem", padding: "4px 10px" }}>{item.category}</span>
      </div>

      {/* Quantity Controls */}
      <div style={{ display: "flex", alignItems: "center", gap: 0, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateQuantity(item.id, -1)}
          style={{ padding: "10px 14px", background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", display: "flex", alignItems: "center" }}>
          <FiMinus size={16} />
        </motion.button>
        <motion.span key={item.quantity} initial={{ scale: 1.4 }} animate={{ scale: 1 }}
          style={{ padding: "10px 16px", fontWeight: 800, minWidth: 40, textAlign: "center", display: "block", color: "var(--text-primary)" }}>
          {item.quantity}
        </motion.span>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => updateQuantity(item.id, 1)}
          style={{ padding: "10px 14px", background: "none", border: "none", color: "var(--text-primary)", cursor: "pointer", display: "flex", alignItems: "center" }}>
          <FiPlus size={16} />
        </motion.button>
      </div>

      <div style={{ textAlign: "right", minWidth: 100 }}>
        <p className="gradient-vibrant" style={{ fontSize: "1.2rem", fontWeight: 900 }}>
          ${(item.price * item.quantity).toFixed(2)}
        </p>
        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: 4 }}>${item.price} each</p>
      </div>

      <motion.button whileTap={{ scale: 0.9 }} whileHover={{ scale: 1.1 }} onClick={handleRemove}
        style={{ padding: 12, background: "rgba(255,0,85,0.1)", border: "1px solid rgba(255,0,85,0.2)", borderRadius: "var(--radius-sm)", color: "var(--primary-vibrant)", cursor: "pointer" }}>
        <FiTrash2 size={18} />
      </motion.button>
    </motion.div>
  );
}

function Cart({ cart, removeFromCart, updateQuantity, clearCart }) {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + shipping;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="page-wrapper" style={{ position: "relative" }}>
      {/* Background Orbs */}
      <div className="orb orb-purple" style={{ top: "10%", left: "-10%", width: "40vw", height: "40vw" }} />

      <div className="container" style={{ position: "relative", zIndex: 1, paddingBottom: 100 }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 40, paddingTop: 40 }}>
          <h1 className="section-title" style={{ marginBottom: 8 }}>
            Your <span className="gradient-main">Cart</span>
          </h1>
          <p className="section-subtitle" style={{ margin: 0 }}>
            {itemCount > 0 ? `${itemCount} item${itemCount > 1 ? "s" : ""} in your cart` : "Your cart is empty"}
          </p>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="glass-card" style={{ textAlign: "center", padding: "100px 24px" }}>
            <motion.div animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{ fontSize: "5rem", marginBottom: 24 }}>🛍️</motion.div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: 12, color: "var(--text-primary)" }}>Your cart is empty</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: 40, maxWidth: 400, margin: "0 auto 40px", fontSize: "1.1rem" }}>
              Looks like you haven't added any items yet. Start exploring our creative collection!
            </p>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <motion.button className="btn btn-primary" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <FiShoppingBag /> Start Shopping <FiArrowRight />
              </motion.button>
            </Link>
          </motion.div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 40, alignItems: "start" }}>

            {/* Items List */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "var(--text-primary)" }}>Review Items ({itemCount})</h2>
                <motion.button whileTap={{ scale: 0.95 }} onClick={() => { clearCart(); toast.success("Cart cleared!"); }}
                  style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", background: "rgba(255,0,85,0.1)", border: "1px solid rgba(255,0,85,0.3)", borderRadius: "var(--radius-sm)", color: "var(--primary-vibrant)", cursor: "pointer", fontSize: "0.95rem", fontWeight: 700 }}>
                  <FiX size={16} /> Clear All
                </motion.button>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <AnimatePresence>
                  {cart.map(item => (
                    <CartItem key={item.id} item={item} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
                  ))}
                </AnimatePresence>
              </div>
              <div style={{ marginTop: 24 }}>
                <Link to="/products" style={{ textDecoration: "none" }}>
                  <motion.button whileHover={{ x: -4 }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", background: "none", border: "none", color: "var(--primary)", fontSize: "1rem", fontWeight: 700, cursor: "pointer" }}>
                    ← Continue Shopping
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="glass-card" style={{ padding: 32, position: "sticky", top: 100 }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: 32, color: "var(--text-primary)" }}>Order Summary</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.05rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Subtotal ({itemCount} items)</span>
                  <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.05rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Shipping</span>
                  <span style={{ fontWeight: 700, color: shipping === 0 ? "#10B981" : "var(--text-primary)" }}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <div style={{ padding: "12px 16px", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "var(--radius-sm)", fontSize: "0.95rem", color: "#10B981", fontWeight: 600 }}>
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}
                
                <div className="divider" style={{ margin: "10px 0" }} />
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <span style={{ fontWeight: 800, fontSize: "1.2rem", color: "var(--text-primary)" }}>Total</span>
                  <motion.span key={total} initial={{ scale: 1.2 }} animate={{ scale: 1 }}
                    className="gradient-main" style={{ fontSize: "2rem", fontWeight: 900 }}>
                    ${total.toFixed(2)}
                  </motion.span>
                </div>
              </div>

              <Link to="/checkout" style={{ textDecoration: "none" }}>
                <motion.button className="btn btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  style={{ width: "100%", marginTop: 32, padding: "18px", fontSize: "1.1rem" }}>
                  Proceed to Checkout <FiArrowRight size={20} />
                </motion.button>
              </Link>

              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
                {[{ icon: FiShield, text: "Secure SSL encrypted checkout" }, { icon: FiTruck, text: "Free express returns within 30 days" }].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Icon size={18} color="var(--primary)" />
                    <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 500 }}>{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;