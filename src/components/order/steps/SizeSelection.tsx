import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useOrder } from '../../../contexts/OrderContext';
import { sizes } from '../../../data/mockData';

const SizeSelection: React.FC = () => {
  const { state, dispatch, nextStep, prevStep } = useOrder();

  const handleSizeSelect = (size: typeof sizes[0]) => {
    dispatch({ type: 'SET_SIZE', payload: size });
    setTimeout(nextStep, 300);
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-white mb-2">اختر الحجم</h3>
      <p className="text-[var(--text-light)] mb-8">اختر الحجم المناسب لك</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {sizes.map((size, index) => (
          <motion.button
            key={size.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleSizeSelect(size)}
            className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
              state.selectedSize?.id === size.id
                ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/10'
                : 'border-white/20 hover:border-white/40'
            }`}
          >
            <div className="text-3xl font-bold text-white mb-2">{size.name}</div>
            <p className="text-[var(--text-light)] text-sm">{size.label}</p>
            
            {state.selectedSize?.id === size.id && (
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

      <button
        onClick={prevStep}
        className="flex items-center gap-2 text-[var(--text-light)] hover:text-white transition-colors duration-300 mx-auto"
      >
        <ArrowRight size={16} />
        العودة للخطوة السابقة
      </button>
    </div>
  );
};

export default SizeSelection;