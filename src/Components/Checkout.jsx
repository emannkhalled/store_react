import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { FiCheck, FiCreditCard, FiTruck, FiUser, FiMail, FiMapPin, FiPhone, FiLock, FiShoppingBag, FiArrowLeft, FiPackage } from "react-icons/fi";
import toast from "react-hot-toast";

const steps = [
  { id: 1, label: "Shipping", icon: FiTruck },
  { id: 2, label: "Payment", icon: FiCreditCard },
  { id: 3, label: "Confirm", icon: FiCheck },
];

function StepIndicator({ currentStep }) {
  const G = { className: "gradient-main" };
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 48 }}>
      {steps.map((step, i) => (
        <div key={step.id} style={{ display: "flex", alignItems: "center" }}>
          <motion.div
            animate={{ scale: currentStep === step.id ? 1.1 : 1 }}
            style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 20px", borderRadius: 12,
              background: currentStep >= step.id ? "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(6,182,212,0.15))" : "rgba(255,255,255,0.04)",
              border: `1px solid ${currentStep >= step.id ? "rgba(124,58,237,0.4)" : "rgba(255,255,255,0.08)"}`,
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 10,
              background: currentStep >= step.id ? "linear-gradient(135deg,#7C3AED,#06B6D4)" : "rgba(255,255,255,0.08)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {currentStep > step.id ? <FiCheck size={16} color="#fff" /> : <step.icon size={16} color={currentStep >= step.id ? "#fff" : "#475569"} />}
            </div>
            <span style={{ fontSize: "0.88rem", fontWeight: currentStep === step.id ? 700 : 500, color: currentStep >= step.id ? "#F8FAFC" : "#475569", display: "none" }} className="step-label">{step.label}</span>
          </motion.div>
          {i < steps.length - 1 && (
            <div style={{ width: 50, height: 2, background: currentStep > step.id ? "linear-gradient(90deg,#7C3AED,#06B6D4)" : "rgba(255,255,255,0.08)", margin: "0 4px" }} />
          )}
        </div>
      ))}
      <style>{`@media(min-width:600px){.step-label{display:inline !important;}}`}</style>
    </div>
  );
}

function InputField({ icon: Icon, label, placeholder, value, onChange, type = "text", required = true }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#94A3B8", marginBottom: 6, display: "block" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <Icon style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#475569" }} size={16} />
        <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} required={required}
          style={{ width: "100%", padding: "13px 14px 13px 42px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, color: "#F8FAFC", fontFamily: "Inter,sans-serif", fontSize: "0.92rem", outline: "none", boxSizing: "border-box", transition: "all 0.3s ease" }}
          onFocus={e => { e.target.style.borderColor = "#7C3AED"; e.target.style.boxShadow = "0 0 0 3px rgba(124,58,237,0.15)"; }}
          onBlur={e => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.boxShadow = "none"; }}
        />
      </div>
    </div>
  );
}

