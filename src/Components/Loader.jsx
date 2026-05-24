import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Extremely smooth cubic easing using requestAnimationFrame ("اسموزي جداً")
    let startTimestamp = null;
    const duration = 2300; // 2.3 seconds smooth animation

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      
      // Smooth cubic-out easing formula
      const t = Math.min(elapsed / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - t, 3);
      
      setProgress(Math.floor(easeOutCubic * 100));

      if (elapsed < duration) {
        window.requestAnimationFrame(step);
      } else {
        setProgress(100);
      }
    };

    window.requestAnimationFrame(step);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.05,
        filter: 'blur(15px)',
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#040209', // Deep luxurious space background
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        color: '#fff'
      }}
    >
      {/* Immersive Cinematic Ambient Background */}
      <div 
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.3,
          filter: 'blur(120px)',
          background: `radial-gradient(circle at 50% 50%, rgba(124, 92, 246, 0.25), transparent 60%),
                       radial-gradient(circle at 20% 80%, rgba(0, 240, 255, 0.15), transparent 50%),
                       radial-gradient(circle at 80% 20%, rgba(255, 0, 127, 0.15), transparent 50%)`
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        {/* Sleek Progress Ring Wrapper */}
        <div style={{ position: 'relative', width: '220px', height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          
          {/* SVG Circular Progress Ring with smooth gradient trail */}
          <svg width="240" height="240" viewBox="0 0 100 100" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="rgba(255, 255, 255, 0.03)"
              strokeWidth="1.5"
            />
            <motion.circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="url(#loader-grad)"
              strokeWidth="2.5"
              strokeDasharray="276.4"
              initial={{ strokeDashoffset: 276.4 }}
              animate={{ strokeDashoffset: 276.4 - (276.4 * progress) / 100 }}
              strokeLinecap="round"
              transition={{ ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="loader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="50%" stopColor="#FF007F" />
                <stop offset="100%" stopColor="#00F0FF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Glowing Premium Shopping Bag SVG Icon in Center */}
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
              filter: [
                "drop-shadow(0 0 15px rgba(124, 58, 237, 0.3))",
                "drop-shadow(0 0 30px rgba(0, 240, 255, 0.6))",
                "drop-shadow(0 0 15px rgba(124, 58, 237, 0.3))"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}
          >
            <svg viewBox="0 0 100 100" width="80" height="80">
              <defs>
                <linearGradient id="bag-outline" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00F0FF" />
                  <stop offset="50%" stopColor="#FF007F" />
                  <stop offset="100%" stopColor="#7C3AED" />
                </linearGradient>
                <linearGradient id="bag-body" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(0, 240, 255, 0.15)" />
                  <stop offset="100%" stopColor="rgba(124, 58, 237, 0.02)" />
                </linearGradient>
              </defs>
              
              {/* Bag Handle */}
              <motion.path 
                d="M35,38 C35,18 65,18 65,38" 
                fill="none" 
                stroke="url(#bag-outline)" 
                strokeWidth="4" 
                strokeLinecap="round"
                animate={{ d: ["M35,38 C35,18 65,18 65,38", "M35,35 C35,15 65,15 65,35", "M35,38 C35,18 65,18 65,38"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Bag Body */}
              <path 
                d="M24,38 L76,38 L81,84 C81,89 77,93 72,93 L28,93 C23,93 19,89 19,84 Z" 
                fill="url(#bag-body)" 
                stroke="url(#bag-outline)" 
                strokeWidth="2.5" 
                strokeLinejoin="round"
              />
              
              {/* Inner Glowing Star */}
              <motion.polygon 
                points="50,53 53,60 60,61 55,66 56,73 50,69 44,73 45,66 40,61 47,60" 
                fill="#FFFFFF"
                animate={{ opacity: [0.7, 1, 0.7], scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                style={{ transformOrigin: '50px 63px' }}
              />
            </svg>
          </motion.div>
        </div>

        {/* Dynamic Percentage Counter */}
        <div style={{ marginTop: '35px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <motion.div
            style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              fontFamily: "'Outfit', sans-serif",
              letterSpacing: '2px',
              background: 'linear-gradient(135deg, #FFF, #A78BFA)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {progress}<span style={{ fontSize: '1.2rem', fontWeight: 400, opacity: 0.6, marginLeft: 2 }}>%</span>
          </motion.div>

          {/* Smooth Loading Bar */}
          <div style={{ width: 140, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 10, marginTop: 16, overflow: 'hidden', position: 'relative' }}>
            <motion.div 
              style={{ height: '100%', background: 'linear-gradient(90deg, #7C3AED, #00F0FF)', width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Smooth Status Subtitle */}
        <motion.p
          animate={{ opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{
            marginTop: '20px',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: '#A78BFA',
            fontFamily: "'Outfit', sans-serif"
          }}
        >
          CURATING YOUR COLLECTION
        </motion.p>
      </div>

      {/* Atmospheric Starfield Particles */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) + 100,
            opacity: 0,
            scale: Math.random() * 0.8 + 0.4
          }}
          animate={{ 
            y: [null, Math.random() * -120],
            opacity: [0, 0.4, 0]
          }}
          transition={{ 
            duration: Math.random() * 4 + 3, 
            repeat: Infinity,
            delay: Math.random() * 2 
          }}
          style={{
            position: 'absolute',
            width: '3px',
            height: '3px',
            background: i % 2 === 0 ? '#00F0FF' : '#FF007F',
            borderRadius: '50%',
            filter: 'blur(0.5px)',
            pointerEvents: 'none'
          }}
        />
      ))}
    </motion.div>
  );
};

export default Loader;
