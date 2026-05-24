import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "./Home";
import Products from "./Products";
import ProductDetail from "./ProductDetail";
import About from "./About";
import Contact from "./Contact";
import Cart from "./Cart";
import Checkout from "./Checkout";
import NotFound from "./NotFound";
import Login from "./Login";
import Signup from "./Signup";
import Loader from "./Loader";
import Onboarding from "./Onboarding";

function ParticlesBg() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 60 + 20,
    left: Math.random() * 100,
    delay: Math.random() * 8,
    duration: Math.random() * 10 + 12,
    color: i % 3 === 0 ? "#00F0FF" : i % 3 === 1 ? "#B026FF" : "#FF0055",
  }));

  return (
    <div className="particles-bg">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            width: p.size,
            height: p.size,
            left: `${p.left}%`,
            bottom: "-100px",
            background: p.color,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [hasVisited, setHasVisited] = useState(() => localStorage.getItem('hasVisited') === 'true');

  useEffect(() => {
    // Splash screen timer
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Show onboarding if never visited
      if (!hasVisited) {
        setShowOnboarding(true);
      }
    }, 2500);
    return () => clearTimeout(timer);
  }, [hasVisited]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasVisited', 'true');
    setHasVisited(true);
    setShowOnboarding(false);
  };

  const loginUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  function addToCart(product) {
    if (!user) {
      import("react-hot-toast").then((module) => {
        module.default.error("You must sign in to add items to cart.");
      });
      return;
    }
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId, delta) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {showOnboarding && <Onboarding key="onboarding" onComplete={handleOnboardingComplete} />}
      </AnimatePresence>

      <ParticlesBg />
      <Navbar cartCount={cartCount} theme={theme} setTheme={setTheme} user={user} logoutUser={logoutUser} hasVisited={hasVisited} />

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "var(--bg-secondary)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            fontFamily: "Inter, sans-serif",
            fontSize: "0.9rem",
          },
          success: {
            iconTheme: { primary: "var(--purple)", secondary: "var(--bg-primary)" },
          },
        }}
      />

      <div style={{ minHeight: "100vh", position: "relative", zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home addToCart={addToCart} />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
                clearCart={clearCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                clearCart={clearCart}
              />
            }
          />
          <Route path="/login" element={<Login loginUser={loginUser} />} />
          <Route path="/signup" element={<Signup loginUser={loginUser} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;