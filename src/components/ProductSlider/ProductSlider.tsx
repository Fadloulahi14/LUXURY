import { motion } from 'framer-motion';
import { products } from '@/api/products';
import ProductCard from '@/components/ProductCard/ProductCard';

interface ProductSliderProps {
  title: string;
  subtitle?: string;
  filter?: 'featured' | 'new' | 'all';
  category?: string;
}

const ProductSlider = ({ title, subtitle, filter = 'all', category }: ProductSliderProps) => {
  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter(p => p.category === category);
  }

  if (filter === 'featured') {
    filteredProducts = filteredProducts.filter(p => p.featured);
  } else if (filter === 'new') {
    filteredProducts = filteredProducts.filter(p => p.isNew);
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-muted-foreground max-w-xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 4).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
