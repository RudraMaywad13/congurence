'use client';

import { motion } from 'framer-motion';

const AnimatedGradient = () => {
  return (
    <motion.div
      className="absolute inset-0 z-[-1] bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-xl opacity-60"
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'linear',
      }}
      style={{
        backgroundSize: '200% 200%',
      }}
    />
  );
};

export default AnimatedGradient;
