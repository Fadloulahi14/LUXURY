import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { api } from '@/lib/supabase';
import { toast } from 'sonner';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [orderSent, setOrderSent] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-SN').format(price) + ' F';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateWhatsAppMessage = () => {
    const productsList = items
      .map(item => `- ${item.product.name} x${item.quantity} = ${formatPrice(item.product.price * item.quantity)}`)
      .join('%0A');

    const message = `
Bonjour MG LUXURY 👋%0A
%0A📦 *NOUVELLE COMMANDE*%0A
%0A*Client:* ${formData.name}
*Téléphone:* ${formData.phone}
*Adresse:* ${formData.address}
${formData.notes ? `*Notes:* ${formData.notes}` : ''}
%0A*Produits:*%0A${productsList}
%0A*TOTAL: ${formatPrice(totalPrice)}*
%0A
Merci de confirmer ma commande ! 🙏
    `.trim();

    return message;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Créer la commande en base de données avec le statut 'en attente'
      const orderData = {
        customer_name: formData.name,
        customer_email: `${formData.name.toLowerCase().replace(/\s+/g, '.')}@whatsapp.local`, // Email temporaire pour WhatsApp
        customer_phone: formData.phone,
        address: formData.address,
        total_price: totalPrice,
        status: 'en attente' as const,
        date: new Date().toISOString(),
        user_id: null
      };

      const orderItems = items.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }));

      await api.createOrderWithItems(orderData, orderItems);
      toast.success('Commande enregistrée avec succès !');

      // Ouvrir WhatsApp
      const phoneNumber = '221778012731'; // Replace with actual WhatsApp number
      const message = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

      window.open(whatsappUrl, '_blank');
      setOrderSent(true);
      clearCart();

    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error);
      toast.error('Erreur lors de l\'envoi de la commande. Veuillez réessayer.');

      // Ouvrir quand même WhatsApp en cas d'erreur de sauvegarde
      const phoneNumber = '221778012731';
      const message = generateWhatsAppMessage();
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  if (items.length === 0 && !orderSent) {
    navigate('/cart');
    return null;
  }

  if (orderSent) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md mx-auto text-center"
            >
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="font-display text-3xl font-bold mb-4">Commande Envoyée !</h1>
              <p className="text-muted-foreground mb-8">
                Votre commande a été envoyée via WhatsApp. Notre équipe vous contactera rapidement pour confirmer les détails.
              </p>
              <Button
                size="lg"
                className="gap-2 bg-gradient-gold text-noir"
                onClick={() => navigate('/')}
              >
                Retour à l'accueil
              </Button>
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
          <Button
            variant="ghost"
            className="mb-6 gap-2"
            onClick={() => navigate('/cart')}
          >
            <ArrowLeft className="w-4 h-4" />
            Retour au panier
          </Button>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="font-display text-3xl font-bold mb-2">Finaliser la Commande</h1>
              <p className="text-muted-foreground mb-8">
                Remplissez vos informations pour commander via WhatsApp
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Nom complet
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Votre nom et prénom"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Numéro de téléphone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+221 77 000 00 00"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Adresse de livraison
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Votre adresse complète à Dakar"
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optionnel)</Label>
                  <Textarea
                    id="notes"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Instructions spéciales pour la livraison..."
                    rows={2}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold"
                >
                  <Send className="w-5 h-5" />
                  Commander via WhatsApp
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  En cliquant sur ce bouton, vous serez redirigé vers WhatsApp avec votre commande pré-remplie.
                </p>
              </form>
            </motion.div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-card p-6 rounded-xl border border-border shadow-luxury sticky top-24">
                <h2 className="font-display text-xl font-semibold mb-6">Votre Commande</h2>
                
                <div className="space-y-4 mb-6">
                  {items.map(item => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.product.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          Quantité: {item.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-primary">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="text-primary text-sm">À confirmer</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-border">
                    <span className="font-display text-lg font-semibold">Total</span>
                    <span className="font-display text-2xl font-bold text-primary">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
