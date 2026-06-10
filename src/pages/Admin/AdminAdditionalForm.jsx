import { useState, useEffect } from 'react'
import { createAdditional, updateAdditional } from '../../services/products'

export default function AdminAdditionalForm({ additional, onClose, onSaved }) {
  const [form, setForm] = useState({ name: '', price: '', active: true })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (additional) {
      setForm({ name: additional.name || '', price: additional.price || '', active: additional.active ?? true })
    }
  }, [additional])

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const data = { ...form, price: Number(form.price) }
      if (additional) await updateAdditional(additional.id, data)
      else await createAdditional(data)
      onSaved()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end" style={{ background: 'rgba(0,0,0,0.55)' }}>
      <div className="bg-white rounded-t-2xl w-full">
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          <h2 className="text-base font-medium text-gray-900">{additional ? 'Editar adicional' : 'Nuevo adicional'}</h2>
          <button onClick={onClose} className="text-gray-400 text-xl">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3 pb-8">
          <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Nombre (ej: Extra carne)" required
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-400" />
          <input value={form.price} onChange={e => set('price', e.target.value)} placeholder="Precio adicional (ej: 3800)" type="number" required
            className="border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-red-400" />
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={form.active} onChange={e => set('active', e.target.checked)} />
            Activo
          </label>
          {error && <p className="text-xs text-red-600">{error}</p>}
          <button type="submit" disabled={loading}
            className="text-white rounded-xl py-3 text-sm font-medium disabled:opacity-60 mt-1"
            style={{ background: '#B91C1C' }}>
            {loading ? 'Guardando...' : 'Guardar adicional'}
          </button>
        </form>
      </div>
    </div>
  )
}
