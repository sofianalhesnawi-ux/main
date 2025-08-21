import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, ArrowRight } from 'lucide-react';
import { useOrder } from '../../../contexts/OrderContext';

const QuantitySelection: React.FC = () => {
  const { state, dispatch, nextStep, prevStep, getTotalPrice } = useOrder();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      dispatch({ type: 'SET_QUANTITY', payload: newQuantity });
    }
  };

  const handleNext = () => {
    if (state.quantity > 0) {
      nextStep();
    }
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-white mb-2">اختر الكمية</h3>
      <p className="text-[var(--text-light)] mb-8">كم قطعة تريد؟</p>

      {/* Quantity Selector */}
      <div className="flex items-center justify-center gap-6 mb-8">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleQuantityChange(state.quantity - 1)}
          disabled={state.quantity <= 1}
          className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          <Minus size={20} />
        </motion.button>

        <motion.div
          key={state.quantity}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-2xl bg-[var(--accent-color)] flex items-center justify-center"
        >
          <span className="text-3xl font-bold text-black">{state.quantity}</span>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => handleQuantityChange(state.quantity + 1)}
          disabled={state.quantity >= 10}
          className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
        >
          <Plus size={20} />
        </motion.button>
      </div>

      {/* Price Summary */}
      <div className="glass-card rounded-2xl p-6 mb-8">
        <div className="space-y-3 text-right">
          <div className="flex justify-between items-center">
            <span className="text-white">{state.selectedProduct?.price?.toFixed(2) || '0.00'} دينار ليبي</span>
            <span className="text-[var(--text-light)]">سعر القطعة</span>
          </div>
          {state.selectedDesign && state.selectedDesign.price > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-white">+{state.selectedDesign.price?.toFixed(2) || '0.00'} دينار ليبي</span>
              <span className="text-[var(--text-light)]">إضافة التصميم</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-white">{state.quantity}</span>
            <span className="text-[var(--text-light)]">الكمية</span>
          </div>
          <hr className="border-white/20" />
          <div className="flex justify-between items-center text-lg font-bold">
            <span className="text-[var(--accent-color)]">{getTotalPrice()?.toFixed(2) || '0.00'} دينار ليبي</span>
            <span className="text-white">المجموع</span>
          </div>
        </div>
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
          onClick={handleNext}
          className="btn-enhanced bg-[var(--accent-color)] text-black px-8 py-3 rounded-xl font-bold hover:shadow-lg"
        >
          التالي
        </motion.button>
      </div>
    </div>
  );
};

export default QuantitySelection;