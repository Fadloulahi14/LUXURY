import React, { createContext, useContext, useEffect, useState } from 'react'
import { api, Category, Product, Order } from '@/lib/supabase'

interface SupabaseContextType {
  categories: Category[]
  products: Product[]
  orders: Order[]
  loading: boolean
  error: string | null
  refreshData: () => Promise<void>
}

const SupabaseContext = createContext<SupabaseContextType | undefined>(undefined)

export const useSupabase = () => {
  const context = useContext(SupabaseContext)
  if (context === undefined) {
    throw new Error('useSupabase must be used within a SupabaseProvider')
  }
  return context
}

interface SupabaseProviderProps {
  children: React.ReactNode
}

export const SupabaseProvider: React.FC<SupabaseProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [categoriesData, productsData, ordersData] = await Promise.all([
        api.getCategories(),
        api.getProducts(),
        api.getOrders()
      ])

      setCategories(categoriesData)
      setProducts(productsData)
      setOrders(ordersData)
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    await fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  const value: SupabaseContextType = {
    categories,
    products,
    orders,
    loading,
    error,
    refreshData
  }

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  )
}