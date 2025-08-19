import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Product } from '../../types';

interface ProductFormData {
  name: string;
  price: number;
  image: string;
  description: string;
  category: 'cap' | 'tshirt' | 'hoodie';
  isActive: boolean;
}

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  product?: Product | null;
}

const schema = yup.object({
  name: yup.string().required('اسم المنتج مطلوب').min(2, 'اسم المنتج يجب أن يكون أكثر من حرفين'),
  price: yup.number().required('السعر مطلوب').min(1, 'السعر يجب أن يكون أكبر من صفر'),
  image: yup.string().required('رابط الصورة مطلوب').url('رابط الصورة غير صحيح'),
  description: yup.string().required('الوصف مطلوب').min(10, 'الوصف يجب أن يكون مفصلاً أكثر'),
  category: yup.string().required('الفئة مطلوبة').oneOf(['cap', 'tshirt', 'hoodie'], 'فئة غير صحيحة'),
  isActive: yup.boolean(),
});

const ProductForm: React.FC<ProductFormProps> = ({ isOpen, onClose, onSave, product }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ProductFormData>({
    resolver: yupResolver(schema),
    defaultValues: product ? {
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description || '',
      category: product.category,
      isActive: product.isActive,
    } : {
      name: '',
      price: 0,
      image: '',
      description: '',
      category: 'tshirt',
      isActive: true,
    },
  });

  React.useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description || '',
        category: product.category,
        isActive: product.isActive,
      });
    } else {
      reset({
        name: '',
        price: 0,
        image: '',
        description: '',
        category: 'tshirt',
        isActive: true,
      });
    }
  }, [product, reset]);

  const onSubmit = (data: ProductFormData) => {
    onSave(data);
  };

  const categories = [
    { value: 'cap', label: 'كاب' },
    { value: 'tshirt', label: 'تيشيرت' },
    { value: 'hoodie', label: 'هودي' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
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
              onClick={onClose}
              className="absolute top-6 left-6 text-white hover:text-[var(--accent-color)] transition-colors duration-300 hover:scale-110 hover:rotate-90"
            >
              <X size={24} />
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">
                {product ? 'تعديل المنتج' : 'إضافة منتج جديد'}
              </h2>
              <p className="text-[var(--text-light)]">
                {product ? 'قم بتعديل بيانات المنتج' : 'أدخل بيانات المنتج الجديد'}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Product Name */}
              <div>
                <label className="block text-white font-medium mb-2 text-right">اسم المنتج</label>
                <input
                  {...register('name')}
                  type="text"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[var(--text-light)] focus:border-[var(--accent-color)] focus:outline-none transition-all duration-300"
                  placeholder="أدخل اسم المنتج"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-2 text-right">{errors.name.message}</p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block text-white font-medium mb-2 text-right">السعر (دينار ليبي)</label>
                <input
                  {...register('price')}
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[var(--text-light)] focus:border-[var(--accent-color)] focus:outline-none transition-all duration-300"
                  placeholder="أدخل السعر"
                />
                {errors.price && (
                  <p className="text-red-400 text-sm mt-2 text-right">{errors.price.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <label className="block text-white font-medium mb-2 text-right">الفئة</label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-[var(--accent-color)] focus:outline-none transition-all duration-300"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value} className="bg-black">
                      {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-400 text-sm mt-2 text-right">{errors.category.message}</p>
                )}
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-white font-medium mb-2 text-right">رابط الصورة</label>
                <input
                  {...register('image')}
                  type="url"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[var(--text-light)] focus:border-[var(--accent-color)] focus:outline-none transition-all duration-300"
                  placeholder="https://example.com/image.jpg"
                />
                {errors.image && (
                  <p className="text-red-400 text-sm mt-2 text-right">{errors.image.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-medium mb-2 text-right">الوصف</label>
                <textarea
                  {...register('description')}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-[var(--text-light)] focus:border-[var(--accent-color)] focus:outline-none transition-all duration-300 resize-none"
                  placeholder="أدخل وصف المنتج"
                />
                {errors.description && (
                  <p className="text-red-400 text-sm mt-2 text-right">{errors.description.message}</p>
                )}
              </div>

              {/* Active Status */}
              <div className="flex items-center gap-3">
                <input
                  {...register('isActive')}
                  type="checkbox"
                  id="isActive"
                  className="w-5 h-5 text-[var(--accent-color)] bg-white/10 border-white/20 rounded focus:ring-[var(--accent-color)] focus:ring-2"
                />
                <label htmlFor="isActive" className="text-white font-medium">
                  المنتج نشط ومتاح للعرض
                </label>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-[var(--text-light)] hover:text-white transition-colors duration-300"
                >
                  إلغاء
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="btn-enhanced bg-[var(--accent-color)] text-black px-8 py-3 rounded-xl font-bold hover:shadow-lg"
                >
                  {product ? 'تحديث المنتج' : 'إضافة المنتج'}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductForm;