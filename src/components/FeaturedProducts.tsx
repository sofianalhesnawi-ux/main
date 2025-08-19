import React from 'react';
import { motion } from 'framer-motion';
import { useOrder } from '../contexts/OrderContext';
import { products } from '../data/mockData';

interface FeaturedProductsProps {
  onOrderClick: () => void;
}

const ProductCard: React.FC<{ product: typeof products[0]; onOrderClick: (product: typeof products[0]) => void }> = ({ product, onOrderClick }) => {
  const handleOrderClick = () => {
    onOrderClick(product);
  };

  return (
    <div className="group relative bg-gray-900/50 backdrop-blur-lg rounded-2xl overflow-hidden transition-all duration-700 hover:-translate-y-6 hover:scale-105 hover:shadow-2xl hover:shadow-[var(--accent-color)]/30 border border-white/10 cursor-pointer hover:border-[var(--accent-color)]/50 hover:rotate-1">
      {/* Product Image */}
      <div className="relative w-full h-80 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125 group-hover:rotate-2"
        />
        
        {/* Overlay */}
        <div className="absolute bottom-5 left-5 right-5 glass-card rounded-2xl p-6 transform translate-y-5 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-hover:backdrop-blur-xl group-hover:bg-black/30">
          <div className="text-center">
            <h3 className="text-xl font-medium text-white mb-2 text-shadow group-hover:text-[var(--accent-color)] transition-colors duration-300">
              {product.name}
            </h3>
            <p className="text-lg text-white font-semibold text-shadow group-hover:scale-110 transition-transform duration-300">
              {product.price} دينار ليبي
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOrderClick}
              className="btn-enhanced bg-[var(--accent-color)] text-black px-6 py-2 rounded-xl font-bold text-sm hover:shadow-lg transition-all duration-300"
            >
              اطلب الآن
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onOrderClick }) => {
  const { dispatch } = useOrder();

  const handleProductOrder = (product: typeof products[0]) => {
    dispatch({ type: 'SET_PRODUCT', payload: product });
    onOrderClick();
  };

  return (
    <section id="featured" className="py-32 bg-transparent">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20 animate-fade-in-up">
          <p className="text-sm uppercase tracking-[3px] text-[var(--accent-color)] mb-4 font-medium animate-pulse">
            أحدث مجموعاتنا
          </p>
          <h2 className="heading-secondary text-3xl md:text-5xl hover:scale-105 transition-transform duration-500">
            منتجات مختارة بعناية
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {products.map((product, index) => (
            <div 
              key={product.id}
              className="animate-slide-in-right"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <ProductCard product={product} onOrderClick={handleProductOrder} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;