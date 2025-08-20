import React from 'react';

const Hero: React.FC = () => {
  const scrollToFeatured = () => {
    const element = document.getElementById('featured');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-8 items-center text-center px-4 md:px-0">
          {/* Hero Text */}
          <div className="max-w-4xl mb-8 animate-fade-in-up w-full">
            <p className="text-sm uppercase tracking-[3px] text-[var(--accent-color)] mb-4 font-medium animate-pulse">
              أزياء فريدة، تفاصيل لا مثيل لها
            </p>
            <h1 className="heading-primary text-3xl sm:text-4xl md:text-6xl mb-6 leading-tight hover:scale-105 transition-transform duration-500">
              لبس يعبّر عنك… <br className="hidden md:block" />
              <span className="text-[var(--accent-color)] animate-glow">أطلق ستايلك</span> مع Libero!
            </h1>
            <p className="text-large text-lg sm:text-xl md:text-2xl leading-relaxed mb-8 text-[var(--text-light)] animate-slide-in-left">
              اكتشف عالم ليبيرو، حيث يلتقي التراث بالحداثة في كل قطعة. 
              <br className="hidden md:block" />
              تصاميم حصرية وتطريزات فاخرة صنعت لتتألق.
            </p>
            <button
              onClick={scrollToFeatured}
              className="btn-enhanced inline-flex items-center gap-3 bg-white text-[var(--text-dark)] px-6 sm:px-8 py-3 sm:py-4 font-medium uppercase tracking-wider text-xs sm:text-sm rounded-xl border-2 border-white relative overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="relative z-10">
              اكتشف المجموعة
              </span>
            </button>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center items-center animate-float hover:scale-105 transition-transform duration-500">
            <img
              src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg"
              alt="مجموعة أزياء ليبيرو المميزة"
              className="max-w-[90%] sm:max-w-[80%] md:max-w-lg h-auto rounded-2xl shadow-2xl border border-white/10 hover:shadow-[0_25px_80px_rgba(0,255,0,0.2)] transition-all duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;