import React from 'react';
import { Check } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    'تطريز يدوي فاخر',
    'تصاميم حصرية وفريدة',
    'أقمشة عالية الجودة',
    'إبداع يلهم الأناقة'
  ];

  return (
    <section id="about" className="py-32 bg-transparent">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* About Text */}
          <div className="text-right animate-fade-in-up order-2 lg:order-1 px-4 lg:px-0">
            <p className="text-sm uppercase tracking-[3px] text-[var(--accent-color)] mb-4 font-medium animate-pulse">
              قصتنا
            </p>
            <h2 className="heading-secondary text-2xl sm:text-3xl md:text-4xl mb-8 leading-tight hover:scale-105 transition-transform duration-500">
              نحن نصنع الجمال <br className="hidden md:block" />
              في كل غرزة
            </h2>
            <p className="text-[var(--text-light)] mb-10 text-base sm:text-lg leading-relaxed hover:text-white transition-colors duration-300">
              ليبيرو ليست مجرد علامة تجارية للأزياء؛ إنها رحلة في عالم الإبداع والمهارة اليدوية.
              نحن نؤمن بأن كل قطعة يجب أن تحمل روحًا، وأن تكون حكاية فريدة من الأناقة والفخامة.
              يتم اختيار كل خيط بعناية وتطريزه بشغف لتقديم أزياء لا تُنسى.
            </p>
            
            {/* Features List */}
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-4 text-[var(--text-light)] text-base sm:text-lg hover:text-white hover:scale-105 transition-all duration-300 hover:translate-x-2 cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Check 
                    className="text-[var(--accent-color)] flex-shrink-0 hover:scale-125 transition-transform duration-300" 
                    size={24} 
                    strokeWidth={3}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* About Image */}
          <div className="flex justify-center items-center animate-slide-in-right order-1 lg:order-2 hover:scale-105 transition-transform duration-500 px-4 lg:px-0">
            <img
              src="https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg"
              alt="جمل في الصحراء بعيون متوهجة خضراء"
              className="w-full max-w-sm sm:max-w-md h-auto rounded-2xl shadow-2xl border border-white/10 hover:shadow-[0_25px_80px_rgba(0,255,0,0.3)] hover:border-[var(--accent-color)]/50 transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;