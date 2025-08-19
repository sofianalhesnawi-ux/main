import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { products as initialProducts } from '../../data/mockData';
import { Product } from '../../types';
import ProductForm from './ProductForm';
import toast from 'react-hot-toast';

const ProductManagement: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    if (window.confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
      setProducts(products.filter(p => p.id !== productId));
      toast.success('تم حذف المنتج بنجاح');
    }
  };

  const handleToggleActive = (productId: string) => {
    setProducts(products.map(p => 
      p.id === productId ? { ...p, isActive: !p.isActive } : p
    ));
    toast.success('تم تحديث حالة المنتج');
  };

  const handleSaveProduct = (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...p, ...productData, updatedAt: new Date().toISOString() }
          : p
      ));
      toast.success('تم تحديث المنتج بنجاح');
    } else {
      // Add new product
      const newProduct: Product = {
        ...productData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setProducts([...products, newProduct]);
      toast.success('تم إضافة المنتج بنجاح');
    }
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">إدارة المنتجات</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAddProduct}
          className="btn-enhanced bg-[var(--accent-color)] text-black px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:shadow-lg"
        >
          <Plus size={20} />
          إضافة منتج جديد
        </motion.button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
              className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                !product.isActive ? 'opacity-60' : ''
              }`}
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => handleToggleActive(product.id)}
                    className={`p-2 rounded-full transition-all duration-300 ${
                      product.isActive
                        ? 'bg-[var(--accent-color)] text-black'
                        : 'bg-red-500 text-white'
                    }`}
                  >
                    {product.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                <p className="text-[var(--accent-color)] font-semibold mb-3">
                  {product.price} دينار ليبي
                </p>
                <p className="text-[var(--text-light)] text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEditProduct(product)}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors duration-300"
                  >
                    <Edit size={16} />
                    تعديل
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-red-600 transition-colors duration-300"
                  >
                    <Trash2 size={16} />
                    حذف
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Product Form Modal */}
      <ProductForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
};

export default ProductManagement;