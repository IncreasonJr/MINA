import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Checkout } from './pages/Checkout';
import { Confirmation } from './pages/Confirmation';

// Scroll to top component on route changes
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-savory-cream text-savory-charcoal antialiased selection:bg-savory-orange selection:text-white">
          {/* Header */}
          <Header />

          {/* Main Route Views */}
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>

          {/* Cart Drawer & Global Notification Toast */}
          <CartDrawer />
          <Toast />

          {/* Footer */}
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
};

export default App;
