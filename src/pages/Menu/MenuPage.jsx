import { useState } from 'react'
import { useProducts } from '../../hooks/useProducts'
import ProductCard from '../../components/ProductCard'
import ProductModal from '../../components/ProductModal'
import CartFloat from '../../components/CartFloat'

export default function MenuPage() {
  const { productsByCategory, additionals, loading, error } = useProducts()
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const allProducts = productsByCategory.flatMap(c => c.products)
  const filtered = search.trim()
    ? allProducts.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description?.toLowerCase().includes(search.toLowerCase())
      )
    : null

  if (loading) return (
    <div className="flex items-center justify-center py-24 text-gray-400">
      <p>Cargando menú...</p>
    </div>
  )

  if (error) return (
    <div className="flex items-center justify-center py-24 text-red-500 px-4 text-center">
      <p>Error al cargar el menú. Revisá tu conexión.</p>
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="px-4 py-3" style={{ background: '#9F1239' }}>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-red-200">🔍</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Buscar hamburguesas, bebidas..."
            className="w-full rounded-full py-2 pl-9 pr-4 text-sm text-white placeholder-red-200 outline-none"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
          />
        </div>
      </div>

      {filtered ? (
        <div className="mt-2 bg-white">
          {filtered.length === 0
            ? <p className="text-center text-gray-400 text-sm py-12">Sin resultados para "{search}"</p>
            : filtered.map(p => <ProductCard key={p.id} product={p} onAdd={setSelectedProduct} />)
          }
        </div>
      ) : (
        productsByCategory.map(cat => (
          cat.products.length === 0 ? null : (
            <div key={cat.id} className="mt-2">
              <div className="flex items-center gap-2 px-4 py-3">
                <span className="text-xl">{cat.emoji}</span>
                <h2 className="text-base font-medium text-gray-800">{cat.name}</h2>
              </div>
              <div className="bg-white">
                {cat.products.map(p => <ProductCard key={p.id} product={p} onAdd={setSelectedProduct} />)}
              </div>
            </div>
          )
        ))
      )}

      <ProductModal
        product={selectedProduct}
        additionals={additionals}
        onClose={() => setSelectedProduct(null)}
      />
      <CartFloat />
    </div>
  )
}
