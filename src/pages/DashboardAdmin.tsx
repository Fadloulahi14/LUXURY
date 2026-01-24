import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Package, ShoppingBag, Users, Plus, Edit, Trash2, Save, X,
  LayoutDashboard, ClipboardList, LogOut
} from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useSupabase } from '@/context/SupabaseContext';
import { Product } from '@/lib/supabase';
import { api } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
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
  const { products: productsList, categories, orders, loading, refreshData } = useSupabase();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: categories?.[0]?.name || 'huile', // Utilise la première catégorie disponible ou 'huile' par défaut
    description: '',
    composition: '',
    image: 'https://i.ibb.co/7CQVJNm/fadil.png',
    stock: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('/placeholder.svg');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [productsCurrentPage, setProductsCurrentPage] = useState(1);
  const [ordersCurrentPage, setOrdersCurrentPage] = useState(1);
  const itemsPerPage = 12; // Nombre d'éléments par page

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/login');
    }
  }, [user, isAdmin, navigate]);

  if (!user || !isAdmin) {
    return null;
  }

  // Gestion du chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-muted/30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Chargement du tableau de bord...</p>
        </div>
      </div>
    );
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
      category: categories?.[0]?.name || 'huile',
      description: '',
      composition: '',
      image: '/placeholder.svg',
      stock: ''
    });
    setSelectedFile(null);
    setImagePreview('/placeholder.svg');
    setEditingProduct(null);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToImgBB = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('key', 'ed1e69ede8bbcb240f2f7a1de9d15c45');

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'upload de l\'image');
    }

    const data = await response.json();
    if (!data.success) {
      throw new Error('Upload échoué: ' + data.error?.message);
    }

    return data.data.url;
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
    setSelectedFile(null);
    setImagePreview(product.image || '/placeholder.svg');
    setIsProductDialogOpen(true);
  };

  const handleSaveProduct = async () => {
    if (!formData.name || !formData.price || !formData.stock) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    setIsSubmitting(true);

    try {
      let imageUrl = formData.image;

      // Upload de l'image si un fichier est sélectionné
      if (selectedFile) {
        setUploadingImage(true);
        try {
          imageUrl = await uploadImageToImgBB(selectedFile);
          toast.success('Image uploadée avec succès');
        } catch (uploadError) {
          console.error('Erreur upload image:', uploadError);
          toast.error('Erreur lors de l\'upload de l\'image');
          return;
        } finally {
          setUploadingImage(false);
        }
      }

      const productData = {
        name: formData.name,
        price: Number(formData.price),
        category: formData.category,
        description: formData.description,
        composition: formData.composition || null,
        image: imageUrl,
        stock: Number(formData.stock),
        featured: false,
        is_new: !editingProduct,
        category_id: null as number | null
      };

      if (editingProduct) {
        // Modification d'un produit existant
        await api.updateProduct(String(editingProduct.id), productData);
        toast.success('Produit modifié avec succès');
      } else {
        // Ajout d'un nouveau produit
        await api.createProduct(productData);
        toast.success('Produit ajouté avec succès');
      }

      // Actualiser les données
      await refreshData();

      setIsProductDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde du produit');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      return;
    }

    try {
      await api.deleteProduct(String(id));
      toast.success('Produit supprimé avec succès');

      // Actualiser les données
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      toast.error('Erreur lors de la suppression du produit');
    }
  };

  const handleApproveOrder = async (orderId: number) => {
    try {
      await api.updateOrder(String(orderId), { status: 'confirmée' });
      toast.success('Commande approuvée avec succès');
      await refreshData();
    } catch (error) {
      console.error('Erreur lors de l\'approbation:', error);
      toast.error('Erreur lors de l\'approbation de la commande');
    }
  };

  const handleRejectOrder = async (orderId: number) => {
    if (!confirm('Êtes-vous sûr de vouloir rejeter cette commande ?')) {
      return;
    }

    try {
      await api.updateOrder(String(orderId), { status: 'annulée' });
      toast.success('Commande rejetée');
      await refreshData();
    } catch (error) {
      console.error('Erreur lors du rejet:', error);
      toast.error('Erreur lors du rejet de la commande');
    }
  };

  const stats = [
    {
      label: 'Produits',
      value: productsList?.length || 0,
      icon: Package,
      color: 'text-primary'
    },
    {
      label: 'Commandes',
      value: orders?.length || 0,
      icon: ShoppingBag,
      color: 'text-green-600'
    },
    {
      label: 'Revenus',
      value: formatPrice(orders?.filter(o => o.status !== 'annulée').reduce((sum, o) => sum + o.total_price, 0) || 0),
      icon: Users,
      color: 'text-blue-600'
    },
  ];

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      'en cours': 'bg-orange-100 text-orange-800',
      'confirmée': 'bg-blue-100 text-blue-800',
      'expédiée': 'bg-purple-100 text-purple-800',
      'livrée': 'bg-green-100 text-green-800',
      'annulée': 'bg-red-100 text-red-800'
    };
    return statusColors[status] || 'bg-gray-100 text-gray-800';
  };

  // Pagination logic for products
  const productsTotalPages = Math.ceil((productsList?.length || 0) / itemsPerPage);
  const paginatedProducts = productsList?.slice(
    (productsCurrentPage - 1) * itemsPerPage,
    productsCurrentPage * itemsPerPage
  ) || [];

  // Pagination logic for orders
  const ordersTotalPages = Math.ceil((orders?.length || 0) / itemsPerPage);
  const paginatedOrders = orders ? orders.slice(
    (ordersCurrentPage - 1) * itemsPerPage,
    ordersCurrentPage * itemsPerPage
  ) : [];

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
                    {orders?.slice(0, 5).map(order => (
                      <tr key={order.id} className="border-t border-border">
                        <td className="px-4 py-3 text-sm">#{order.id}</td>
                        <td className="px-4 py-3 text-sm">{order.customerName}</td>
                        <td className="px-4 py-3 text-sm">{order.date}</td>
                        <td className="px-4 py-3 text-sm font-medium">{formatPrice(order.total_price)}</td>
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
              <Button
                className="gap-2 bg-gradient-gold text-noir"
                onClick={() => navigate('/admin/products/add')}
              >
                <Plus className="w-4 h-4" />
                Ajouter
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedProducts && paginatedProducts.length > 0 ? (
                paginatedProducts.map((product, i) => (
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
                      {product.is_new && (
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
                ))
              ) : (
                <div className="text-center py-20 col-span-full">
                  <p className="text-muted-foreground text-lg mb-4">
                    Aucun produit trouvé
                  </p>
                </div>
              )}
            </div>

            {/* Pagination for Products */}
            {productsList && productsList.length > itemsPerPage && (
              <Pagination
                currentPage={productsCurrentPage}
                totalPages={productsTotalPages}
                onPageChange={setProductsCurrentPage}
                showInfo={true}
                totalItems={productsList.length}
                itemsPerPage={itemsPerPage}
              />
            )}
          </motion.div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="font-display text-2xl font-bold mb-6">Commandes</h2>
            
            <div className="space-y-4">
              {paginatedOrders && paginatedOrders.length > 0 ? (
                paginatedOrders.map((order, i) => (
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
                          <Badge className={getStatusBadge(order.status)}>
                            {order.status}
                            {order.status === 'en cours' && (
                              <span className="ml-1 w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                            )}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.date}</p>
                        {order.status === 'en cours' && (
                          <p className="text-xs text-orange-600 font-medium">⚠️ Action requise</p>
                        )}
                      </div>
                      <span className="font-display text-xl font-bold text-primary">
                        {formatPrice(order.total_price)}
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
                        {order.items && order.items.length > 0 ? order.items.map((item, idx) => {
                          const product = productsList?.find(p => p.id === item.productId);
                          return (
                            <p key={idx} className="text-sm text-muted-foreground">
                              • {product?.name || 'Produit inconnu'} x{item.quantity} - {formatPrice(item.price * item.quantity)}
                            </p>
                          );
                        }) : (
                          <p className="text-sm text-muted-foreground">Aucun produit dans cette commande</p>
                        )}
                      </div>

                      {/* Action buttons for pending orders */}
                      {order.status === 'en cours' && (
                        <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                          <Button
                            size="sm"
                            onClick={() => handleApproveOrder(order.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            Approuver
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectOrder(order.id)}
                            className="flex-1"
                          >
                            Rejeter
                          </Button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-lg mb-4">
                    Aucune commande trouvée
                  </p>
                </div>
              )}
            </div>

            {/* Pagination for Orders */}
            {orders && orders.length > itemsPerPage && (
              <Pagination
                currentPage={ordersCurrentPage}
                totalPages={ordersTotalPages}
                onPageChange={setOrdersCurrentPage}
                showInfo={true}
                totalItems={orders.length}
                itemsPerPage={itemsPerPage}
              />
            )}
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default DashboardAdmin;
