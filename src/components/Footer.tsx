import React from 'react';
import { Facebook, Instagram, MessageCircle } from 'lucide-react';

// Custom TikTok Icon Component
const TikTokIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
  </svg>
);

// Custom Snapchat Icon Component
const SnapchatIcon: React.FC<{ size?: number; className?: string }> = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.166 3c-2.4 0-4.35 1.95-4.35 4.35 0 1.47.73 2.77 1.85 3.56-.08.14-.17.28-.26.42-.5.8-1.07 1.71-2.05 1.71-.24 0-.47-.05-.69-.14-.44-.18-.94-.38-1.5-.38-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.56 0 1.06-.2 1.5-.38.22-.09.45-.14.69-.14.98 0 1.55.91 2.05 1.71.09.14.18.28.26.42-1.12.79-1.85 2.09-1.85 3.56 0 2.4 1.95 4.35 4.35 4.35s4.35-1.95 4.35-4.35c0-1.47-.73-2.77-1.85-3.56.08-.14.17-.28.26-.42.5-.8 1.07-1.71 2.05-1.71.24 0 .47.05.69.14.44.18.94.38 1.5.38.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5c-.56 0-1.06.2-1.5.38-.22.09-.45.14-.69.14-.98 0-1.55-.91-2.05-1.71-.09-.14-.18-.28-.26-.42 1.12-.79 1.85-2.09 1.85-3.56 0-2.4-1.95-4.35-4.35-4.35z"/>
  </svg>
);

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
    { icon: TikTokIcon, href: '#', label: 'TikTok', color: 'hover:text-red-500' },
    { icon: MessageCircle, href: '#', label: 'WhatsApp', color: 'hover:text-green-400' },
    { icon: SnapchatIcon, href: '#', label: 'Snapchat', color: 'hover:text-yellow-400' }
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 justify-items-center px-4 md:px-0">
          {/* Quick Links */}
          <div className="glass-card rounded-3xl p-6 transition-all duration-700 hover:-translate-y-5 hover:scale-105 md:hover:scale-110 hover:shadow-2xl hover:shadow-green-500/30 hover:border-green-500/50 cursor-pointer group w-full md:w-fit md:min-w-[280px] max-w-sm hover:rotate-1 animate-slide-in-left">
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
            <div className="flex justify-center gap-4 flex-wrap">
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
          <div className="glass-card rounded-3xl p-6 transition-all duration-700 hover:-translate-y-5 hover:scale-105 md:hover:scale-110 hover:shadow-2xl hover:shadow-silver-300/30 border-gray-300/30 cursor-pointer group w-full md:w-fit md:min-w-[300px] max-w-sm hover:rotate-1 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
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
                  <span dir="ltr" className="inline-block font-mono">+218 94 228 50 14</span>
                </p>
                <p className="text-[var(--text-light)] group-hover:text-white transition-colors duration-500 hover:scale-105">
                  <span className="text-white font-medium">العنوان:</span><br />
                  طرابلس ليبيا
                </p>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="glass-card rounded-3xl p-6 transition-all duration-700 hover:-translate-y-5 hover:scale-105 md:hover:scale-110 hover:shadow-2xl hover:shadow-green-500/30 cursor-pointer group w-full md:w-fit md:min-w-[320px] max-w-sm hover:rotate-1 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
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