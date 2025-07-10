import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import brickImage from './assets/brick.png'; // make sure this exists

const Splash = ({ onFinish }) => {
  const [showLogo, setShowLogo] = useState(false);

  useEffect(() => {
    const logoTimeout = setTimeout(() => setShowLogo(true), 1200); // wait for brick drop
    const finishTimeout = setTimeout(() => onFinish(), 3000);      // go to login after

    return () => {
      clearTimeout(logoTimeout);
      clearTimeout(finishTimeout);
    };
  }, [onFinish]);

  return (
    <div
      style={{
        background: '#e0e0e0', // light cement theme
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence>
        {!showLogo && (
          <motion.img
            key="brick"
            src={brickImage}
            alt="Brick"
            initial={{ y: -300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 120, damping: 10 }}
            style={{ width: 80, height: 80 }}
          />
        )}
      </AnimatePresence>

      {showLogo && (
        <motion.h1
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            color: '#b23b3b',
            marginTop: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          🏗️ ALPHA
        </motion.h1>
      )}
    </div>
  );
};

export default Splash;
