import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogOut, Package, Settings, BarChart3 } from 'lucide-react';
import ProductManagement from './ProductManagement';

interface AdminDashboardProps {
  admin: { username: string; role: string };
  onLogout: () => void;
}

type TabType = 'products' | 'settings' | 'analytics';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ admin, onLogout }) => {
  const [activeTab, setActiveTab] = useState<TabType>('products');

  const tabs = [
    { id: 'products' as TabType, label: 'إدارة المنتجات', icon: Package },
    { id: 'settings' as TabType, label: 'الإعدادات', icon: Settings },
    { id: 'analytics' as TabType, label: 'التحليلات', icon: BarChart3 },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductManagement />;
      case 'settings':
        return (
          <div className="glass-card rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">الإعدادات</h3>
            <p className="text-[var(--text-light)]">قريباً...</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="glass-card rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">التحليلات</h3>
            <p className="text-[var(--text-light)]">قريباً...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mb-8 flex justify-between items-center"
        >
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">لوحة التحكم</h1>
            <p className="text-[var(--text-light)]">مرحباً، {admin.username}</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 text-[var(--text-light)] hover:text-white transition-colors duration-300 hover:scale-105"
          >
            <LogOut size={20} />
            تسجيل الخروج
          </button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-2 mb-8"
        >
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[var(--accent-color)] text-black'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;