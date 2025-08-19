import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useOrder } from '../../../contexts/OrderContext';
import { colors } from '../../../data/mockData';

const ColorSelection: React.FC = () => {
  const { state, dispatch, nextStep } = useOrder();

  const handleColorSelect = (color: typeof colors[0]) => {
    dispatch({ type: 'SET_COLOR', payload: color });
    setTimeout(nextStep, 300);
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-white mb-2">اختر اللون</h3>
      <p className="text-[var(--text-light)] mb-8">اختر اللون المفضل لديك</p>

      <div className="grid grid-cols-3 gap-4">
        {colors.map((color, index) => (
          <motion.button
            key={color.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleColorSelect(color)}
            className={`relative p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              state.selectedColor?.id === color.id
                ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/10'
                : 'border-white/20 hover:border-white/40'
            }`}
          >
            <div
              className="w-16 h-16 rounded-full mx-auto mb-3 border-2 border-white/20"
              style={{ backgroundColor: color.hex }}
            />
            <p className="text-white font-medium">{color.name}</p>
            
            {state.selectedColor?.id === color.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 w-6 h-6 bg-[var(--accent-color)] rounded-full flex items-center justify-center"
              >
                <Check size={14} className="text-black" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;