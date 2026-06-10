import { useState, useEffect } from 'react'
import { createProduct, updateProduct, getCategories } from '../../services/products'
import { uploadImage } from '../../services/storage'

export default function AdminProductForm({ product, onClose, onSaved }) {
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    name: '', description: '', price: '', emoji: '🍔',
    category_id: '', active: true, image_url: '',
  })
  const [imageFile, setImageFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    getCategories().then(setCategories)
    if (product) {
      setForm({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        emoji: product.emoji || '🍔',
        category_id: product.category_id || '',
        active: product.active ?? true,
        image_url: product.image_url || '',
      })
    }
  }, [product])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      let image_url = form.image_url
      if (imageFile) {
        image_url = await uploadImage(imageFile, product?.id || `new-${Date.now()}`)
      }
      const data = { ...form, price: Number(form.price), image_url }
      if (product) await updateProduct(product.id, data)
      else await createProduct(data)
      onSaved()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.55)' }}>
      <div className="bg-white rounded-t-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="text-base font-medium text-gray-900">{product ? 'Editar producto' : 'Nuevo producto'}</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3 pb-8">
          <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Nombre del producto" required
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-400" />
          <textarea value={form.description} onChange={e => set('description', e.target.value)} placeholder="Descripción" rows={2}
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-400 resize-none" />
          <input value={form.price} onChange={e => set('price', e.target.value)} placeholder="Precio (ej: 13500)" type="number" required
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-400" />
          <input value={form.emoji} onChange={e => set('emoji', e.target.value)} placeholder="Emoji (ej: 🍔)"
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-400" />
          <select value={form.category_id} onChange={e => set('category_id', e.target.value)} required
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-400 bg-white">
            <option value="">Seleccioná una categoría</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
          <div>
            <p className="text-xs text-gray-400 mb-1">Foto del producto (opcional)</p>
            <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])}
              className="text-sm text-gray-600" />
            {form.image_url && !imageFile && (
              <img src={form.image_url} alt="preview" className="w-20 h-20 rounded-xl object-cover mt-2" />
            )}
          </div>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={form.active} onChange={e => set('active', e.target.checked)} />
            Visible en el menú
          </label>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button type="submit" disabled={loading}
            className="text-white rounded-xl py-3 text-sm font-medium disabled:opacity-60 mt-1"
            style={{ background: '#B91C1C' }}>
            {loading ? 'Guardando...' : 'Guardar producto'}
          </button>
        </form>
      </div>
    </div>
  )
}
