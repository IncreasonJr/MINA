import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-50 pointer-events-none flex flex-col items-end">
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="pointer-events-auto bg-[#141414] text-white px-5 py-3.5 rounded-2xl border-3 border-[#141414] shadow-brutal flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-7 h-7 rounded-lg bg-[#00C853] text-white flex items-center justify-center flex-shrink-0 border border-white/20">
              <Check className="w-4 h-4 stroke-[3]" />
            </div>
            <div className="text-xs font-bold font-sans tracking-wide">
              {toastMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
