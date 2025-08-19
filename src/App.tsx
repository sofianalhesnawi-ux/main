import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProducts from './components/FeaturedProducts';
import About from './components/About';
import Footer from './components/Footer';
import OrderModal from './components/order/OrderModal';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { OrderProvider } from './contexts/OrderContext';
import './styles/globals.css';

interface Admin {
  username: string;
  role: string;
}

const App: React.FC = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [admin, setAdmin] = useState<Admin | null>(null);

  const handleOrderClick = () => {
    setIsOrderModalOpen(true);
  };

  const handleCloseOrderModal = () => {
    setIsOrderModalOpen(false);
  };

  const handleAdminLogin = (adminData: Admin) => {
    setAdmin(adminData);
  };

  const handleAdminLogout = () => {
    setAdmin(null);
  };

  // Main Website Component
  const MainWebsite = () => (
    <OrderProvider>
      <div className="min-h-screen">
        <Header />
        <main>
          <Hero />
          <FeaturedProducts onOrderClick={handleOrderClick} />
          <About />
        </main>
        <Footer />
        <OrderModal isOpen={isOrderModalOpen} onClose={handleCloseOrderModal} />
      </div>
    </OrderProvider>
  );

  // Admin Panel Component
  const AdminPanel = () => (
    <div className="min-h-screen">
      {admin ? (
        <AdminDashboard admin={admin} onLogout={handleAdminLogout} />
      ) : (
        <AdminLogin onLogin={handleAdminLogin} />
      )}
    </div>
  );

  return (
    <Router>
      <div className="App">
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '12px',
            },
          }}
        />
        
        <Routes>
          <Route path="/" element={<MainWebsite />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;