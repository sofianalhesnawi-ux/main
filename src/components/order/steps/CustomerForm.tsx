import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User, Phone, MapPin, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useOrder } from '../../../contexts/OrderContext';
import { Customer } from '../../../types';

const schema = yup.object({
  name: yup.string().required('الاسم مطلوب').min(2, 'الاسم يجب أن يكون أكثر من حرفين'),
  phone: yup.string().required('رقم الهاتف مطلوب').matches(/^[0-9+\-\s]+$/, 'رقم هاتف غير صحيح'),
  address: yup.string().required('العنوان مطلوب').min(10, 'العنوان يجب أن يكون مفصلاً أكثر'),
  notes: yup.string(),
});

const CustomerForm: React.FC = () => {
  const { state, dispatch, nextStep, prevStep } = useOrder();
  
  const { register, handleSubmit, formState: { errors } } = useForm<Customer>({
    resolver: yupResolver(schema),
    defaultValues: state.customer || undefined,
  });

  const onSubmit = (data: Customer) => {
    dispatch({ type: 'SET_CUSTOMER', payload: data });
    nextStep();
  };

  return (
    <div className="text-center">
      <h3 className="text-2xl font-bold text-white mb-2">ادخل بياناتك الشخصية</h3>
      <p className="text-[var(--text-light)] mb-8">لاستكمال الطلب</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <div className="relative">
            <User className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-light)]" size={20} />
            <input
              {...register('name')}
              type="text"
              placeholder="الاسم الكامل"
              className="w-full pr-12 pl-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[var(--text-light)] focus:border-[var(--accent-color)] focus:outline-none transition-all duration-300"
            />
          </div>
          {errors.name && (
            <p className="text-red-400 text-sm mt-2 text-right">{errors.name.message}</p>
          )}
        </motion.div>

        {/* Phone Field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <div className="relative">
            <Phone className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[var(--text-light)]" size={20} />
            <input
              {...register('phone')}
              type="tel"
              placeholder="رقم الهاتف"
              className="w-full pr-12 pl-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[var(--text-light)] focus:border-[var(--accent-color)] focus:outline-none transition-all duration-300"
            />
          </div>
          {errors.phone && (
            <p className="text-red-400 text-sm mt-2 text-right">{errors.phone.message}</p>
          )}
        </motion.div>

        {/* Address Field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <div className="relative">
            <MapPin className="absolute right-4 top-4 text-[var(--text-light)]" size={20} />
            <textarea
              {...register('address')}
              placeholder="العنوان التفصيلي"
              rows={3}
              className="w-full pr-12 pl-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[var(--text-light)] focus:border-[var(--accent-color)] focus:outline-none transition-all duration-300 resize-none"
            />
          </div>
          {errors.address && (
            <p className="text-red-400 text-sm mt-2 text-right">{errors.address.message}</p>
          )}
        </motion.div>

        {/* Notes Field */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <div className="relative">
            <MessageSquare className="absolute right-4 top-4 text-[var(--text-light)]" size={20} />
            <textarea
              {...register('notes')}
              placeholder="ملاحظات إضافية (اختياري)"
              rows={2}
              className="w-full pr-12 pl-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[var(--text-light)] focus:border-[var(--accent-color)] focus:outline-none transition-all duration-300 resize-none"
            />
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-4">
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 text-[var(--text-light)] hover:text-white transition-colors duration-300"
          >
            <ArrowRight size={16} />
            العودة للخطوة السابقة
          </button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="btn-enhanced bg-[var(--accent-color)] text-black px-8 py-3 rounded-xl font-bold hover:shadow-lg"
          >
            التالي
          </motion.button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;