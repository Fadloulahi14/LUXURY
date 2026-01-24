import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useSupabase } from '@/context/SupabaseContext';

const CategoryMenu = () => {
  const { categories } = useSupabase();

  if (!categories) return null;

  return (
    <section className="py-20 bg-beige-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nos Catégories
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explorez notre sélection exclusive de produits naturels et traditionnels
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Link
                to={`/shop?category=${category.name}`}
                className="group relative block aspect-[16/10] rounded-2xl overflow-hidden shadow-luxury"
              >
                {/* Background Image */}
                <div className="absolute inset-0 bg-noir">
                  <img
                    src={category.image}
                    alt={category.label}
                    className="w-full h-full object-cover opacity-157 group-hover:opacity-40 transition-opacity duration-500"
                  />
                </div>

                {/* Gold Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-noir via-noir/50 to-transparent" />

                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-cream mb-2 group-hover:text-primary transition-colors">
                    {category.label}
                  </h3>
                  <p className="text-cream/70 text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                    <span>Découvrir</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryMenu;

