import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      details: '+221 77 000 00 00',
      description: 'Lundi au Samedi, 9h-18h'
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'contact@mgluxury.sn',
      description: 'Réponse sous 24h'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      details: 'Dakar, Sénégal',
      description: 'Centre-ville'
    },
    {
      icon: Clock,
      title: 'Horaires',
      details: 'Lundi - Samedi',
      description: '9h00 - 18h00'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici vous pouvez ajouter la logique d'envoi du formulaire
    toast.success('Message envoyé avec succès ! Nous vous répondrons bientôt.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
              >
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Contactez-nous</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6"
              >
                Parlons de vos{' '}
                <span className="text-gradient-gold">Besoins</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              >
                Notre équipe est à votre écoute pour répondre à toutes vos questions
                et vous accompagner dans votre découverte de nos produits d'exception.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                  Nos Coordonnées
                </h2>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4 p-4 rounded-lg border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          {info.title}
                        </h3>
                        <p className="text-primary font-medium mb-1">
                          {info.details}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {info.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* WhatsApp CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mt-8 p-6 bg-gradient-gold rounded-xl text-center"
                >
                  <h3 className="font-display text-xl font-bold text-noir mb-2">
                    Contact Rapide
                  </h3>
                  <p className="text-noir/80 mb-4">
                    Pour une réponse immédiate, contactez-nous sur WhatsApp
                  </p>
                  <a
                    href="https://wa.me/221770000000?text=Bonjour%20MG%20LUXURY,%20je%20souhaite%20en%20savoir%20plus%20sur%20vos%20produits."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-noir text-cream rounded-full font-semibold hover:bg-noir/90 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-display text-3xl font-bold text-foreground mb-8">
                  Envoyez-nous un Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom complet *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Votre nom"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="votre@email.com"
                        className="h-12"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="Objet de votre message"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Votre message..."
                      rows={6}
                      className="resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2 bg-gradient-gold hover:opacity-90 text-noir font-semibold h-12"
                  >
                    <Send className="w-4 h-4" />
                    Envoyer le Message
                  </Button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Où nous Trouver
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Situés au cœur de Dakar, nous vous accueillons dans notre boutique
                pour vous faire découvrir nos produits d'exception.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Carte interactive - Dakar, Sénégal
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Adresse exacte communiquée sur demande
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;