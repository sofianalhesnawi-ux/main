import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useOrder } from '../../contexts/OrderContext';

const steps = [
  { number: 1, title: 'اللون' },
  { number: 2, title: 'الحجم' },
  { number: 3, title: 'التصميم' },
  { number: 4, title: 'الكمية' },
  { number: 5, title: 'البيانات' },
  { number: 6, title: 'التأكيد' },
];

const OrderSteps: React.FC = () => {
  const { state } = useOrder();

  return (
    <div className="flex justify-between items-center mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Step Circle */}
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`relative w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
              step.number < state.currentStep
                ? 'bg-[var(--accent-color)] text-black'
                : step.number === state.currentStep
                ? 'bg-white text-black'
                : 'bg-white/20 text-white'
            }`}
          >
            {step.number < state.currentStep ? (
              <Check size={16} />
            ) : (
              step.number
            )}
          </motion.div>

          {/* Step Title */}
          <div className="hidden md:block mr-2">
            <p className={`text-xs font-medium ${
              step.number <= state.currentStep ? 'text-white' : 'text-white/60'
            }`}>
              {step.title}
            </p>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div className={`hidden md:block w-8 h-0.5 mx-4 transition-colors duration-300 ${
              step.number < state.currentStep ? 'bg-[var(--accent-color)]' : 'bg-white/20'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
};

export default OrderSteps;