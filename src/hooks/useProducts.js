import { useState, useEffect } from 'react'
import { getProducts, getCategories, getAdditionals } from '../services/products'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [additionals, setAdditionals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const [prods, cats, adds] = await Promise.all([
          getProducts(),
          getCategories(),
          getAdditionals(),
        ])
        setProducts(prods)
        setCategories(cats)
        setAdditionals(adds)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const productsByCategory = categories.map(cat => ({
    ...cat,
    products: products.filter(p => p.category_id === cat.id),
  }))

  return { products, categories, additionals, productsByCategory, loading, error }
}
