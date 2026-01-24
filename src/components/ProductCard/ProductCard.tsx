import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/lib/supabase';
import { useSupabase } from '@/context/SupabaseContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const { categories } = useSupabase();
  const { addToCart } = useCart();

  // Trouver le libellé de la catégorie
  const categoryLabel = categories?.find(cat => cat.name === product.category)?.label || product.category;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-SN', {
      style: 'decimal',
      minimumFractionDigits: 0,
    }).format(price) + ' F';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative bg-card rounded-xl overflow-hidden shadow-luxury hover-lift border border-border"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.is_new && (
            <Badge className="bg-primary text-primary-foreground">Nouveau</Badge>
          )}
          {product.stock < 5 && product.stock > 0 && (
            <Badge variant="secondary" className="bg-beige text-noir">
              Stock limité
            </Badge>
          )}
        </div>

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-noir/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link to={`/product/${product.id}`}>
            <Button size="icon" variant="secondary" className="rounded-full">
              <Eye className="w-4 h-4" />
            </Button>
          </Link>
          <Button
            size="icon"
            className="rounded-full bg-primary hover:bg-primary/90"
            onClick={() => addToCart(product)}
          >
            <ShoppingBag className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {categoryLabel}
        </span>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg font-semibold mt-1 text-foreground hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-4">
          <span className="font-display text-xl font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() => addToCart(product)}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Ajouter
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
