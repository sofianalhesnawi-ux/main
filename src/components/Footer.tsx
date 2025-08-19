import React from 'react';
import { Facebook, Instagram, MessageCircle, Camera } from 'lucide-react';

const Footer: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:text-blue-500' },
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Camera, href: '#', label: 'TikTok', color: 'hover:text-red-500' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp', color: 'hover:text-green-400' },
    { icon: Camera, href: '#', label: 'Snapchat', color: 'hover:text-yellow-400' }
  ];

  return (
    <footer id="contact" className="relative bg-gradient-to-br from-black/90 to-green-900/20 text-white py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-green-500/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* About Section */}
        <div className="text-center mb-12 max-w-sm mx-auto animate-fade-in-up">
          <div className="glass-card rounded-3xl p-6 transition-all duration-700 hover:-translate-y-5 hover:shadow-2xl hover:shadow-green-500/30 hover:scale-110 cursor-pointer group hover:rotate-1">
            <h3 className="text-2xl font-bold mb-4 text-[var(--accent-color)] uppercase tracking-wide group-hover:animate-glow">
              ليبيرو
            </h3>
            <p className="text-[var(--text-light)] text-base leading-relaxed group-hover:text-white transition-colors duration-500 group-hover:scale-105">
              نحن نصنع الفخامة في كل تفصيلة. انضم إلينا في رحلة الأناقة الفريدة من نوعها.
            </p>
          </div>
        </div>

        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 justify-items-center">
          {/* Quick Links */}
          <div className="glass-card rounded-3xl p-6 transition-all duration-700 hover:-translate-y-5 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/30 hover:border-green-500/50 cursor-pointer group w-fit min-w-[280px] hover:rotate-1 animate-slide-in-left">
            <h3 className="text-lg font-semibold mb-6 text-[var(--accent-color)] uppercase tracking-wide relative group-hover:text-green-300 transition-colors duration-500 group-hover:animate-pulse">
              روابط سريعة
              <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-gradient-to-l from-[var(--accent-color)] to-transparent rounded-full group-hover:w-16 transition-all duration-500 group-hover:shadow-[0_0_10px_var(--accent-color)]"></span>
            </h3>
            <ul className="space-y-3 mb-6">
              {[
                { label: 'الرئيسية', section: 'hero' },
                { label: 'المتجر', section: 'featured' },
                { label: 'من نحن', section: 'about' },
                { label: 'اتصل بنا', section: 'contact' }
              ].map((link, index) => (
                <li key={index} className="transform hover:translate-x-2 transition-transform duration-300">
                  <button
                    onClick={() => scrollToSection(link.section)}
                    className="text-[var(--text-light)] hover:text-[var(--accent-color)] transition-all duration-500 relative group text-right block w-full py-1 hover:bg-green-500/20 rounded-lg px-2 hover:scale-105 hover:shadow-lg"
                  >
                    {link.label}
                    <span className="absolute left-1 top-1/2 -translate-y-1/2 w-0 h-px bg-[var(--accent-color)] transition-all duration-500 group-hover:w-4 group-hover:shadow-[0_0_5px_var(--accent-color)]"></span>
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Social Icons */}
            <div className="flex justify-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className={`text-white ${social.color} transition-all duration-500 hover:-translate-y-3 hover:scale-150 hover:drop-shadow-lg hover:rotate-12`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  aria-label={social.label}
                >
                  <social.icon size={24} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="glass-card rounded-3xl p-6 transition-all duration-700 hover:-translate-y-5 hover:scale-110 hover:shadow-2xl hover:shadow-silver-300/30 border-gray-300/30 cursor-pointer group w-fit min-w-[300px] hover:rotate-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card rounded-2xl p-4 text-center mb-4 border-gray-300/40 group-hover:border-silver-400/80 transition-all duration-500">
              <h3 className="text-lg font-semibold text-[var(--silver-color)] group-hover:text-white transition-colors duration-500 drop-shadow-lg group-hover:animate-pulse">
                تواصل معنا
              </h3>
            </div>
            <div className="glass-card rounded-2xl p-4 border-white/10 group-hover:border-white/30 transition-all duration-500 group-hover:backdrop-blur-xl">
              <div className="space-y-3 text-base leading-relaxed">
                <p className="text-[var(--text-light)] group-hover:text-white transition-colors duration-500 hover:scale-105">
                  <span className="text-white font-medium">البريد الإلكتروني:</span><br />
                  Libero.53@gmail.com
                </p>
                <p className="text-[var(--text-light)] group-hover:text-white transition-colors duration-500 hover:scale-105">
                  <span className="text-white font-medium">الهاتف:</span><br />
                  +218 94 228 50 14
                </p>
                <p className="text-[var(--text-light)] group-hover:text-white transition-colors duration-500 hover:scale-105">
                  <span className="text-white font-medium">العنوان:</span><br />
                  طرابلس ليبيا
                </p>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="glass-card rounded-3xl p-6 transition-all duration-700 hover:-translate-y-5 hover:scale-110 hover:shadow-2xl hover:shadow-green-500/30 cursor-pointer group w-fit min-w-[320px] hover:rotate-1 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-semibold mb-4 text-[var(--accent-color)] uppercase tracking-wide relative group-hover:text-green-300 transition-colors duration-500 group-hover:animate-glow">
              منورنا في الموقع يا حاج
              <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-gradient-to-l from-[var(--accent-color)] to-transparent rounded-full group-hover:w-16 transition-all duration-500 group-hover:shadow-[0_0_10px_var(--accent-color)]"></span>
            </h3>
            <p className="text-[var(--text-light)] text-base leading-relaxed group-hover:text-white transition-colors duration-500 group-hover:scale-105">
              شكراً لك على زيارة موقعنا. نحن متحمسون لتكون جزءًا من عائلة ليبيرو. 
              استمر في الاكتشاف، واستمتع بتجربة تسوق فريدة ومميزة.
              نتمنى لك يومًا رائعًا!
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-white/10 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <p className="text-[var(--text-light)] text-sm hover:text-white transition-colors duration-300">
            &copy; 2024 ليبيرو. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;