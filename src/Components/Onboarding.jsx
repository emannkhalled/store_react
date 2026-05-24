import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiShoppingBag, FiTruck, FiShield } from 'react-icons/fi';

const slides = [
  {
    title: "Welcome to ShopZone",
    description: "Discover a new era of premium shopping with a minimalist touch and high-end experience.",
    icon: <FiShoppingBag size={60} />,
    color: "#0071E3"
  },
  {
    title: "Elite Selection",
    description: "We curate only the finest electronics, lifestyle essentials, and more, just for you.",
    icon: <FiShield size={60} />,
    color: "#1D1D1F"
  },
  {
    title: "Swift Delivery",
    description: "Global shipping at the speed of light. Your premium orders arrive safe and fast.",
    icon: <FiTruck size={60} />,
    color: "#0071E3"
  }
];

const Onboarding = ({ onComplete }) => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    if (current === slides.length - 1) {
      onComplete();
    } else {
      setCurrent(current + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        background: 'var(--bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ maxWidth: '400px', width: '90%', textAlign: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            style={{ padding: '40px 0' }}
          >
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 40px',
              background: 'var(--bg-secondary)',
              borderRadius: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-vibrant)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--border)'
            }}>
              {slides[current].icon}
            </div>
            
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              marginBottom: '20px',
              letterSpacing: '-1px'
            }}>
              {slides[current].title}
            </h2>
            
            <p style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
              lineHeight: '1.6',
              marginBottom: '40px'
            }}>
              {slides[current].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
          {slides.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === current ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === current ? 'var(--primary-vibrant)' : 'var(--border)',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          style={{
            width: '100%',
            padding: '18px',
            background: 'var(--primary-vibrant)',
            color: '#fff',
            border: 'none',
            borderRadius: '100px',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px'
          }}
        >
          {current === slides.length - 1 ? "Get Started" : "Continue"}
          <FiArrowRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Onboarding;
