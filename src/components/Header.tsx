import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-6xl transition-all duration-300 ${
        isScrolled ? 'glass-nav shadow-2xl scale-[0.98]' : 'glass-nav scale-100'
      } rounded-2xl hover:scale-[1.01] hover:shadow-[0_20px_60px_rgba(0,255,0,0.15)]`}
    >
      <div className="container mx-auto px-4">
        <nav className="relative">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden absolute top-4 left-4 z-50 text-white hover:text-[var(--accent-color)] transition-all duration-300 hover:scale-110 hover:rotate-90 p-2 rounded-lg bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Navigation Links */}
          <ul className={`${
            isMenuOpen 
              ? 'flex flex-col items-center py-6 gap-4 bg-black/80 backdrop-blur-xl rounded-2xl mt-2 animate-fade-in-up mx-4' 
              : 'hidden'
            } md:flex md:justify-between md:items-center md:py-3 md:px-8 md:bg-transparent md:backdrop-blur-none md:mx-0`}>
            <li>
              <button
                onClick={() => scrollToSection('hero')}
                className="text-white hover:text-[var(--accent-color)] transition-all duration-300 font-medium text-sm md:text-xs uppercase tracking-wider px-4 py-3 md:py-2 rounded-lg relative group hover:scale-110 hover:-translate-y-1 w-full md:w-auto text-center"
              >
                الرئيسية
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[var(--accent-color)] transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_10px_var(--accent-color)]"></span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('featured')}
                className="text-white hover:text-[var(--accent-color)] transition-all duration-300 font-medium text-sm md:text-xs uppercase tracking-wider px-4 py-3 md:py-2 rounded-lg relative group hover:scale-110 hover:-translate-y-1 w-full md:w-auto text-center"
              >
                منتجاتنا
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[var(--accent-color)] transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_10px_var(--accent-color)]"></span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('hero')}
                className="font-['Playfair_Display'] text-3xl md:text-2xl font-bold text-white tracking-[2px] text-center hover:text-[var(--accent-color)] transition-all duration-300 hover:scale-110 hover:drop-shadow-[0_0_10px_rgba(0,255,0,0.8)] py-2"
              >
                Libero
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-[var(--accent-color)] transition-all duration-300 font-medium text-sm md:text-xs uppercase tracking-wider px-4 py-3 md:py-2 rounded-lg relative group hover:scale-110 hover:-translate-y-1 w-full md:w-auto text-center"
              >
                من نحن
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[var(--accent-color)] transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_10px_var(--accent-color)]"></span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-[var(--accent-color)] transition-all duration-300 font-medium text-sm md:text-xs uppercase tracking-wider px-4 py-3 md:py-2 rounded-lg relative group hover:scale-110 hover:-translate-y-1 w-full md:w-auto text-center"
              >
                اتصل بنا
                <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-[var(--accent-color)] transition-all duration-500 group-hover:w-full group-hover:shadow-[0_0_10px_var(--accent-color)]"></span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;