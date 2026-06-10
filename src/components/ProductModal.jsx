import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

const fmt = (n) => '$' + n.toLocaleString('es-AR')

export default function ProductModal({ product, additionals, onClose }) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [selected, setSelected] = useState([])

  useEffect(() => {
    setQty(1)
    setSelected([])
  }, [product])

  if (!product) return null

  const toggleAdditional = (add) => {
    setSelected(prev =>
      prev.find(a => a.id === add.id)
        ? prev.filter(a => a.id !== add.id)
        : [...prev, add]
    )
  }

  const extrasTotal = selected.reduce((s, a) => s + a.price, 0)
  const total = (product.price + extrasTotal) * qty

  const handleAdd = () => {
    addItem(product, qty, selected)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end"
      style={{ background: 'rgba(0,0,0,0.55)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-t-2xl w-full max-h-[85vh] overflow-y-auto pb-6">
        <div className="flex justify-between items-start p-4">
          <div className="flex-1 pr-3">
            <h2 className="text-lg font-medium text-gray-900">{product.name}</h2>
            <p className="text-sm text-gray-500 mt-1">{product.description}</p>
            <p className="text-xl font-medium mt-2" style={{ color: '#B91C1C' }}>{fmt(product.price)}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0"
          >✕</button>
        </div>

        {additionals.length > 0 && (
          <>
            <div className="px-4 py-2 text-xs font-medium text-gray-400 uppercase tracking-wider border-t border-gray-100">
              Adicionales
            </div>
            {additionals.map(add => (
              <label
                key={add.id}
                className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 cursor-pointer active:bg-gray-50"
              >
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded accent-red-700"
                  checked={!!selected.find(a => a.id === add.id)}
                  onChange={() => toggleAdditional(add)}
                />
                <span className="flex-1 text-sm text-gray-800">{add.name}</span>
                <span className="text-sm font-medium" style={{ color: '#B91C1C' }}>+{fmt(add.price)}</span>
              </label>
            ))}
          </>
        )}

        <div className="flex items-center gap-3 px-4 pt-4">
          <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-7 h-7 text-xl text-gray-700 flex items-center justify-center">−</button>
            <span className="text-base font-medium w-5 text-center text-gray-900">{qty}</span>
            <button onClick={() => setQty(q => q + 1)} className="w-7 h-7 text-xl text-gray-700 flex items-center justify-center">+</button>
          </div>
          <button
            onClick={handleAdd}
            className="flex-1 text-white rounded-xl py-3 text-sm font-medium flex justify-between items-center px-4"
            style={{ background: '#B91C1C' }}
          >
            <span>Agregar al pedido</span>
            <span>{fmt(total)}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
