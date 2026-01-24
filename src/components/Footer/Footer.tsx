import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-noir text-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <img src="/image/logo.png" alt="MG Luxury Logo" className="h-20 md:h-24" />
            <p className="text-sm text-cream/70 leading-relaxed">
              L'excellence au naturel. Découvrez nos thiouraye traditionnels et huiles naturelles premium du Sénégal.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 bg-cream/10 rounded-full hover:bg-primary/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-cream/10 rounded-full hover:bg-primary/20 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-display text-lg text-primary">Navigation</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-cream/70 hover:text-primary transition-colors">
                Accueil
              </Link>
              <Link to="/shop" className="text-sm text-cream/70 hover:text-primary transition-colors">
                Boutique
              </Link>
              <Link to="/shop?category=thiouraye" className="text-sm text-cream/70 hover:text-primary transition-colors">
                Thiouraye
              </Link>
              <Link to="/shop?category=huile" className="text-sm text-cream/70 hover:text-primary transition-colors">
                Huiles Naturelles
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-display text-lg text-primary">Contact</h4>
            <div className="space-y-3">
              <a href="tel:+221770000000" className="flex items-center gap-3 text-sm text-cream/70 hover:text-primary transition-colors">
                <Phone className="w-4 h-4" />
                +221 77 000 00 00
              </a>
              <a href="mailto:contact@mgluxury.sn" className="flex items-center gap-3 text-sm text-cream/70 hover:text-primary transition-colors">
                <Mail className="w-4 h-4" />
                contact@mgluxury.sn
              </a>
              <div className="flex items-start gap-3 text-sm text-cream/70">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Dakar, Sénégal</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-display text-lg text-primary">Horaires</h4>
            <div className="space-y-2 text-sm text-cream/70">
              <p>Lundi - Vendredi: 9h - 18h</p>
              <p>Samedi: 10h - 16h</p>
              <p>Dimanche: Fermé</p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-cream/10 text-center">
          <p className="text-sm text-cream/50">
            © 2026 MG LUXURY – 2M. Devellopper par Fadil / IncludeCode: 778012731.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
