import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Filter, X, SlidersHorizontal } from 'lucide-react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ProductCard from '@/components/ProductCard/ProductCard';
import { useSupabase } from '@/context/SupabaseContext';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Pagination } from '@/components/ui/pagination';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const Shop = () => {
  const { products, categories, loading, error } = useSupabase();
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([0, 15000]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'name'>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Nombre de produits par page

  const selectedCategory = searchParams.get('category');

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    // Category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Price filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // New only filter
    if (showNewOnly) {
      result = result.filter(p => p.is_new);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [products, selectedCategory, priceRange, showNewOnly, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Reset to page 1 when filters change
  const handleFiltersChange = () => {
    setCurrentPage(1);
  };

  // Gestion du chargement
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Chargement des produits...</p>
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
        <main className="pt-20 min-h-screen flex items-center justify-center">
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

  const handleCategoryChange = (category: string | null) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
    handleFiltersChange();
  };

  const clearFilters = () => {
    setSearchParams({});
    setPriceRange([0, 15000]);
    setShowNewOnly(false);
    setSortBy('default');
    handleFiltersChange();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-SN').format(price) + ' F';
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-4">Catégories</h3>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryChange(null)}
            className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
              !selectedCategory ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            Tous les produits
          </button>
          {categories?.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.name)}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === cat.name ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-4">Prix</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={15000}
          step={500}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      {/* New Only */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={showNewOnly}
            onChange={(e) => setShowNewOnly(e.target.checked)}
            className="w-5 h-5 rounded border-border text-primary focus:ring-primary"
          />
          <span>Nouveautés uniquement</span>
        </label>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-display text-lg font-semibold mb-4">Trier par</h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary"
        >
          <option value="default">Par défaut</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
          <option value="name">Nom (A-Z)</option>
        </select>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full gap-2" onClick={clearFilters}>
        <X className="w-4 h-4" />
        Réinitialiser les filtres
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20">
        {/* Header */}
        <section className="bg-noir py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h1 className="font-display text-4xl md:text-5xl font-bold text-cream mb-4">
                {selectedCategory
                  ? categories?.find(c => c.name === selectedCategory)?.label || 'Boutique'
                  : 'Notre Boutique'
                }
              </h1>
              <p className="text-cream/70 max-w-xl mx-auto">
                {selectedCategory
                  ? categories?.find(c => c.name === selectedCategory)?.description
                  : 'Découvrez notre collection exclusive de produits naturels premium'
                }
              </p>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Desktop Sidebar */}
              <aside className="hidden lg:block w-72 flex-shrink-0">
                <div className="sticky top-24 bg-card p-6 rounded-xl border border-border">
                  <div className="flex items-center gap-2 mb-6">
                    <Filter className="w-5 h-5 text-primary" />
                    <h2 className="font-display text-xl font-semibold">Filtres</h2>
                  </div>
                  <FilterContent />
                </div>
              </aside>

              {/* Mobile Filter Sheet */}
              <div className="lg:hidden flex items-center justify-between mb-4">
                <p className="text-muted-foreground">
                  {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''}
                </p>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="gap-2">
                      <SlidersHorizontal className="w-4 h-4" />
                      Filtres
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto">
                    <SheetHeader className="mb-6">
                      <SheetTitle className="font-display">Filtres</SheetTitle>
                      <SheetDescription>
                        Affinez votre recherche
                      </SheetDescription>
                    </SheetHeader>
                    <FilterContent />
                  </SheetContent>
                </Sheet>
              </div>

              {/* Products Grid */}
              <div className="flex-1">
                <div className="hidden lg:flex items-center justify-between mb-6">
                  <p className="text-muted-foreground">
                    {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
                  </p>
                </div>

                {paginatedProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                    {paginatedProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg mb-4">
                      Aucun produit ne correspond à vos critères
                    </p>
                    <Button onClick={clearFilters}>Voir tous les produits</Button>
                  </div>
                )}

                {/* Pagination */}
                {filteredProducts.length > itemsPerPage && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    showInfo={true}
                    totalItems={filteredProducts.length}
                    itemsPerPage={itemsPerPage}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
