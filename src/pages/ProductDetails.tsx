import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Minus, Plus, ShoppingBag, Package, Droplets, Star } from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ProductSlider from '@/components/ProductSlider/ProductSlider';
import { useSupabase } from '@/context/SupabaseContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, categories, loading, error } = useSupabase();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products?.find(p => p.id === Number(id));
  const categoryLabel = categories?.find(cat => cat.name === product?.category)?.label || product?.category;

  // Gestion du chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Chargement du produit...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Gestion des erreurs
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 min-h-screen flex items-center justify-center">
          <div className="text-center text-red-600">
            <p>Erreur lors du chargement: {error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4">
              Réessayer
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-32 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Produit non trouvé</h1>
          <Button onClick={() => navigate('/shop')}>Retour à la boutique</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-SN').format(price) + ' F CFA';
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            className="mb-8 gap-2"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </Button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Image Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted shadow-luxury">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.is_new && (
                  <Badge className="bg-primary text-primary-foreground px-4">Nouveau</Badge>
                )}
                {product.stock < 5 && product.stock > 0 && (
                  <Badge variant="secondary" className="bg-beige text-noir px-4">
                    Stock limité
                  </Badge>
                )}
              </div>
            </motion.div>

            {/* Details Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col"
            >
              <span className="text-sm text-primary uppercase tracking-wider font-medium mb-2">
                {categoryLabel}
              </span>

              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(Excellent)</span>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Composition */}
              {product.composition && (
                <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border">
                  <div className="flex items-center gap-2 mb-2">
                    <Droplets className="w-5 h-5 text-primary" />
                    <h3 className="font-display font-semibold">Composition</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {product.composition}
                  </p>
                </div>
              )}

              {/* Stock Info */}
              <div className="flex items-center gap-2 mb-6">
                <Package className="w-5 h-5 text-primary" />
                <span className="text-sm">
                  {product.stock > 5 
                    ? <span className="text-green-600">En stock ({product.stock} disponibles)</span>
                    : product.stock > 0 
                      ? <span className="text-orange-500">Stock limité ({product.stock} restants)</span>
                      : <span className="text-destructive">Rupture de stock</span>
                  }
                </span>
              </div>

              {/* Price */}
              <div className="mb-8">
                <span className="font-display text-4xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-8">
                <span className="text-sm font-medium">Quantité :</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 gap-2 bg-gradient-gold text-noir font-semibold shadow-gold hover:opacity-90"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Ajouter au panier
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 gap-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  onClick={() => navigate('/cart')}
                >
                  Voir le panier
                </Button>
              </div>

              {/* Total */}
              {quantity > 1 && (
                <p className="mt-4 text-center text-muted-foreground">
                  Total : <span className="font-semibold text-foreground">{formatPrice(product.price * quantity)}</span>
                </p>
              )}
            </motion.div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <ProductSlider
            title="Produits Similaires"
            subtitle="Vous pourriez aussi aimer"
            category={product.category}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
