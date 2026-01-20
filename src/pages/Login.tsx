import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import { useUser } from '@/context/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();
  const { login, user } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    navigate(user.role === 'admin' ? '/admin' : '/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 500));

    const result = login(email, password);
    
    if (result.success) {
      toast.success(result.message);
      // Check role and redirect
      const savedUser = JSON.parse(localStorage.getItem('mg-user') || '{}');
      if (savedUser.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } else {
      toast.error(result.message);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-20 min-h-screen flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold mb-2">Connexion</h1>
              <p className="text-muted-foreground">
                Accédez à votre espace personnel
              </p>
            </div>

            <div className="bg-card p-8 rounded-xl border border-border shadow-luxury">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="votre@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Mot de passe
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gap-2 bg-gradient-gold text-noir font-semibold"
                  disabled={isLoading}
                >
                  {isLoading ? 'Connexion...' : 'Se connecter'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 p-4 rounded-lg bg-muted/50">
                <p className="text-sm font-medium text-center mb-2">Identifiants de test :</p>
                <div className="text-xs text-muted-foreground space-y-1 text-center">
                  <p><strong>Admin:</strong> admin@mg.com / admin123</p>
                  <p><strong>Client:</strong> client@test.com / client123</p>
                </div>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
              Pas encore de compte ?{' '}
              <Link to="/shop" className="text-primary hover:underline">
                Découvrir la boutique
              </Link>
            </p>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;
