import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Upload, X, Image as ImageIcon } from 'lucide-react';
import { useUser } from '@/context/UserContext';
import { useSupabase } from '@/context/SupabaseContext';
import { api } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

const AddProduct = () => {
  const { user, isAdmin } = useUser();
  const { categories, refreshData } = useSupabase();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: categories?.[0]?.name || 'huile',
    description: '',
    composition: '',
    image: 'https://Marie/imgbb',
    stock: ''
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('/placeholder.svg');
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/login');
    }
  }, [user, isAdmin, navigate]);

  // Mettre à jour la catégorie par défaut quand les catégories sont chargées
  useEffect(() => {
    if (categories && categories.length > 0 && formData.category === 'huile') {
      setFormData(prev => ({ ...prev, category: categories[0].name }));
    }
  }, [categories]);

  if (!user || !isAdmin) {
    return null;
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Vérifier le type de fichier
      if (!file.type.startsWith('image/')) {
        toast.error('Veuillez sélectionner un fichier image');
        return;
      }

      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('L\'image ne doit pas dépasser 5MB');
        return;
      }

      setSelectedFile(file);
      setImageUploaded(false); // Réinitialiser l'état d'upload quand un nouveau fichier est sélectionné

      // Créer un aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImageToImgBB = async (file: File): Promise<string> => {
    const formDataUpload = new FormData();
    formDataUpload.append('image', file);
    formDataUpload.append('key', 'ed1e69ede8bbcb240f2f7a1de9d15c45');

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formDataUpload
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
          // Mettre à jour le champ URL avec l'URL de l'image uploadée
          setFormData(prev => ({ ...prev, image: imageUrl }));
          setImageUploaded(true);
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
        is_new: true,
        category_id: null as number | null
      };

      await api.createProduct(productData);
      toast.success('Produit ajouté avec succès');

      // Actualiser les données
      await refreshData();

      // Rediriger vers la liste des produits
      navigate('/admin');

    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      toast.error('Erreur lors de la sauvegarde du produit');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setImagePreview('/placeholder.svg');
    setImageUploaded(false);
    setFormData(prev => ({ ...prev, image: '/placeholder.svg' }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="bg-noir text-cream py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/admin')}
              className="text-cream hover:bg-cream/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <div>
              <h1 className="text-2xl font-display font-bold">Ajouter un Produit</h1>
              <p className="text-cream/70 text-sm">Créez un nouveau produit pour votre boutique</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-card rounded-2xl shadow-luxury border border-border overflow-hidden"
          >
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Image Upload */}
                <div className="space-y-6">
                  <div>
                    <Label className="text-base font-semibold mb-4 block">Image du Produit</Label>
                    <div className="space-y-4">
                      {/* Image Preview */}
                      <div className="relative w-full aspect-square rounded-xl border-2 border-dashed border-border overflow-hidden bg-muted/30">
                        {imagePreview !== '/placeholder.svg' ? (
                          <img
                            src={imagePreview}
                            alt="Aperçu du produit"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
                            <ImageIcon className="w-12 h-12 mb-2" />
                            <p className="text-sm">Aucune image sélectionnée</p>
                          </div>
                        )}

                        {/* Remove Image Button */}
                        {imagePreview !== '/placeholder.svg' && (
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2"
                            onClick={clearImage}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        )}
                      </div>

                      {/* File Input */}
                      <div className="space-y-3">
                        <Label htmlFor="image-upload" className="text-sm font-medium">
                          Sélectionner une image
                        </Label>
                        <Input
                          id="image-upload"
                          type="file"
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90 cursor-pointer"
                        />
                        <p className="text-xs text-muted-foreground">
                          Formats acceptés: JPG, PNG, GIF. Taille max: 5MB
                        </p>
                      </div>

                      {/* Upload Status */}
                      {uploadingImage && (
                        <div className="flex items-center gap-2 text-blue-600 bg-blue-50 p-3 rounded-lg">
                          <div className="w-4 h-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
                          <span className="text-sm font-medium">Upload de l'image en cours...</span>
                        </div>
                      )}

                      {/* Alternative URL */}
                      <div className="space-y-2">
                        <Label htmlFor="image-url" className="text-sm font-medium">
                          {imageUploaded ? 'URL de l\'image (automatiquement remplie)' : 'Ou entrer une URL d\'image'}
                        </Label>
                        <Input
                          id="image-url"
                          type="url"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="https://example.com/image.jpg"
                          className={`text-sm ${imageUploaded ? 'bg-muted' : ''}`}
                          readOnly={imageUploaded}
                          disabled={imageUploaded}
                        />
                        {imageUploaded && (
                          <p className="text-xs text-green-600 flex items-center gap-1">
                            <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                            URL automatiquement remplie après upload
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Product Details */}
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-base font-semibold mb-2 block">
                      Nom du Produit *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Huile d'Argan Pure"
                      className="text-base"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price" className="text-base font-semibold mb-2 block">
                        Prix (F CFA) *
                      </Label>
                      <Input
                        id="price"
                        type="number"
                        min="0"
                        step="100"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        placeholder="8500"
                        className="text-base"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="stock" className="text-base font-semibold mb-2 block">
                        Stock *
                      </Label>
                      <Input
                        id="stock"
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        placeholder="10"
                        className="text-base"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-base font-semibold mb-2 block">
                      Catégorie *
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories?.map(cat => (
                          <SelectItem key={cat.id} value={cat.name} className="text-base">
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-base font-semibold mb-2 block">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Décrivez votre produit..."
                      rows={4}
                      className="text-base resize-none"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="composition" className="text-base font-semibold mb-2 block">
                      Composition (optionnel)
                    </Label>
                    <Textarea
                      id="composition"
                      value={formData.composition}
                      onChange={(e) => setFormData({ ...formData, composition: e.target.value })}
                      placeholder="Ingrédients, composition..."
                      rows={3}
                      className="text-base resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-border">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin')}
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting || uploadingImage}
                  className="flex-1 bg-gradient-gold text-noir hover:opacity-90 text-base font-semibold py-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-noir border-t-transparent"></div>
                      Création en cours...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Créer le Produit
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;