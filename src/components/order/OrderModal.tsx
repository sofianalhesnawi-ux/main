import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useOrder } from '../../contexts/OrderContext';
import ColorSelection from './steps/ColorSelection';
import SizeSelection from './steps/SizeSelection';
import DesignSelection from './steps/DesignSelection';
import QuantitySelection from './steps/QuantitySelection';
import CustomerForm from './steps/CustomerForm';
import OrderConfirmation from './steps/OrderConfirmation';
import OrderSteps from './OrderSteps';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const { state, resetOrder } = useOrder();

  const handleClose = () => {
    resetOrder();
    onClose();
  };

  const renderStep = () => {
    switch (state.currentStep) {
      case 1: return <ColorSelection />;
      case 2: return <SizeSelection />;
      case 3: return <DesignSelection />;
      case 4: return <QuantitySelection />;
      case 5: return <CustomerForm />;
      case 6: return <OrderConfirmation onClose={handleClose} />;
      default: return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-3xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 left-6 text-white hover:text-[var(--accent-color)] transition-colors duration-300 hover:scale-110 hover:rotate-90"
            >
              <X size={24} />
            </button>

            {/* Product Header */}
            {state.selectedProduct && (
              <div className="text-center mb-8">
                <img
                  src={state.selectedProduct.image}
                  alt={state.selectedProduct.name}
                  className="w-24 h-24 object-cover rounded-2xl mx-auto mb-4 border-2 border-white/20"
                />
                <h2 className="text-2xl font-bold text-white mb-2">
                  {state.selectedProduct.name}
                </h2>
                <p className="text-[var(--accent-color)] font-semibold">
                  {state.selectedProduct.price} دينار ليبي
                </p>
              </div>
            )}

            {/* Order Steps */}
            <OrderSteps />

            {/* Step Content */}
            <div className="mt-8">
              {renderStep()}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OrderModal;