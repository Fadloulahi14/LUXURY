import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-SN').format(price) + ' F';
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-md mx-auto"
            >
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-muted flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-muted-foreground" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-4">Votre panier est vide</h1>
              <p className="text-muted-foreground mb-8">
                Découvrez notre collection de produits premium et ajoutez vos favoris au panier.
              </p>
              <Link to="/shop">
                <Button size="lg" className="gap-2 bg-gradient-gold text-noir">
                  Découvrir la Boutique
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              variant="ghost"
              className="mb-6 gap-2"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4" />
              Continuer mes achats
            </Button>

            <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">
              Mon Panier <span className="text-muted-foreground text-2xl">({totalItems})</span>
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4 p-4 bg-card rounded-xl border border-border shadow-luxury"
                >
                  {/* Image */}
                  <Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1">
                      <span className="text-xs text-primary uppercase tracking-wider">
                        {item.product.category === 'thiouraye' ? 'Thiouraye' : 'Huile'}
                      </span>
                      <Link to={`/product/${item.product.id}`}>
                        <h3 className="font-display text-lg font-semibold hover:text-primary transition-colors">
                          {item.product.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatPrice(item.product.price)} / unité
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      {/* Subtotal & Remove */}
                      <div className="flex items-center gap-4">
                        <span className="font-display font-bold text-primary">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.product.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Clear Cart */}
              <div className="text-right pt-4">
                <Button variant="ghost" className="text-muted-foreground gap-2" onClick={clearCart}>
                  <Trash2 className="w-4 h-4" />
                  Vider le panier
                </Button>
              </div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-24 bg-card p-6 rounded-xl border border-border shadow-luxury">
                <h2 className="font-display text-xl font-semibold mb-6">Récapitulatif</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Sous-total ({totalItems} article{totalItems > 1 ? 's' : ''})</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Livraison</span>
                    <span className="text-primary">À définir</span>
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="font-display text-lg font-semibold">Total</span>
                    <span className="font-display text-2xl font-bold text-primary">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>

                <Link to="/checkout" className="block">
                  <Button className="w-full gap-2 bg-gradient-gold text-noir font-semibold shadow-gold hover:opacity-90" size="lg">
                    Commander
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  Paiement sécurisé via WhatsApp
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
