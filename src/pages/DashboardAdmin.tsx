import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Package, ShoppingBag, Users, Plus, Edit, Trash2, Save, X, 
  LayoutDashboard, ClipboardList, LogOut
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { products as initialProducts, Product } from '@/api/products';
import { orders } from '@/api/orders';
import { categories } from '@/api/categories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const DashboardAdmin = () => {
  const { user, logout, isAdmin } = useUser();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'thiouraye',
    description: '',
    composition: '',
    image: '/placeholder.svg',
    stock: ''
  });

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/login');
    }
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) {
    return null;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-SN').format(price) + ' F';
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: 'thiouraye',
      description: '',
      composition: '',
      image: '/placeholder.svg',
      stock: ''
    });
    setEditingProduct(null);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      composition: product.composition || '',
      image: product.image,
      stock: product.stock.toString()
    });
    setIsProductDialogOpen(true);
  };

  const handleSaveProduct = () => {
    if (!formData.name || !formData.price || !formData.stock) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const productData: Product = {
      id: editingProduct?.id || Date.now(),
      name: formData.name,
      price: Number(formData.price),
      category: formData.category,
      description: formData.description,
      composition: formData.composition || undefined,
      image: formData.image,
      stock: Number(formData.stock),
      isNew: !editingProduct,
      featured: editingProduct?.featured || false
    };

    if (editingProduct) {
      setProductsList(prev => prev.map(p => p.id === editingProduct.id ? productData : p));
      toast.success('Produit modifié avec succès');
    } else {
      setProductsList(prev => [...prev, productData]);
      toast.success('Produit ajouté avec succès');
    }

    setIsProductDialogOpen(false);
    resetForm();
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      setProductsList(prev => prev.filter(p => p.id !== id));
      toast.success('Produit supprimé');
    }
  };

  const stats = [
    { 
      label: 'Produits', 
      value: productsList.length, 
      icon: Package, 
      color: 'text-primary' 
    },
    { 
      label: 'Commandes', 
      value: orders.length, 
      icon: ShoppingBag, 
      color: 'text-green-600' 
    },
    { 
      label: 'Revenus', 
      value: formatPrice(orders.reduce((sum, o) => sum + o.totalPrice, 0)), 
      icon: Users, 
      color: 'text-blue-600' 
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      'en cours': 'bg-yellow-100 text-yellow-800',
      'confirmée': 'bg-blue-100 text-blue-800',
      'expédiée': 'bg-purple-100 text-purple-800',
      'livrée': 'bg-green-100 text-green-800',
      'annulée': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-noir text-cream p-6 hidden lg:block">
        <div className="mb-8">
          <img src="/image/logo.png" alt="MG Luxury Logo" className="h-16 mb-2" />
          <p className="text-xs text-cream/50">Panneau d'administration</p>
        </div>

        <nav className="space-y-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'overview' ? 'bg-primary/20 text-primary' : 'hover:bg-cream/10'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Vue d'ensemble
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'products' ? 'bg-primary/20 text-primary' : 'hover:bg-cream/10'
            }`}
          >
            <Package className="w-5 h-5" />
            Produits
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              activeTab === 'orders' ? 'bg-primary/20 text-primary' : 'hover:bg-cream/10'
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            Commandes
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-cream/70 hover:text-cream hover:bg-cream/10"
            onClick={() => navigate('/')}
          >
            Voir le site
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-6 lg:p-8">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-6">
          <img src="/image/logo.png" alt="MG Luxury Logo" className="h-12" />
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
          </Button>
        </div>

        {/* Mobile Tabs */}
        <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={activeTab === 'overview' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('overview')}
          >
            Vue d'ensemble
          </Button>
          <Button
            variant={activeTab === 'products' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('products')}
          >
            Produits
          </Button>
          <Button
            variant={activeTab === 'orders' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTab('orders')}
          >
            Commandes
          </Button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl font-bold mb-6">Tableau de bord</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card p-6 rounded-xl border border-border shadow-luxury"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-muted-foreground text-sm">{stat.label}</span>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <span className="font-display text-2xl font-bold">{stat.value}</span>
                </motion.div>
              ))}
            </div>

            {/* Recent Orders */}
            <h3 className="font-display text-xl font-semibold mb-4">Commandes récentes</h3>
            <div className="bg-card rounded-xl border border-border shadow-luxury overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-medium">ID</th>
                      <th className="text-left px-4 py-3 text-sm font-medium">Client</th>
                      <th className="text-left px-4 py-3 text-sm font-medium">Date</th>
                      <th className="text-left px-4 py-3 text-sm font-medium">Total</th>
                      <th className="text-left px-4 py-3 text-sm font-medium">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(order => (
                      <tr key={order.id} className="border-t border-border">
                        <td className="px-4 py-3 text-sm">#{order.id}</td>
                        <td className="px-4 py-3 text-sm">{order.customerName}</td>
                        <td className="px-4 py-3 text-sm">{order.date}</td>
                        <td className="px-4 py-3 text-sm font-medium">{formatPrice(order.totalPrice)}</td>
                        <td className="px-4 py-3">
                          <Badge className={getStatusBadge(order.status)}>
                            {order.status}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl font-bold">Produits ({productsList.length})</h2>
              <Dialog open={isProductDialogOpen} onOpenChange={setIsProductDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gap-2 bg-gradient-gold text-noir" onClick={resetForm}>
                    <Plus className="w-4 h-4" />
                    Ajouter
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="font-display">
                      {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
                    </DialogTitle>
                    <DialogDescription>
                      Remplissez les informations du produit
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nom *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Nom du produit"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Prix (F CFA) *</Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          placeholder="5000"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="stock">Stock *</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={formData.stock}
                          onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                          placeholder="10"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Catégorie *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => setFormData({ ...formData, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat.id} value={cat.name}>
                              {cat.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Description du produit"
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="composition">Composition (huiles)</Label>
                      <Textarea
                        id="composition"
                        value={formData.composition}
                        onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
                        placeholder="Composition du produit"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">URL de l'image</Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="/assets/produit.jpg"
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setIsProductDialogOpen(false);
                          resetForm();
                        }}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Annuler
                      </Button>
                      <Button
                        className="flex-1 bg-gradient-gold text-noir"
                        onClick={handleSaveProduct}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productsList.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card rounded-xl border border-border shadow-luxury overflow-hidden"
                >
                  <div className="aspect-video bg-muted relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {product.isNew && (
                      <Badge className="absolute top-2 left-2 bg-primary">Nouveau</Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <span className="text-xs text-primary uppercase tracking-wider">
                      {product.category}
                    </span>
                    <h3 className="font-display font-semibold mt-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <div className="flex items-center justify-between mt-3">
                      <span className="font-bold text-primary">{formatPrice(product.price)}</span>
                      <span className="text-sm text-muted-foreground">Stock: {product.stock}</span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 gap-1"
                        onClick={() => openEditDialog(product)}
                      >
                        <Edit className="w-3 h-3" />
                        Modifier
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl font-bold mb-6">Commandes</h2>
            
            <div className="space-y-4">
              {orders.map((order, i) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-card p-6 rounded-xl border border-border shadow-luxury"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display font-semibold">Commande #{order.id}</span>
                        <Badge className={getStatusBadge(order.status)}>{order.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.date}</p>
                    </div>
                    <span className="font-display text-xl font-bold text-primary">
                      {formatPrice(order.totalPrice)}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium mb-1">Client</p>
                      <p className="text-muted-foreground">{order.customerName}</p>
                      <p className="text-muted-foreground">{order.customerPhone}</p>
                      <p className="text-muted-foreground">{order.customerEmail}</p>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Adresse</p>
                      <p className="text-muted-foreground">{order.address}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="font-medium mb-2 text-sm">Produits commandés</p>
                    <div className="space-y-1">
                      {order.items.map((item, idx) => {
                        const product = initialProducts.find(p => p.id === item.productId);
                        return (
                          <p key={idx} className="text-sm text-muted-foreground">
                            • {product?.name || 'Produit inconnu'} x{item.quantity} - {formatPrice(item.price * item.quantity)}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default DashboardAdmin;
