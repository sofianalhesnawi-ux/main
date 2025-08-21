import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles, Minus, Plus } from 'lucide-react';
import { useOrder } from '../../../contexts/OrderContext';
import { designs } from '../../../data/mockData';

const DesignSelection: React.FC = () => {
  const { state, dispatch, nextStep, prevStep } = useOrder();

  const handleDesignSelect = (design: typeof designs[0]) => {
    dispatch({ type: 'SET_DESIGN', payload: design });
    setTimeout(nextStep, 300);
  };

  const getDesignIcon = (type: string) => {
    switch (type) {
      case 'embroidered': return <Sparkles size={24} />;
      case 'plain': return <Minus size={24} />;
      case 'custom': return <Plus size={24} />;
      default: return null;
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-white mb-2">اختر التصميم</h3>
      <p className="text-[var(--text-light)] mb-8">اختر نوع التصميم المفضل</p>

      <div className="space-y-4 mb-8">
        {designs.map((design, index) => (
          <motion.button
            key={design.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => handleDesignSelect(design)}
            className={`relative w-full p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-4 ${
              state.selectedDesign?.id === design.id
                ? 'border-[var(--accent-color)] bg-[var(--accent-color)]/10'
                : 'border-white/20 hover:border-white/40'
            }`}
          >
            <div className="text-[var(--accent-color)]">
              {getDesignIcon(design.type)}
            </div>
            
            <div className="flex-1 text-right">
              <h4 className="text-xl font-bold text-white mb-1">{design.name}</h4>
              <p className="text-[var(--accent-color)] font-semibold">
                {design.price > 0 ? `+${design.price} دينار ليبي` : 'مجاناً'}
              </p>
            </div>
            
            {state.selectedDesign?.id === design.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 bg-[var(--accent-color)] rounded-full flex items-center justify-center"
              >
                <Check size={14} className="text-black" />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 text-[var(--text-light)] hover:text-white transition-colors duration-300"
        >
          <ArrowRight size={16} />
          العودة للخطوة السابقة
        </button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextStep}
          disabled={!state.selectedDesign}
          className="btn-enhanced bg-[var(--accent-color)] text-black px-8 py-3 rounded-xl font-bold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          التالي
        </motion.button>
      </div>
    </div>
  );
};

export default DesignSelection;