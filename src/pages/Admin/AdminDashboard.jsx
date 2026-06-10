import { useState, useEffect } from 'react'
import { signOut } from '../../services/auth'
import { getProducts, getAdditionals, deleteProduct, deleteAdditional } from '../../services/products'
import AdminProductForm from './AdminProductForm'
import AdminAdditionalForm from './AdminAdditionalForm'

const fmt = (n) => '$' + n.toLocaleString('es-AR')

export default function AdminDashboard() {
  const [tab, setTab] = useState('products')
  const [products, setProducts] = useState([])
  const [additionals, setAdditionals] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState(null)
  const [editingAdditional, setEditingAdditional] = useState(null)
  const [showProductForm, setShowProductForm] = useState(false)
  const [showAdditionalForm, setShowAdditionalForm] = useState(false)

  const load = async () => {
    setLoading(true)
    const [prods, adds] = await Promise.all([getProducts(), getAdditionals()])
    setProducts(prods)
    setAdditionals(adds)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleDeleteProduct = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return
    await deleteProduct(id)
    load()
  }

  const handleDeleteAdditional = async (id) => {
    if (!confirm('¿Eliminar este adicional?')) return
    await deleteAdditional(id)
    load()
  }

  const openProductForm = (product = null) => {
    setEditingProduct(product)
    setShowProductForm(true)
  }

  const openAdditionalForm = (additional = null) => {
    setEditingAdditional(additional)
    setShowAdditionalForm(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-4 flex items-center justify-between" style={{ background: '#B91C1C' }}>
        <div>
          <h1 className="text-white font-medium">Panel Admin</h1>
          <p className="text-red-300 text-xs">Del Bajón</p>
        </div>
        <button onClick={signOut} className="text-red-200 text-sm">Salir</button>
      </div>

      <div className="flex border-b border-gray-200 bg-white">
        {[['products', '🍔 Productos'], ['additionals', '➕ Adicionales']].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              tab === key ? 'border-b-2 text-red-700' : 'text-gray-500'
            }`}
            style={tab === key ? { borderColor: '#B91C1C' } : {}}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {tab === 'products' && (
          <>
            <button
              onClick={() => openProductForm()}
              className="w-full text-white rounded-xl py-3 text-sm font-medium mb-4"
              style={{ background: '#B91C1C' }}
            >
              + Agregar producto
            </button>
            {loading ? <p className="text-center text-gray-400 text-sm py-8">Cargando...</p> : (
              <div className="flex flex-col gap-2">
                {products.map(p => (
                  <div key={p.id} className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
                    <span className="text-2xl">{p.emoji || '🍔'}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                      <p className="text-xs text-gray-400">{fmt(p.price)}</p>
                    </div>
                    <button onClick={() => openProductForm(p)} className="text-blue-500 text-sm px-2">✏️</button>
                    <button onClick={() => handleDeleteProduct(p.id)} className="text-red-500 text-sm px-2">🗑</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'additionals' && (
          <>
            <button
              onClick={() => openAdditionalForm()}
              className="w-full text-white rounded-xl py-3 text-sm font-medium mb-4"
              style={{ background: '#B91C1C' }}
            >
              + Agregar adicional
            </button>
            {loading ? <p className="text-center text-gray-400 text-sm py-8">Cargando...</p> : (
              <div className="flex flex-col gap-2">
                {additionals.map(a => (
                  <div key={a.id} className="bg-white rounded-xl border border-gray-100 px-4 py-3 flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{a.name}</p>
                      <p className="text-xs text-gray-400">+{fmt(a.price)}</p>
                    </div>
                    <button onClick={() => openAdditionalForm(a)} className="text-blue-500 text-sm px-2">✏️</button>
                    <button onClick={() => handleDeleteAdditional(a.id)} className="text-red-500 text-sm px-2">🗑</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {showProductForm && (
        <AdminProductForm
          product={editingProduct}
          onClose={() => setShowProductForm(false)}
          onSaved={() => { setShowProductForm(false); load() }}
        />
      )}
      {showAdditionalForm && (
        <AdminAdditionalForm
          additional={editingAdditional}
          onClose={() => setShowAdditionalForm(false)}
          onSaved={() => { setShowAdditionalForm(false); load() }}
        />
      )}
    </div>
  )
}
