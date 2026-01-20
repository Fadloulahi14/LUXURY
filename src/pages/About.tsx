import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { motion } from 'framer-motion';
import { Heart, Award, Users, Leaf, Target, Sparkles, Star, Globe } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion & Authenticité',
      description: 'Chaque produit est créé avec passion, respectant les traditions ancestrales sénégalaises.'
    },
    {
      icon: Award,
      title: 'Excellence & Qualité',
      description: 'Nous nous engageons à offrir uniquement des produits d\'exception, rigoureusement sélectionnés.'
    },
    {
      icon: Leaf,
      title: 'Naturel & Durable',
      description: 'Nos ingrédients sont 100% naturels, issus d\'une agriculture responsable et durable.'
    },
    {
      icon: Users,
      title: 'Communauté & Partage',
      description: 'Nous créons des liens avec notre communauté et partageons notre savoir-faire ancestral.'
    }
  ];

  const stats = [
    { value: '5+', label: 'Années d\'expérience' },
    { value: '500+', label: 'Clients satisfaits' },
    { value: '100%', label: 'Naturel' },
    { value: '24/7', label: 'Support client' }
  ];

  const team = [
    {
      name: 'Fatou Diop',
      role: 'Fondatrice & Maître Artisan',
      description: 'Plus de 15 ans d\'expérience dans l\'art ancestral du thiouraye.',
      image: '/placeholder.svg'
    },
    {
      name: 'Mamadou Sow',
      role: 'Maître des Huiles',
      description: 'Expert en extraction d\'huiles naturelles et en formulation traditionnelle.',
      image: '/placeholder.svg'
    },
    {
      name: 'Aminata Ba',
      role: 'Responsable Qualité',
      description: 'Garantit l\'excellence et l\'authenticité de tous nos produits.',
      image: '/placeholder.svg'
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/5 via-background to-primary/10 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, hsl(43 58% 52% / 0.1) 0%, transparent 50%),
                               radial-gradient(circle at 75% 75%, hsl(43 58% 52% / 0.08) 0%, transparent 50%)`
            }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
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
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-primary font-medium">Notre Histoire</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6"
              >
                L'Art du{' '}
                <span className="text-gradient-gold">Naturel</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              >
                Depuis 2019, MG LUXURY perpétue l'excellence des traditions sénégalaises,
                en créant des produits d'exception qui célèbrent la beauté naturelle et
                le savoir-faire ancestral de notre terre.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Notre Histoire
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Tout a commencé avec une passion pour les traditions ancestrales sénégalaises.
                    Fatou Diop, notre fondatrice, a grandi entourée des senteurs envoûtantes
                    du thiouraye que préparait sa grand-mère.
                  </p>
                  <p>
                    Après des années d'apprentissage auprès des maîtres artisans de Dakar,
                    elle décida de créer MG LUXURY pour partager ces trésors culturels
                    avec le monde entier, tout en préservant l'authenticité des méthodes traditionnelles.
                  </p>
                  <p>
                    Aujourd'hui, notre équipe de artisans qualifiés perpétue cet héritage,
                    en combinant savoir-faire ancestral et standards de qualité modernes.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 flex items-center justify-center">
                  <div className="text-center">
                    <Heart className="w-24 h-24 text-primary mx-auto mb-4" />
                    <p className="text-primary font-medium text-lg">
                      Passion & Tradition
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Nos Valeurs
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Les principes qui guident chacune de nos actions et décisions.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-gold">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="font-display text-3xl font-bold text-noir mb-4">
                MG LUXURY en Chiffres
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-display font-bold text-noir mb-2">
                    {stat.value}
                  </div>
                  <div className="text-noir/80 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary font-medium">Notre Mission</span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Préserver l'Excellence Traditionnelle
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Notre mission est de faire découvrir au monde entier la richesse des traditions sénégalaises,
                  tout en préservant l'authenticité et la qualité de nos méthodes ancestrales.
                  Nous croyons que la beauté véritable vient de la nature et du savoir-faire humain.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                <div className="text-center p-6 rounded-xl bg-card border border-border">
                  <Globe className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Portée Internationale</h3>
                  <p className="text-sm text-muted-foreground">
                    Nos produits sont appréciés dans plus de 15 pays à travers le monde.
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl bg-card border border-border">
                  <Star className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Qualité Premium</h3>
                  <p className="text-sm text-muted-foreground">
                    Chaque produit est rigoureusement testé et approuvé par nos experts.
                  </p>
                </div>
                <div className="text-center p-6 rounded-xl bg-card border border-border">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">Communauté Engagée</h3>
                  <p className="text-sm text-muted-foreground">
                    Nous soutenons les artisans locaux et contribuons au développement durable.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Notre Équipe
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Les artisans passionnés qui donnent vie à nos produits d'exception.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Users className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium text-sm mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {member.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary/10 via-background to-primary/10">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Rejoignez Notre Communauté
              </h2>
              <p className="text-muted-foreground mb-8">
                Découvrez nos produits d'exception et laissez-vous séduire par l'excellence sénégalaise.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-gold text-noir rounded-full font-semibold hover:shadow-luxury transition-all duration-300"
                >
                  Découvrir nos Produits
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  Nous Contacter
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;