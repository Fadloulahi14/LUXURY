import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import HeroBanner from '@/components/HeroBanner/HeroBanner';
import CategoryMenu from '@/components/CategoryMenu/CategoryMenu';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import { motion } from 'framer-motion';
import { Sparkles, Leaf, Heart, Truck } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Leaf,
      title: '100% Naturel',
      description: 'Tous nos produits sont confectionnés à partir d\'ingrédients naturels de première qualité.'
    },
    {
      icon: Sparkles,
      title: 'Artisanat Premium',
      description: 'Chaque produit est fabriqué avec soin selon des techniques traditionnelles sénégalaises.'
    },
    {
      icon: Heart,
      title: 'Qualité Garantie',
      description: 'Nous garantissons la qualité exceptionnelle de tous nos produits.'
    },
    {
      icon: Truck,
      title: 'Livraison Rapide',
      description: 'Livraison partout au Sénégal dans les meilleurs délais.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <HeroBanner />
        
        <CategoryMenu />
        
        <ProductSlider
          title="Produits Populaires"
          subtitle="Découvrez nos best-sellers plébiscités par nos clients"
          filter="featured"
        />

        {/* Features Section */}
        <section className="py-20 bg-noir">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-cream mb-4">
                Pourquoi Choisir <span className="text-gradient-gold">MG LUXURY</span>
              </h2>
              <p className="text-cream/70 max-w-xl mx-auto">
                Nous nous engageons à vous offrir le meilleur de la tradition sénégalaise
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6 rounded-xl bg-cream/5 border border-cream/10 hover:border-primary/30 transition-colors"
                >
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-cream mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-cream/60">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <ProductSlider
          title="Nouveautés"
          subtitle="Les dernières additions à notre collection"
          filter="new"
        />

        {/* CTA Section */}
        <section className="py-20 bg-gradient-gold relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 50% 50%, hsl(0 0% 100% / 0.3) 0%, transparent 50%)'
            }} />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-noir mb-4">
                Commandez via WhatsApp
              </h2>
              <p className="text-noir/70 mb-8">
                Pour une expérience personnalisée, contactez-nous directement sur WhatsApp. 
                Nous répondons rapidement à toutes vos questions.
              </p>
              <a
                href="https://wa.me/221770000000?text=Bonjour%20MG%20LUXURY,%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20produits."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-noir text-cream rounded-full font-semibold hover:bg-noir/90 transition-colors shadow-luxury"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Nous Contacter
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
