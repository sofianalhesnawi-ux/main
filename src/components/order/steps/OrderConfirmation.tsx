import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, ShoppingBag } from 'lucide-react';
import { useOrder } from '../../../contexts/OrderContext';
import { supabase, isSupabaseConfigured } from '../../../lib/supabase';
import toast from 'react-hot-toast';

interface OrderConfirmationProps {
  onClose: () => void;
}

const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ onClose }) => {
  const { state, prevStep, getTotalPrice, resetOrder } = useOrder();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const generateOrderNumber = () => {
    return `LIB-${Date.now().toString().slice(-6)}`;
  };

  const handleConfirmOrder = async () => {
    if (!state.selectedProduct || !state.selectedColor || !state.selectedSize || 
        !state.selectedDesign || !state.customer) {
      toast.error('بيانات الطلب غير مكتملة');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderNumber = generateOrderNumber();

      if (!isSupabaseConfigured) {
        // Demo fallback: simulate API latency and success when Supabase is not configured
        await new Promise((resolve) => setTimeout(resolve, 800));
        console.info('[OrderConfirmation] Supabase not configured. Simulating order submission:', orderNumber);
        setIsOrderComplete(true);
        toast.success('تم إرسال طلبك بنجاح! (وضع تجريبي)');
        return;
      }

      // Insert order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          order_number: orderNumber,
          customer_name: state.customer.name,
          customer_phone: state.customer.phone,
          customer_address: state.customer.address,
          customer_notes: state.customer.notes || null,
          total_amount: getTotalPrice(),
          status: 'pending',
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Insert order item
      const { error: itemError } = await supabase
        .from('order_items')
        .insert({
          order_id: orderData.id,
          product_id: state.selectedProduct.id,
          product_name: state.selectedProduct.name,
          product_price: state.selectedProduct.price,
          color_name: state.selectedColor.name,
          color_hex: state.selectedColor.hex,
          size_name: state.selectedSize.name,
          design_name: state.selectedDesign.name,
          design_type: state.selectedDesign.type,
          design_price: state.selectedDesign.price,
          quantity: state.quantity,
        });

      if (itemError) throw itemError;

      setIsOrderComplete(true);
      toast.success('تم إرسال طلبك بنجاح!');
    } catch (error) {
      console.error('Error submitting order:', error);
      toast.error('حدث خطأ في إرسال الطلب. يرجى المحاولة مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    resetOrder();
    onClose();
  };

  if (isOrderComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 bg-[var(--accent-color)] rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <Check size={40} className="text-black" />
        </motion.div>

        <h3 className="text-3xl font-bold text-white mb-4">
          شكراً على اختيارك لنا
        </h3>
        <p className="text-xl text-[var(--accent-color)] mb-8">
          كعلامة على تميزك
        </p>
        <p className="text-[var(--text-light)] mb-8 leading-relaxed">
          تم استلام طلبك بنجاح وسيتم التواصل معك قريباً لتأكيد التفاصيل والتسليم.
          نشكرك على ثقتك في ليبيرو.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClose}
          className="btn-enhanced bg-white text-black px-8 py-3 rounded-xl font-bold hover:shadow-lg"
        >
          You're Welcome
        </motion.button>
      </motion.div>
    );
  }

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-white mb-2">تأكيد الطلب</h3>
      <p className="text-[var(--text-light)] mb-8">راجع تفاصيل طلبك قبل التأكيد</p>

      {/* Order Summary */}
      <div className="glass-card rounded-2xl p-6 mb-8 text-right">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white font-semibold">{state.selectedProduct?.name}</span>
            <span className="text-[var(--text-light)]">المنتج</span>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full border border-white/20"
                style={{ backgroundColor: state.selectedColor?.hex }}
              />
              <span className="text-white">{state.selectedColor?.name}</span>
            </div>
            <span className="text-[var(--text-light)]">اللون</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-white">{state.selectedSize?.name} - {state.selectedSize?.label}</span>
            <span className="text-[var(--text-light)]">الحجم</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-white">{state.selectedDesign?.name}</span>
            <span className="text-[var(--text-light)]">التصميم</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-white">{state.quantity}</span>
            <span className="text-[var(--text-light)]">الكمية</span>
          </div>
          
          <hr className="border-white/20" />
          
          <div className="flex justify-between items-center text-lg font-bold">
            <span className="text-[var(--accent-color)]">{Number(getTotalPrice()).toFixed(2)} دينار ليبي</span>
            <span className="text-white">المجموع</span>
          </div>
        </div>
      </div>

      {/* Customer Info */}
      <div className="glass-card rounded-2xl p-6 mb-8 text-right">
        <h4 className="text-lg font-bold text-white mb-4">بيانات العميل</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-white">{state.customer?.name}</span>
            <span className="text-[var(--text-light)]">الاسم</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-white">{state.customer?.phone}</span>
            <span className="text-[var(--text-light)]">الهاتف</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-white text-sm leading-relaxed">{state.customer?.address}</span>
            <span className="text-[var(--text-light)]">العنوان</span>
          </div>
          {state.customer?.notes && (
            <div className="flex justify-between items-start">
              <span className="text-white text-sm leading-relaxed">{state.customer.notes}</span>
              <span className="text-[var(--text-light)]">ملاحظات</span>
            </div>
          )}
        </div>
        
        {/* Custom Design Image */}
        {state.customDesignImage && (
          <div className="mt-4 text-center">
            <h5 className="text-md font-medium text-white mb-2">التصميم المخصص</h5>
            <img
              src={state.customDesignImage}
              alt="التصميم المخصص"
              className="w-24 h-24 object-cover rounded-lg mx-auto border border-white/20"
            />
          </div>
        )}
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
          onClick={handleConfirmOrder}
          disabled={isSubmitting}
          className="btn-enhanced bg-[var(--accent-color)] text-black px-8 py-3 rounded-xl font-bold hover:shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              جاري الإرسال...
            </>
          ) : (
            <>
              <ShoppingBag size={16} />
              تأكيد الطلب
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default OrderConfirmation;