function Checkout({ cart, clearCart }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [shipping, setShipping] = useState({ name: "", email: "", phone: "", address: "", city: "", zip: "" });
  const [payment, setPayment] = useState({ cardNumber: "", expiry: "", cvv: "", cardName: "" });

  const subtotal = cart.reduce((s, item) => s + item.price * item.quantity, 0);
  const shippingCost = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;
  const itemCount = cart.reduce((s, item) => s + item.quantity, 0);

  const G = { className: "gradient-main" };

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div style={{ paddingTop: 90, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", padding: "60px 24px" }}>
          <div style={{ fontSize: "4rem", marginBottom: 20 }}>🛒</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 12 }}>Your cart is empty</h2>
          <p style={{ color: "#64748B", marginBottom: 32 }}>Add some products before checking out.</p>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <motion.button whileHover={{ scale: 1.05 }} style={{ padding: "14px 32px", background: "linear-gradient(135deg,#7C3AED,#06B6D4)", border: "none", borderRadius: 14, color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "Inter,sans-serif", display: "flex", alignItems: "center", gap: 10 }}>
              <FiShoppingBag /> Browse Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div style={{ paddingTop: 90, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: "spring", stiffness: 150 }}
          style={{ textAlign: "center", padding: "60px 32px", maxWidth: 500, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: 28 }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}
            style={{ width: 90, height: 90, borderRadius: "50%", background: "linear-gradient(135deg,rgba(16,185,129,0.2),rgba(6,182,212,0.15))", border: "2px solid rgba(16,185,129,0.4)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px" }}>
            <FiCheck size={40} color="#10B981" />
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: 12 }}>Order Confirmed! 🎉</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ color: "#94A3B8", fontSize: "1rem", lineHeight: 1.7, marginBottom: 8 }}>
            Thank you, <strong style={{ color: "#F8FAFC" }}>{shipping.name || "Customer"}</strong>!
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            style={{ color: "#64748B", marginBottom: 12 }}>
            Order #SPR-{Math.floor(Math.random() * 90000 + 10000)}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ fontSize: "2rem", fontWeight: 900, ...G, marginBottom: 28 }}>${total.toFixed(2)}</motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
            style={{ color: "#64748B", fontSize: "0.9rem", marginBottom: 32 }}>
            A confirmation email has been sent to <strong style={{ color: "#9F67FA" }}>{shipping.email || "your email"}</strong>
          </motion.p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/home" style={{ textDecoration: "none" }}>
              <motion.button whileHover={{ scale: 1.05 }} style={{ padding: "14px 28px", background: "linear-gradient(135deg,#7C3AED,#06B6D4)", border: "none", borderRadius: 14, color: "#fff", fontWeight: 700, cursor: "pointer", fontFamily: "Inter,sans-serif" }}>
                Back to Home
              </motion.button>
            </Link>
            <Link to="/products" style={{ textDecoration: "none" }}>
              <motion.button whileHover={{ scale: 1.05 }} style={{ padding: "14px 28px", background: "transparent", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 14, color: "#F8FAFC", fontWeight: 600, cursor: "pointer", fontFamily: "Inter,sans-serif" }}>
                Continue Shopping
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
    toast.success("🎉 Order placed successfully!");
  };

  return (
    <div style={{ paddingTop: 90, paddingBottom: 80, minHeight: "100vh" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px" }}>

        {/* Back */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <motion.button whileHover={{ x: -4 }} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 18px", color: "#94A3B8", cursor: "pointer", fontFamily: "Inter,sans-serif", fontWeight: 500 }}>
              <FiArrowLeft /> Back to Cart
            </motion.button>
          </Link>
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          style={{ fontSize: "clamp(1.8rem,4vw,2.5rem)", fontWeight: 900, marginBottom: 8, textAlign: "center" }}>
          <span style={G}>Checkout</span>
        </motion.h1>
        <p style={{ color: "#64748B", textAlign: "center", marginBottom: 36 }}>{itemCount} item{itemCount > 1 ? "s" : ""} · ${total.toFixed(2)}</p>

        <StepIndicator currentStep={step} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 32, alignItems: "start" }}>

          {/* Form Area */}
          <div>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="shipping" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
                  className="glass-card" style={{ padding: 32 }}>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}><FiTruck color="#7C3AED" /> Shipping Details</h2>
                  <InputField icon={FiUser} label="Full Name" placeholder="John Doe" value={shipping.name} onChange={v => setShipping({ ...shipping, name: v })} />
                  <InputField icon={FiMail} label="Email" placeholder="john@example.com" type="email" value={shipping.email} onChange={v => setShipping({ ...shipping, email: v })} />
                  <InputField icon={FiPhone} label="Phone" placeholder="+1 555 123 4567" value={shipping.phone} onChange={v => setShipping({ ...shipping, phone: v })} />
                  <InputField icon={FiMapPin} label="Address" placeholder="123 Main Street" value={shipping.address} onChange={v => setShipping({ ...shipping, address: v })} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <InputField icon={FiMapPin} label="City" placeholder="San Francisco" value={shipping.city} onChange={v => setShipping({ ...shipping, city: v })} />
                    <InputField icon={FiMapPin} label="ZIP Code" placeholder="94102" value={shipping.zip} onChange={v => setShipping({ ...shipping, zip: v })} />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => { if (shipping.name && shipping.email && shipping.address) setStep(2); else toast.error("Please fill all fields"); }}
                    className="btn btn-primary" style={{ width: "100%", marginTop: 10, padding: "16px", fontSize: "1.1rem" }}>
                    Continue to Payment →
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="payment" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
                  className="glass-card" style={{ padding: 32 }}>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}><FiCreditCard color="#7C3AED" /> Payment Details</h2>
                  <InputField icon={FiUser} label="Cardholder Name" placeholder="John Doe" value={payment.cardName} onChange={v => setPayment({ ...payment, cardName: v })} />
                  <InputField icon={FiCreditCard} label="Card Number" placeholder="4242 4242 4242 4242" value={payment.cardNumber} onChange={v => setPayment({ ...payment, cardNumber: v })} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <InputField icon={FiCreditCard} label="Expiry" placeholder="MM/YY" value={payment.expiry} onChange={v => setPayment({ ...payment, expiry: v })} />
                    <InputField icon={FiLock} label="CVV" placeholder="123" value={payment.cvv} onChange={v => setPayment({ ...payment, cvv: v })} />
                  </div>
                  <div style={{ padding: "12px 16px", background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)", borderRadius: 12, marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
                    <FiLock size={15} color="#9F67FA" />
                    <span style={{ fontSize: "0.82rem", color: "#94A3B8" }}>Your payment info is encrypted and secure</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStep(1)}
                      style={{ padding: "14px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, color: "#94A3B8", fontWeight: 600, cursor: "pointer", fontFamily: "Inter,sans-serif" }}>
                      ← Back
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => { if (payment.cardNumber && payment.expiry && payment.cvv) setStep(3); else toast.error("Please fill payment details"); }}
                      className="btn btn-primary" style={{ padding: "14px" }}>
                      Review Order →
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="confirm" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }}
                  className="glass-card" style={{ padding: 32 }}>
                  <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 10 }}><FiCheck color="#7C3AED" /> Review Order</h2>

                  {/* Shipping Summary */}
                  <div style={{ padding: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>Shipping To</span>
                      <motion.button whileTap={{ scale: 0.95 }} onClick={() => setStep(1)} style={{ background: "none", border: "none", color: "#9F67FA", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, fontFamily: "Inter,sans-serif" }}>Edit</motion.button>
                    </div>
                    <p style={{ color: "#94A3B8", fontSize: "0.88rem", lineHeight: 1.6 }}>{shipping.name}<br />{shipping.address}<br />{shipping.city}, {shipping.zip}<br />{shipping.email}</p>
                  </div>

                  {/* Payment Summary */}
                  <div style={{ padding: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>Payment</span>
                      <motion.button whileTap={{ scale: 0.95 }} onClick={() => setStep(2)} style={{ background: "none", border: "none", color: "#9F67FA", cursor: "pointer", fontSize: "0.82rem", fontWeight: 600, fontFamily: "Inter,sans-serif" }}>Edit</motion.button>
                    </div>
                    <p style={{ color: "#94A3B8", fontSize: "0.88rem" }}>•••• •••• •••• {payment.cardNumber.slice(-4) || "0000"}</p>
                  </div>

                  {/* Items */}
                  <div style={{ padding: 18, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, marginBottom: 24 }}>
                    <span style={{ fontWeight: 600, fontSize: "0.9rem", display: "block", marginBottom: 14 }}>Items ({itemCount})</span>
                    {cart.map(item => (
                      <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                        <img src={item.thumbnail} alt={item.title} style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover" }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontSize: "0.85rem", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</p>
                          <p style={{ fontSize: "0.78rem", color: "#64748B" }}>x{item.quantity}</p>
                        </div>
                        <span style={{ fontSize: "0.9rem", fontWeight: 700, ...G }}>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStep(2)}
                      style={{ padding: "14px", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, color: "#94A3B8", fontWeight: 600, cursor: "pointer", fontFamily: "Inter,sans-serif" }}>
                      ← Back
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(124,58,237,0.6)" }} whileTap={{ scale: 0.98 }}
                      onClick={handlePlaceOrder}
                      className="btn btn-primary" style={{ padding: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <FiLock size={15} /> Place Order
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="glass-card" style={{ padding: 32, position: "sticky", top: 100 }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 20 }}>Order Summary</h2>
            <div style={{ maxHeight: 200, overflowY: "auto", marginBottom: 20 }}>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <img src={item.thumbnail} alt={item.title} style={{ width: 48, height: 48, borderRadius: 10, objectFit: "cover" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: "0.85rem", fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</p>
                    <p style={{ fontSize: "0.78rem", color: "#64748B" }}>Qty: {item.quantity}</p>
                  </div>
                  <span style={{ fontSize: "0.9rem", fontWeight: 700 }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div style={{ height: 1, background: "rgba(255,255,255,0.07)", margin: "16px 0" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#94A3B8" }}>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#94A3B8" }}>Shipping</span><span style={{ color: shippingCost === 0 ? "#10B981" : "#F8FAFC" }}>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span style={{ color: "#94A3B8" }}>Tax</span><span>${tax.toFixed(2)}</span></div>
              <div style={{ height: 1, background: "rgba(255,255,255,0.07)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>Total</span>
                <span style={{ fontSize: "1.5rem", fontWeight: 900, ...G }}>${total.toFixed(2)}</span>
              </div>
            </div>
            <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 8 }}>
              {[{ icon: FiLock, text: "Secure SSL checkout" }, { icon: FiTruck, text: "Free shipping over $50" }, { icon: FiPackage, text: "30-day easy returns" }].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon size={14} color="#7C3AED" /><span style={{ fontSize: "0.8rem", color: "#64748B" }}>{text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
