import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroBanner = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Video */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-30"
        >
          <source src="/image/video.mp4" type="video/mp4" />
          Votre navigateur ne supporte pas la vidéo.
        </video>
        {/* <div className="absolute inset-0 bg-gradient-to-r from-noir/80 via-noir/60 to-noir/80" /> */}
      </div>

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary/5 blur-3xl"
        animate={{
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
          >
            MG  2M LUXURY
            <Sparkles className="w-4 h-4 text-primary" />
          </motion.div> */}

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-cream mb-6 leading-tight"
          >
            {' '}
            <span className="text-gradient-gold">LUXURY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-cream/70 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Découvrez notre collection exclusive de thiouraye traditionnels et d'huiles naturelles premium, 
            confectionnés avec passion au cœur du Sénégal.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/shop">
              <Button size="lg" className="gap-2 px-8 text-base bg-gradient-gold  text-noir font-semibold shadow-gold">
                Découvrir la Boutique
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/shop?category=thiouraye">
              <Button size="lg" variant="outline" className="gap-2 px-8 text-base   hover:bg-cream/10">
                Nos Thiouraye
              </Button>
            </Link>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: '100%', label: 'Naturel' },
              { value: '500+', label: 'Clients' },
              { value: '5★', label: 'Satisfaction' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="font-display text-3xl md:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-cream/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

     
    
    </section>
  );
};

export default HeroBanner;
