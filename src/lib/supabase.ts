import { createClient } from '@supabase/supabase-js'

// Configuration Supabase
const supabaseUrl = "https://dlmpyfsrozhalyvfhnjm.supabase.co"
const supabaseKey = 'sb_publishable_85_E2dx5s4OVKEcDgMEL2w_SRoxjHR9'

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Interfaces basées sur le schéma de base de données
export interface Category {
  id: number
  name: string
  label: string
  description: string | null
  image: string | null
  created_at: string
  updated_at: string
}

export interface Product {
  id: number
  name: string
  price: number
  category: string
  description: string | null
  composition: string | null
  image: string | null
  stock: number
  featured: boolean
  is_new: boolean
  created_at: string
  updated_at: string
  category_id: number | null
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number
  quantity: number
  price: number
  created_at: string
}

export interface Order {
  id: number
  customer_name: string
  customer_email: string
  customer_phone: string | null
  address: string
  total_price: number
  status: 'en attente' | 'en cours' | 'confirmée' | 'expédiée' | 'livrée' | 'annulée'
  date: string
  created_at: string
  updated_at: string
  user_id: number | null
}

export interface User {
  id: number
  name: string
  email: string
  password_hash: string
  role: 'admin' | 'customer'
  phone: string | null
  address: string | null
  created_at: string
  updated_at: string
}

export interface OrderDetail {
  order_id: number
  customer_name: string
  customer_email: string
  customer_phone: string | null
  address: string
  total_price: number
  status: string
  date: string
  quantity: number
  item_price: number
  product_name: string
  product_image: string | null
  item_total: number
}

export interface ProductStat {
  id: number
  name: string
  category: string
  price: number
  stock: number
  featured: boolean
  is_new: boolean
  times_ordered: number
  total_quantity_sold: number
  total_revenue: number
}

// API functions pour les catégories
export const api = {
  // === CATÉGORIES ===
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getCategory(id: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async createCategory(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .insert(category)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateCategory(id: string, updates: Partial<Category>): Promise<Category> {
    const { data, error } = await supabase
      .from('categories')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteCategory(id: string): Promise<void> {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // === PRODUITS ===
  async getProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getProduct(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async getProductsByCategory(category: string): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getFeaturedProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getNewProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_new', true)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // === COMMANDES ===
  async getOrders(): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getOrder(id: string): Promise<Order | null> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async updateOrder(id: string, updates: Partial<Order>): Promise<Order> {
    const { data, error } = await supabase
      .from('orders')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async deleteOrder(id: string): Promise<void> {
    const { error } = await supabase
      .from('orders')
      .delete()
      .eq('id', id)

    if (error) throw error
  },

  // === ARTICLES DE COMMANDE ===
  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  },

  async createOrderItem(orderItem: Omit<OrderItem, 'id' | 'created_at'>): Promise<OrderItem> {
    const { data, error } = await supabase
      .from('order_items')
      .insert(orderItem)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async createOrderWithItems(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>, items: Omit<OrderItem, 'id' | 'created_at' | 'order_id'>[]): Promise<Order> {
    // Créer la commande
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single()

    if (orderError) throw orderError

    // Créer les articles de commande
    const orderItems = items.map(item => ({
      ...item,
      order_id: orderData.id
    }))

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems)

    if (itemsError) throw itemsError

    return orderData
  },

  // === UTILISATEURS ===
  async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error) throw error
    return user
  },

  async signUp(email: string, password: string, name: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    })
    if (error) throw error
    return data
  },

  async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getUserProfile(userId: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error) throw error
    return data
  },

  async updateUserProfile(userId: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()

    if (error) throw error
    return data
  },

  // === STATISTIQUES ===
  async getOrderDetails(): Promise<OrderDetail[]> {
    const { data, error } = await supabase
      .from('order_details')
      .select('*')
      .order('date', { ascending: false })

    if (error) throw error
    return data || []
  },

  async getProductStats(): Promise<ProductStat[]> {
    const { data, error } = await supabase
      .from('product_stats')
      .select('*')
      .order('total_revenue', { ascending: false })

    if (error) throw error
    return data || []
  }
}

// Types pour les formulaires et l'interface utilisateur
export interface CreateOrderData {
  customer_name: string
  customer_email: string
  customer_phone?: string
  address: string
  items: {
    product_id: string
    quantity: number
    price: number
  }[]
}

export interface UpdateOrderStatusData {
  status: Order['status']
}

export interface CreateProductData {
  name: string
  price: number
  category: string
  description?: string
  composition?: string
  image?: string
  stock: number
  featured?: boolean
  is_new?: boolean
}

export interface CreateCategoryData {
  name: string
  label: string
  description?: string
  image?: string
}